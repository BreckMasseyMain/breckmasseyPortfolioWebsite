(function () {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const page = document.body.dataset.page;
  if (page && typeof PROJECTS !== "undefined" && PROJECTS[page]) {
    renderCategory(page);
  }

  if (page === "project" && typeof getProjectById === "function") {
    renderProject();
  }

  function renderCategory(category) {
    const list = document.getElementById("project-list");
    const intro = document.getElementById("page-blurb");
    const meta = CATEGORIES[category];
    const projects = PROJECTS[category] || [];

    if (intro && meta) {
      intro.textContent = meta.blurb;
    }

    if (!list) return;

    if (!projects.length) {
      list.innerHTML = "<li><p>No projects yet. Check back soon.</p></li>";
      return;
    }

    const base = getAssetBase();
    list.innerHTML = projects
      .map(
        (project) => `
        <li class="project-item">
          <a class="project-link" href="${base}project.html?id=${encodeURIComponent(project.id)}">
            <div class="project-thumb">
              <img src="${base}${project.image}" alt="" loading="lazy" width="640" height="400" />
            </div>
            <div class="project-meta">
              <h2>${escapeHtml(project.title)}</h2>
              <p>${escapeHtml(project.summary)}</p>
              <span class="date">${escapeHtml(project.date)}</span>
            </div>
          </a>
        </li>`
      )
      .join("");
  }

  function renderProject() {
    const root = document.getElementById("article-root");
    if (!root) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const project = id ? getProjectById(id) : null;
    const base = getAssetBase();

    if (!project) {
      root.innerHTML = `
        <div class="not-found container">
          <h1>Project not found</h1>
          <p>That project may have moved. Return to the <a href="${base}index.html">home page</a>.</p>
        </div>`;
      document.title = "Not found — Breck Massey";
      return;
    }

    const category = CATEGORIES[project.category];
    const backHref = `${base}pages/${project.category}.html`;
    const sections = normalizeSections(project);
    const outline = buildOutline(sections);
    const bodyHtml = renderSections(sections, base);
    const linksHtml = renderProjectLinks(project.links, base);

    document.title = `${project.title} — Breck Massey`;

    root.innerHTML = `
      <div class="article-shell">
        <aside class="article-outline" aria-label="Article outline">
          <p class="article-outline-label">On this page</p>
          <nav>
            <ol class="outline-list">
              ${outline
                .map(
                  (item) => `
                <li class="outline-item outline-item--${item.level}">
                  <a href="#${item.id}">${escapeHtml(item.title)}</a>
                </li>`
                )
                .join("")}
            </ol>
          </nav>
        </aside>

        <article class="article">
          <a class="article-back" href="${backHref}">← Back to ${escapeHtml(category.title)}</a>
          <header class="article-header">
            <h1>${escapeHtml(project.title)}</h1>
            <div class="article-meta">
              <span class="tag">${escapeHtml(category.title)}</span>
              <span>${escapeHtml(project.date)}</span>
            </div>
            ${linksHtml}
          </header>
          <figure class="article-hero">
            <img src="${base}${project.image}" alt="${escapeHtml(project.title)}" width="1200" height="675" />
          </figure>
          <div class="article-body">
            ${bodyHtml}
          </div>
        </article>
      </div>`;

    activateEmbeddedScripts(root);
    loadDemoScripts(root, base);
    setupOutlineSpy(root);
  }

  // Convert known embed scripts (esp. Khan Academy) into iframes, since
  // script tags inserted via innerHTML do not run, and many embeds use document.write.
  function prepareEmbedHtml(html) {
    let output = String(html).replace(
      /<script[^>]*\ssrc=["'](https?:\/\/(?:www\.)?khanacademy\.org\/computer-programming\/[^"']+?)\/embed\.js(\?[^"']*)?["'][^>]*>\s*<\/script>/gi,
      (_, programUrl, query) => {
        const src = `${programUrl}/embedded${query || "?embed=yes"}`;
        return `<div class="article-embed article-embed--khan"><iframe src="${escapeHtml(
          src
        )}" title="Khan Academy program" loading="lazy" allowfullscreen></iframe></div>`;
      }
    );

    // YouTube Error 153: embeds need an explicit referrerpolicy.
    output = output.replace(
      /<iframe\b([^>]*\bsrc=["']https?:\/\/(?:www\.)?(?:youtube(?:-nocookie)?\.com|youtu\.be)\/[^"']+["'][^>]*)>/gi,
      (match, attrs) => {
        if (/referrerpolicy=/i.test(attrs)) return match;
        return `<iframe${attrs} referrerpolicy="strict-origin-when-cross-origin">`;
      }
    );

    return output;
  }

  // Re-execute any remaining <script> tags that were injected via innerHTML.
  function activateEmbeddedScripts(container) {
    const scripts = [...container.querySelectorAll("script")];
    scripts.forEach((oldScript) => {
      const target = document.createElement("div");
      target.className = "article-script-mount";
      oldScript.parentNode.insertBefore(target, oldScript);

      const previousWrite = document.write;
      document.write = (...args) => {
        target.insertAdjacentHTML("beforeend", args.join(""));
      };

      const script = document.createElement("script");
      [...oldScript.attributes].forEach((attr) => {
        script.setAttribute(attr.name, attr.value);
      });
      if (oldScript.textContent) {
        script.textContent = oldScript.textContent;
      }

      oldScript.replaceWith(script);

      script.addEventListener(
        "load",
        () => {
          document.write = previousWrite;
        },
        { once: true }
      );

      // Inline scripts run synchronously; restore write immediately.
      if (!script.src) {
        document.write = previousWrite;
      }
    });
  }

  function renderProjectLinks(links, base) {
    if (!Array.isArray(links) || !links.length) return "";

    return `
      <ul class="article-links">
        ${links
          .map((link) => {
            const note = link.note
              ? `<span class="article-link-note">${escapeHtml(link.note)}</span>`
              : "";
            return `<li>${renderLinkAnchor(link, base)}${note}</li>`;
          })
          .join("")}
      </ul>`;
  }

  function renderLinkAnchor(link, base) {
    const href = resolveHref(link.href, base);
    const external = isExternalHref(href);
    return `<a href="${escapeHtml(href)}"${
      external ? ' target="_blank" rel="noopener noreferrer"' : ""
    }>${escapeHtml(link.label || href)}</a>`;
  }

  function resolveHref(href, base) {
    const value = String(href || "");
    if (!value) return "#";
    if (/^(https?:|mailto:|tel:|#|\/)/i.test(value)) return value;
    return `${base}${value}`;
  }

  function isExternalHref(href) {
    return /^(https?:|mailto:|tel:)/i.test(String(href || ""));
  }

  function formatInlineText(text, base) {
    const parts = String(text).split(/(\[[^\]]+\]\([^)]+\))/g);
    return parts
      .map((part) => {
        const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (!match) return escapeHtml(part);
        return renderLinkAnchor({ label: match[1], href: match[2] }, base);
      })
      .join("");
  }

  function normalizeSections(project) {
    if (Array.isArray(project.sections) && project.sections.length) {
      return project.sections.map((section, index) => normalizeHeadingNode(section, `section-${index + 1}`));
    }

    // Fallback for older projects that still use a content HTML string
    return [
      {
        id: "overview",
        title: "Overview",
        blocks: [],
        subsections: [],
        html: project.content || "<p>No write-up yet.</p>",
      },
    ];
  }

  function normalizeHeadingNode(node, fallbackId) {
    const title = node.title || "Section";
    const id = node.id || slugify(title) || fallbackId;
    return {
      id,
      title,
      blocks: Array.isArray(node.blocks) ? node.blocks : [],
      subsections: Array.isArray(node.subsections)
        ? node.subsections.map((sub, index) =>
            normalizeHeadingNode(sub, `${id}-sub-${index + 1}`)
          )
        : [],
      html: node.html || "",
    };
  }

  function buildOutline(sections) {
    const items = [];
    sections.forEach((section) => {
      items.push({ id: section.id, title: section.title, level: 2 });
      section.subsections.forEach((sub) => {
        items.push({ id: sub.id, title: sub.title, level: 3 });
      });
    });
    return items;
  }

  function renderSections(sections, base) {
    return sections
      .map((section) => {
        const subsectionsHtml = section.subsections
          .map(
            (sub) => `
            <section class="article-subsection" id="${sub.id}">
              <h3>${escapeHtml(sub.title)}</h3>
              ${renderBlocks(sub.blocks, base)}
              ${sub.html ? `<div class="article-html">${prepareEmbedHtml(sub.html)}</div>` : ""}
            </section>`
          )
          .join("");

        return `
          <section class="article-section" id="${section.id}">
            <h2>${escapeHtml(section.title)}</h2>
            ${renderBlocks(section.blocks, base)}
            ${section.html ? `<div class="article-html">${prepareEmbedHtml(section.html)}</div>` : ""}
            ${subsectionsHtml}
          </section>`;
      })
      .join("");
  }

  function renderBlocks(blocks, base) {
    if (!Array.isArray(blocks) || !blocks.length) return "";

    return blocks
      .map((block) => {
        if (block.type === "image") {
          const src = `${base}${block.src}`;
          const alt = escapeHtml(block.alt || "");
          const caption = block.caption
            ? `<figcaption>${escapeHtml(block.caption)}</figcaption>`
            : "";
          return `
            <figure class="article-figure">
              <img src="${src}" alt="${alt}" loading="lazy" />
              ${caption}
            </figure>`;
        }

        if (block.type === "video") {
          return renderVideoBlock(block, base);
        }

        if (block.type === "link") {
          const note = block.note
            ? `<span class="article-link-note">${escapeHtml(block.note)}</span>`
            : "";
          return `
            <p class="article-inline-link">
              ${renderLinkAnchor(block, base)}
              ${note}
            </p>`;
        }

        if (block.type === "html") {
          return `<div class="article-html">${prepareEmbedHtml(block.html || "")}</div>`;
        }

        if (block.type === "embed") {
          return renderEmbedBlock(block, base);
        }

        if (block.type === "script") {
          return renderScriptBlock(block, base);
        }

        if (block.type === "p" || block.text) {
          return `<p>${formatInlineText(block.text || "", base)}</p>`;
        }

        return "";
      })
      .join("");
  }

  function renderEmbedBlock(block, base) {
    const src = resolveHref(block.src, base);
    const height = Number(block.height) || 600;
    const title = escapeHtml(block.title || "Embedded demo");
    const caption = block.caption
      ? `<figcaption>${escapeHtml(block.caption)}</figcaption>`
      : "";

    return `
      <figure class="article-figure article-figure--demo">
        <div class="article-demo" style="--demo-height: ${height}px">
          <iframe
            src="${escapeHtml(src)}"
            title="${title}"
            loading="lazy"
            allowfullscreen
          ></iframe>
        </div>
        ${caption}
      </figure>`;
  }

  function renderScriptBlock(block, base) {
    const height = Number(block.height) || 400;
    const demoId = block.id || `demo-${Math.random().toString(36).slice(2, 9)}`;
    const scripts = (Array.isArray(block.scripts) ? block.scripts : [block.src])
      .filter(Boolean)
      .map((src) => resolveHref(src, base));
    const caption = block.caption
      ? `<figcaption>${escapeHtml(block.caption)}</figcaption>`
      : "";

    return `
      <figure class="article-figure article-figure--demo">
        <div
          class="article-demo article-demo--script"
          id="${escapeHtml(demoId)}"
          data-demo-id="${escapeHtml(demoId)}"
          data-demo-scripts="${escapeHtml(JSON.stringify(scripts))}"
          style="--demo-height: ${height}px"
        ></div>
        ${caption}
      </figure>`;
  }

  function loadDemoScripts(container) {
    const mounts = [...container.querySelectorAll("[data-demo-scripts]")];
    mounts.forEach((mount) => {
      let scripts = [];
      try {
        scripts = JSON.parse(mount.dataset.demoScripts || "[]");
      } catch (error) {
        return;
      }

      // Let external demos find their mount point.
      window.__portfolioDemoMount = mount;

      scripts.reduce(
        (chain, src) =>
          chain.then(
            () =>
              new Promise((resolve, reject) => {
                const script = document.createElement("script");
                script.src = src;
                script.async = false;
                script.onload = resolve;
                script.onerror = () =>
                  reject(new Error(`Failed to load demo script: ${src}`));
                document.body.appendChild(script);
              })
          ),
        Promise.resolve()
      ).catch((error) => {
        mount.innerHTML = `<p class="article-demo-error">${escapeHtml(
          error.message || "Demo failed to load."
        )}</p>`;
      });
    });
  }

  function renderVideoBlock(block, base) {
    const caption = block.caption
      ? `<figcaption>${escapeHtml(block.caption)}</figcaption>`
      : "";
    const src = String(block.src || "");
    const embed = getVideoEmbedUrl(src);

    if (embed) {
      return `
        <figure class="article-figure article-figure--video">
          <div class="article-video">
            <iframe
              src="${escapeHtml(embed)}"
              title="${escapeHtml(block.title || block.caption || "Project video")}"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
              loading="lazy"
              referrerpolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>
          ${caption}
        </figure>`;
    }

    const fileSrc = src.startsWith("http") ? src : `${base}${src}`;
    const poster = block.poster
      ? ` poster="${escapeHtml(block.poster.startsWith("http") ? block.poster : base + block.poster)}"`
      : "";

    return `
      <figure class="article-figure article-figure--video">
        <div class="article-video">
          <video controls playsinline preload="metadata"${poster}>
            <source src="${escapeHtml(fileSrc)}" />
            Your browser does not support embedded video.
          </video>
        </div>
        ${caption}
      </figure>`;
  }

  function getVideoEmbedUrl(src) {
    if (!src) return null;

    const youtube = src.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/
    );
    if (youtube) {
      return `https://www.youtube-nocookie.com/embed/${youtube[1]}`;
    }

    const vimeo = src.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vimeo) {
      return `https://player.vimeo.com/video/${vimeo[1]}`;
    }

    return null;
  }

  function setupOutlineSpy(root) {
    const links = [...root.querySelectorAll(".outline-list a")];
    const targets = links
      .map((link) => root.querySelector(link.getAttribute("href")))
      .filter(Boolean);

    if (!links.length || !targets.length || !("IntersectionObserver" in window)) {
      return;
    }

    const setActive = (id) => {
      links.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0, 0.25, 0.5, 1],
      }
    );

    targets.forEach((target) => observer.observe(target));
    setActive(targets[0].id);
  }

  function getAssetBase() {
    const depth = document.body.dataset.depth;
    if (depth === "1") return "../";
    return "./";
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
})();

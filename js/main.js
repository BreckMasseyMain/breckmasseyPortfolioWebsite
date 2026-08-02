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
          </header>
          <figure class="article-hero">
            <img src="${base}${project.image}" alt="${escapeHtml(project.title)}" width="1200" height="675" />
          </figure>
          <div class="article-body">
            ${bodyHtml}
          </div>
        </article>
      </div>`;

    setupOutlineSpy(root);
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
              ${sub.html || ""}
            </section>`
          )
          .join("");

        return `
          <section class="article-section" id="${section.id}">
            <h2>${escapeHtml(section.title)}</h2>
            ${renderBlocks(section.blocks, base)}
            ${section.html || ""}
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

        if (block.type === "p" || block.text) {
          return `<p>${escapeHtml(block.text || "")}</p>`;
        }

        return "";
      })
      .join("");
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

/**
 * Project format
 * --------------
 * image     — cover photo used on category lists and the article hero
 * summary   — short blurb on the category list
 * sections  — ordered article sections (each becomes an outline entry)
 *
 * Section / subsection fields:
 *   title        — heading text (outline label)
 *   id           — optional anchor id (auto-generated from title if omitted)
 *   blocks       — paragraphs and images in order
 *   subsections  — optional nested headings (also listed in the outline)
 *
 * Block types:
 *   { type: "p", text: "Paragraph text." }
 *   { type: "image", src: "assets/images/photo.jpg", alt: "Description", caption: "Optional caption" }
 */

const PROJECTS = {
  voxels: [
    {
      id: "voxel-engine",
      title: "Voxel Engine Prototype",
      date: "March 2025",
      image: "assets/images/voxel-engine.svg",
      summary: "A chunked voxel renderer exploring meshing, lighting, and camera controls.",
      sections: [
        {
          title: "Overview",
          blocks: [
            {
              type: "p",
              text: "This prototype focuses on a chunk-based voxel world with greedy meshing to keep draw calls low. The goal was a lightweight engine that still feels solid when flying through dense terrain.",
            },
            {
              type: "image",
              src: "assets/images/voxel-engine.svg",
              alt: "Voxel engine chunk overview",
              caption: "Early chunk view with greedy meshing enabled.",
            },
            {
              type: "p",
              text: "Work covered world generation hooks, face culling, simple ambient occlusion, and a free-fly camera.",
            },
          ],
          subsections: [
            {
              title: "Chunk loading",
              blocks: [
                {
                  type: "p",
                  text: "Chunk loading is staged so nearby terrain appears first while distant regions stream in. This keeps the camera responsive when flying quickly across the map.",
                },
              ],
            },
            {
              title: "Lighting",
              blocks: [
                {
                  type: "p",
                  text: "A lightweight ambient occlusion pass darkens concave corners without a full global-illumination solve.",
                },
                {
                  type: "image",
                  src: "assets/images/terrain-painter.svg",
                  alt: "Lighting study",
                  caption: "Placeholder lighting study capture.",
                },
              ],
            },
          ],
        },
        {
          title: "Next steps",
          blocks: [
            {
              type: "p",
              text: "Next steps include smarter LOD for far chunks and a cleaner API for placing interactive blocks.",
            },
          ],
        },
      ],
    },
    {
      id: "procedural-caves",
      title: "Procedural Cave Systems",
      date: "January 2025",
      image: "assets/images/procedural-caves.svg",
      summary: "Noise-driven caves and cavern rooms carved from solid voxel volumes.",
      sections: [
        {
          title: "Overview",
          blocks: [
            {
              type: "p",
              text: "Procedural Cave Systems experiments with layered noise to carve tunnels, chambers, and occasional vertical shafts from solid stone.",
            },
            {
              type: "image",
              src: "assets/images/procedural-caves.svg",
              alt: "Cave system preview",
            },
          ],
          subsections: [
            {
              title: "Noise layers",
              blocks: [
                {
                  type: "p",
                  text: "Different noise frequencies control corridor width versus large open rooms. Sparse ore and crystal clusters sit along walls to give caverns a sense of discovery.",
                },
              ],
            },
          ],
        },
        {
          title: "Uses",
          blocks: [
            {
              type: "p",
              text: "The project is useful as a building block for dungeon-style voxel maps and exploration demos.",
            },
          ],
        },
      ],
    },
    {
      id: "terrain-painter",
      title: "Voxel Terrain Painter",
      date: "November 2024",
      image: "assets/images/terrain-painter.svg",
      summary: "A brush tool for sculpting heightfields and painting voxel materials.",
      sections: [
        {
          title: "Overview",
          blocks: [
            {
              type: "p",
              text: "Voxel Terrain Painter is a creative tool for shaping landscapes with sculpt and paint brushes. Raise land, dig gullies, and stamp material layers such as grass, dirt, and stone.",
            },
            {
              type: "image",
              src: "assets/images/terrain-painter.svg",
              alt: "Terrain painter brushes",
            },
          ],
          subsections: [
            {
              title: "Interface",
              blocks: [
                {
                  type: "p",
                  text: "The UI stays minimal: brush size, strength, and material slots. Undo history keeps experiments safe while iterating on a scene.",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  circuitry: [
    {
      id: "6502 Game Console",
      title: "6502 Game Console",
      date: "2023-2024",
      image: "assets/images/6502/cover.JPG",
      summary: "A custom designed game console powered by the 6502 microprocessor",
      sections: [
        {
          title: "Overview",
          blocks: [
            {
              type: "p",
              text: "Having programmed my whole life, I have always wondered, \"How do computers run my code?\" This project came from trying to answer that question. The whole computer is based around the 65c02 microprocessor. A slightly updated version of the chip that powered the Apple II, Commodore 64, and the NES game console back in the 70s/80s. Then the graphics is all run off of my custom made graphics card. It outputs a VGA signal with a resolution of 320 by 240 pixels with up to 256 different colors and one controllable sprite. Running on the console is a 2d platformer made from over 2000 lines of hand crafted assembly code.",
            },
            {
              type: "image",
              src: "assets/images/6502/gameCloseUp.PNG",
              alt: "close up of the game running on my console",
            },
          ],
          subsections: [
            {
              title: "Firmware",
              blocks: [
                {
                  type: "p",
                  text: "Firmware handles timing, brightness curves, and simple transitions between scenes. Patterns can be authored as compact frame data so memory stays manageable.",
                },
              ],
            },
          ],
        },
        {
          title: "Development",
          blocks: [
            {
              type: "p",
              text: "Development of this project started around January of my sophomore year. I started by building Ben Eater's 6502 breadboard computer kit. After getting familiar with the 6502 and getting a Hello World program running, I made my first modification allow me to write to an external register. I did this by making a memory mapped register. Figuring this out was a vital step because the 6502 would end up controlling the rest of the computer through external registers.",
            },
            {
              type: "image",
              src: "assets/images/6502/breadboardHelloWorld.JPG",
              alt: "Picture of breadboard 6502 computer running hello world program",
            },
            {
              type: "p",
              text: "The first memory mapped register was used to control a sound card. The card would play a simple square wave tone based on the value in its register. By writing to the register I could play simple music or sound effects.",
            },
          ],
          subsections: [
            {
              title: "PCBs",
              blocks: [
                {
                  type: "image",
                  src: "assets/images/6502/pcb1.JPG",
                  alt: "Picture of first PCB"
                },
                {
                  type: "p",
                  text: "Around this time I was becoming tired of wires coming loose and causing lots of trouble, so I designed my first PCB. After it was assembled I quickly realized it had a few errors that would make it hard to progress. Within a day I had sent out my next PCB design. In the mean time I kept programming. I knew I wanted to ultimately make a game so I worked on implementing some simple fixed point math to achieve smooth movement.",
                }
              ],
            },
          ],
        },
      ],
    },
    {
      id: "sensor-suite",
      title: "Arduino Sensor Suite",
      date: "October 2024",
      image: "assets/images/sensor-suite.svg",
      summary: "Temperature, light, and motion sensors wired into a unified logger.",
      sections: [
        {
          title: "Overview",
          blocks: [
            {
              type: "p",
              text: "This suite bundles temperature, ambient light, and motion sensors into one Arduino-based logger with a shared sampling loop.",
            },
            {
              type: "image",
              src: "assets/images/sensor-suite.svg",
              alt: "Sensor suite board",
            },
          ],
          subsections: [
            {
              title: "Logging",
              blocks: [
                {
                  type: "p",
                  text: "Readings are timestamped and written to serial for later graphing. Calibration helpers keep raw values closer to real-world units.",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "pcb-experiment",
      title: "Custom PCB Experiment",
      date: "August 2024",
      image: "assets/images/pcb-experiment.svg",
      summary: "A first-pass PCB layout for a compact GPIO breakout board.",
      sections: [
        {
          title: "Overview",
          blocks: [
            {
              type: "p",
              text: "Custom PCB Experiment documents a first fab run: schematic capture, board layout, and silkscreen decisions for a compact GPIO breakout.",
            },
            {
              type: "image",
              src: "assets/images/pcb-experiment.svg",
              alt: "PCB layout",
            },
          ],
          subsections: [
            {
              title: "Lessons learned",
              blocks: [
                {
                  type: "p",
                  text: "Lessons learned included clearer connector labeling, better spacing around mounting holes, and simpler power-rail routing.",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  games: [
    {
      id: "platformer",
      title: "Platformer Prototype",
      date: "April 2025",
      image: "assets/images/platformer.svg",
      summary: "Tight jump physics, coyote time, and a short vertical level slice.",
      sections: [
        {
          title: "Overview",
          blocks: [
            {
              type: "p",
              text: "Platformer Prototype focuses on feel: coyote time, jump buffering, and consistent gravity so movement remains readable under pressure.",
            },
            {
              type: "image",
              src: "assets/images/platformer.svg",
              alt: "Platformer level slice",
            },
          ],
          subsections: [
            {
              title: "Vertical slice",
              blocks: [
                {
                  type: "p",
                  text: "A short vertical slice teaches wall jumps and timed hazards without a full campaign. Particle feedback and camera shake stay subtle so they support readability.",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "puzzle-adventure",
      title: "Puzzle Adventure Demo",
      date: "December 2024",
      image: "assets/images/puzzle-adventure.svg",
      summary: "Environmental puzzles, inventory items, and a quiet narrative beat.",
      sections: [
        {
          title: "Overview",
          blocks: [
            {
              type: "p",
              text: "Puzzle Adventure Demo pairs room-scale puzzles with a lightweight inventory and short narrative moments.",
            },
            {
              type: "image",
              src: "assets/images/puzzle-adventure.svg",
              alt: "Puzzle room",
            },
          ],
          subsections: [
            {
              title: "Interaction language",
              blocks: [
                {
                  type: "p",
                  text: "Objects have clear affordances: key items unlock paths, while pressure plates and light beams form the core interaction language.",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "arena-sketch",
      title: "Multiplayer Arena Sketch",
      date: "September 2024",
      image: "assets/images/arena-sketch.svg",
      summary: "A small arena layout and placeholder combat loop for local playtests.",
      sections: [
        {
          title: "Overview",
          blocks: [
            {
              type: "p",
              text: "Multiplayer Arena Sketch is an early combat sandbox: spawn points, cover geometry, and a placeholder ability kit for local playtests.",
            },
            {
              type: "image",
              src: "assets/images/arena-sketch.svg",
              alt: "Arena layout",
            },
          ],
          subsections: [
            {
              title: "Playtests",
              blocks: [
                {
                  type: "p",
                  text: "Netcode is stubbed out so design work can proceed with split-screen or hot-seat sessions first. Balance passes will follow once core movement and targeting feel stable.",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  other: [
    {
      id: "site-tools",
      title: "Personal Site Tools",
      date: "May 2025",
      image: "assets/images/site-tools.svg",
      summary: "Small scripts and helpers used while building this portfolio.",
      sections: [
        {
          title: "Overview",
          blocks: [
            {
              type: "p",
              text: "Personal Site Tools collects tiny helpers for scaffolding pages, optimizing SVGs, and checking local links.",
            },
            {
              type: "image",
              src: "assets/images/site-tools.svg",
              alt: "Site tools",
            },
          ],
        },
      ],
    },
    {
      id: "data-viz",
      title: "Data Visualization Study",
      date: "July 2024",
      image: "assets/images/data-viz.svg",
      summary: "Canvas charts exploring clarity, hierarchy, and motion.",
      sections: [
        {
          title: "Overview",
          blocks: [
            {
              type: "p",
              text: "This study explores how modest motion and clear hierarchy can make charts easier to read without turning them into decoration.",
            },
            {
              type: "image",
              src: "assets/images/data-viz.svg",
              alt: "Chart study",
            },
          ],
        },
      ],
    },
    {
      id: "automation",
      title: "Automation Scripts",
      date: "June 2024",
      image: "assets/images/automation.svg",
      summary: "Everyday automation for file sorting, backups, and reminders.",
      sections: [
        {
          title: "Overview",
          blocks: [
            {
              type: "p",
              text: "Automation Scripts covers small utilities that tidy folders, kick off backups, and surface reminders at useful moments.",
            },
            {
              type: "image",
              src: "assets/images/automation.svg",
              alt: "Automation diagram",
            },
          ],
        },
      ],
    },
  ],
};

const CATEGORIES = {
  voxels: {
    title: "Voxels",
    blurb: "Chunked worlds, meshing, and tools for shaping blocky space.",
  },
  circuitry: {
    title: "Circuitry",
    blurb: "Hardware experiments, firmware, and bench-side prototypes.",
  },
  games: {
    title: "Video Games",
    blurb: "Prototypes focused on feel, puzzles, and playable slices.",
  },
  other: {
    title: "Other",
    blurb: "Side studies, tools, and experiments outside the main tracks.",
  },
};

function getAllProjects() {
  return Object.entries(PROJECTS).flatMap(([category, list]) =>
    list.map((project) => ({ ...project, category }))
  );
}

function getProjectById(id) {
  return getAllProjects().find((project) => project.id === id) || null;
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Project format
 * --------------
 * image     — cover photo used on category lists and the article hero
 * summary   — short blurb on the category list
 * links     — optional list of links shown under the project title
 * sections  — ordered article sections (each becomes an outline entry)
 *
 * Link fields (project.links or a link block):
 *   { label: "GitHub", href: "https://github.com/..." }
 *   { label: "Live demo", href: "https://example.com", note: "Optional note" }
 *
 * Section / subsection fields:
 *   title        — heading text (outline label)
 *   id           — optional anchor id (auto-generated from title if omitted)
 *   blocks       — paragraphs, images, videos, and links in order
 *   subsections  — optional nested headings (also listed in the outline)
 *
 * Block types:
 *   { type: "p", text: "Paragraph with a [markdown link](https://example.com)." }
 *   { type: "image", src: "assets/images/photo.jpg", alt: "Description", caption: "Optional caption" }
 *   { type: "video", src: "assets/videos/demo.mp4", caption: "Optional caption", poster: "assets/images/thumb.jpg" }
 *   { type: "video", src: "https://www.youtube.com/watch?v=VIDEO_ID", caption: "Optional caption" }
 *   { type: "video", src: "https://vimeo.com/VIDEO_ID", caption: "Optional caption" }
 *   { type: "link", label: "Source code", href: "https://github.com/...", note: "Optional note" }
 *   { type: "html", html: "<div class=\"custom\">Any HTML embed</div>" }
 *   { type: "embed", src: "demos/my-demo/index.html", title: "Playable demo", height: 620, caption: "Optional" }
 *   { type: "script", src: "demos/widget.js", height: 400, caption: "Optional" }
 *   { type: "script", scripts: ["demos/lib.js", "demos/widget.js"], height: 400 }
 *
 * embed  — iframes a local/remote HTML page (best for full games/demos)
 * script — loads external JS into a mount <div id="...">; use for widgets
 *          Your script can find the mount with document.currentScript.previousElementSibling
 *          or document.querySelector("[data-demo-id='...']") if you set id on the block:
 *          { type: "script", id: "my-demo", src: "demos/widget.js", height: 400 }
 *
 * You can also set `html` on a section/subsection to inject markup after its blocks.
 * Khan Academy Share → Embed script tags are auto-converted to working iframes.
 *
 * Local videos: put files in assets/videos/ (mp4 or webm).
 * poster is optional and only used for local video files.
 */

const PROJECTS = {
  voxels: [
    {
      id: "voxel-engine",
      title: "Voxel Engine Prototype",
      date: "March 2025",
      image: "assets/images/voxel-engine.svg",
      summary: "A chunked voxel renderer exploring meshing, lighting, and camera controls.",
      links: [
        { label: "GitHub", href: "https://github.com/" },
        { label: "Demo", href: "https://example.com", note: "Placeholder link" },
      ],
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
    /* 
    {
      id: "sensor-suite",
      title: "RISC-V computer and Graphics Card",
      date: "Summer 2026",
      image: "assets/images/sensor-suite.svg",
      summary: "A custom computer running on an FPGA",
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
    },*/
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
              text: "Having programmed my whole life, I have always wondered, \"How do computers run my code?\" This project came from trying to answer that question. The whole computer is based around the 65c02 microprocessor. A slightly updated version of the chip that powered the Apple II, Commodore 64, and the NES game console back in the 70s/80s. Then the graphics is all run off of my custom made graphics card. It outputs a VGA signal with a resolution of 320 by 240 pixels with up to 256 different colors and one controllable sprite. Running on the console is a 2d platformer made from over 2000 lines of hand crafted assembly code. This project started out of curiosity, then during my Junior year I took a capstone class and decided to flesh this project out for that.",
            },
            {
              type: "image",
              src: "assets/images/6502/gameCloseUp.PNG",
              alt: "close up of the game running on my console",
            },
          ]
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
              title: "First PCB",
              blocks: [
                {
                  type: "image",
                  src: "assets/images/6502/pcb1.JPG",
                  alt: "Picture of first PCB"
                },
                {
                  type: "p",
                  text: "Around this time I was becoming tired of wires coming loose and causing lots of trouble, so I designed my first PCB. After it was assembled I quickly realized it had a few errors that would make it hard to progress. Within a day I had sent out my next PCB design. In the mean time I kept programming. I knew I wanted to ultimately make a game so I worked on implementing some simple fixed point math to achieve smooth movement.",
                },
                { 
                  type: "video",
                  src: "https://youtube.com/shorts/PcW1GxEqrL0",//"assets/videos/6502/bouncingBall.MOV", 
                  caption: "Video showing a bouncing ball program", 
                  poster: "assets/images/6502/bouncingBallThumb.png"
                }
              ],
            },
            {
              title: "First Game",
              blocks: [
                {
                  type: "p",
                  text: "Before knowing I was going to build a whole graphics card I was planning on making a game using the 2 line LCD display. The display was a text display but also supported 8 custom characters. Using these 8 custom characters you could make a little display. Using this display I made my first game. I took my physics from my bouncing ball demo, to make a game similar to flappy bird."
                },
                { 
                  type: "video",
                  src: "https://youtube.com/shorts/Q2QPLq9dE2k",//"assets/videos/6502/flappyDot.MOV", 
                  caption: "Video showing my flappy dot game", 
                  poster: "assets/images/6502/flappyDotThumb.PNG"
                }
              ],
            },
            {
              title: "Second PCB",
              blocks: [
                {
                  type: "image",
                  src: "assets/images/6502/pcb2.JPG",
                  alt: "Picture of first PCB"
                },
                {
                  type: "p",
                  text: "The second PCB was much more modular. It was designed for cards such as a sound card or graphics card to be easily slot in. It made it much easier to make memory mapped IO.",
                }
              ],
            },
            {
              title: "Joystick",
              blocks: [
                {
                  type: "p",
                  text: "One of the first circuits made for my second PCB was a joystick input circuit. It fed the analogue signal from the the joystick into a analogue to digital (a2d) converter. Then the rest of the circuit would control the a2d converter to output the value parallelly instead of serially. This value could then be read back by the 6502."
                },
                { 
                  type: "image",
                  src: "assets/images/6502/joystick.PNG",
                  alt: "Picture of Joystick circuit"
                }
              ],
            },
            {
              title: "Graphics Card",
              blocks: [
                {
                  type: "p",
                  text: "After making my first game using the LCD display I realized it was too limiting for what I wanted to do. The display had a tiny resolution and took forever to update. This is when I decided to make a graphics card that would allow me to hook my computer to a monitor. To start I would need to generate the sync signals so the monitor could pick up the signal."
                },
                { 
                  type: "image",
                  src: "assets/images/6502/startToVGA.JPG",
                  alt: "Picture of Initial VGA circuit"
                },
                {
                  type: "p",
                  text: "After making the sync signals I worked on the tile layer. Every 8x8 pixels would be 1 tile similar to the NES. This saved on memory because tiles could be reused instead of having to write to every pixel. To test this circuit I uploaded a few images. During this time I also added scrolling. The memory holds more information than one screen so you can use the scroll registers to smoothly move between the other screens. I hooked it up to my computer and used the shifting to make the image wavy."
                },
                { 
                  type: "image",
                  src: "assets/images/6502/wavy.JPG",
                  alt: "Picture of the statue of liberty on graphics card"
                },
                {
                  type: "p",
                  text: "Now that I had tiles working I added the circuitry to take the tile ID and draw the correct tile. To start I made a simple text tile set to quickly check if the correct tiles were being drawn."
                },
                { 
                  type: "image",
                  src: "assets/images/6502/textTiles.JPG",
                  alt: "Picture of first text tile set on graphics card"
                },
                {
                  type: "p",
                  text: "From here the graphics card was essentially done. I worked on creating a tile set for my game. I used aseprite to create all of the graphics and levels, and a few custom scripts to convert them to formats my computer could understand. "
                },
                { 
                  type: "image",
                  src: "assets/images/6502/gameTileSet.JPG",
                  alt: "Picture of first text tile set on graphics card"
                },
              ],
            },
            {
              title: "Adding a Sprite",
              blocks: [
                {
                  type: "p",
                  text: "While I could easily render a whole level and animate tiles, adding a moving character was very difficult. Every frame I would have to modify up to 4 tiles to overlay the player. I did not have the overhead for that so I decided I needed to add a circuit that would do this. The sprite circuit just would take a x position and y position and overlay the character. Since I ran out of registers I decided to hard code a set of sprites that I could swap through for animations."
                },
                { 
                  type: "video",
                  src: "https://youtube.com/shorts/bvXZ7Tj_ckg",//"assets/videos/6502/firstSprite.MOV",
                  caption: "Video showing the first sprite moving around", 
                  poster: "assets/images/6502/firstSpriteThumb.PNG"
                },
              ],
            },
            {
              title: "Creating the Game",
              blocks: [
                {
                  type: "p",
                  text: "The graphics card, sound, and controller were all finished so it was time to strap down and program my game. To do so I had to write over 2000 liens of 6502 assembly. I had to make my own sound engine and physics engine for the game. To test levels I created a mock up version using javascript since it was much faster. If you watch the video you may here the \"music\" in the background. It is supposed to be playing the super mario song; however, while programming it, I forgot that music notes don't all play for the same amount of time. If you listen close you can hear that it plays the correct notes but not at the right pace. Oops."
                },
                { 
                  type: "video",
                  src: "https://youtu.be/Wh87AyZ6NJM",//"assets/videos/6502/demoingGame.MOV",
                  caption: "Video showing the me playing the finished game", 
                  poster: "assets/images/6502/demoGameThumb.PNG"
                },
              ],
            },
          ],
        },
        {
          title: "Demo Game",
          blocks: [
            {
              type: "p",
              text: "Game mock-up that was used to test levels. It plays similar to the console version but is a bit more janky than the real thing.",
            },
            {
              type: "embed",
              src: "demos/6502-game/index.html",
              title: "Waddles Underground Adventure",
              height: 640,
              caption: "Click the game, then use arrow keys. Avoid spikes. Checkpoints turn green when reached.",
            }
          ]
        },
        {
          title: "Links",
          blocks: [
            {
              type: "p",
              text: "Project GitHub: [https://github.com/BreckMasseyMain/8BitGameConsole](https://github.com/BreckMasseyMain/8BitGameConsole)",
            },
            {
              type: "p",
              text: "Project Write Up: [https://github.com/BreckMasseyMain/8BitGameConsole/blob/main/6502%20Capstone%20Paper.pdf](https://github.com/BreckMasseyMain/8BitGameConsole/blob/main/6502%20Capstone%20Paper.pdf)",
            }
          ]
        },
        {
          title: "Bonus",
          blocks: [
          ],
          subsections: [
            {
              title: "Sound Card",
              blocks: [
                {
                  type: "image",
                  src: "assets/images/6502/soundCard.JPG",
                  alt: "Picture of sound card pcb"
                },
                {
                  type: "p",
                  text: "Midway through the project I wanted to make a sound card. I designed another PCB with my first smd components. The sound card had 3 voices and an analogue output. The first voice would be the same square wave. The second voice would be a new triangle wave. The final voice could be either a square or triangle wave (decided in hardware not software). There would also be a 8 bit analogue output that the cpu could write to. Below is a picture of the triangle waveform.",
                },
                {
                  type: "image",
                  src: "assets/images/6502/soundCardWaveForm.JPG",
                  alt: "Picture of triangle wave waveform."
                },
                {
                  type: "p",
                  text: "Unfortunately when designing the backboard for the card I messed up the memory mapped register wiring causing it to be impossible to actually write to the sound card. I did not have time to fix the card.",
                },
              ],
            },
            {
              title: "3D Pseudo Shadows",
              blocks: [
                {
                  type: "p",
                  text: "One the capabilities of the graphics card was pallet switching. To demo the feature I uploaded a image of 3D models colored based on their normals. Then by switching the colors of the normals out I was able to make it appear like a light was moving around.",
                },
                { 
                  type: "video",
                  src: "https://youtube.com/shorts/6FCDPHI5Ukk",//"assets/videos/6502/shadows.MOV",
                  caption: "Video showing the the 3D Pseudo Shadows", 
                  poster: "assets/images/6502/shadowsThumb.PNG"
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
      id: "jamit",
      title: "Jam It!",
      date: "January 2026",
      image: "assets/images/jamIt/JamItCover.png",
      summary: "The ultimate song guessing game designed to test your music knowledge",
      sections: [
        {
          title: "Overview",
          blocks: [
            {
              type: "p",
              text: "[Jam It!](https://jamit-ios.com/) is a IOS game built around guessing a song you are listening to. There are multiple game modes such as a kahoot style game, a pass and play game mode, and a matching game mode. This project was developed with two of my friends, Dominik Grzeszczak and Jan Szmajda, over MIT's winter break (which includes all of January). We applied for a MIT YC program which would give students of MIT funding and guidance over MIT's winter break to build some sort of app. We were not accepted; However, they decided to give us all of the resources for us to use. Since, they decided to give us the all of the resources, we decided we would spend winter break building an app, and this was what we made.",
            },
            {
              type: "image",
              src: "assets/images/jamIt/homePage.webp",
              alt: "Jam It! home page",
            },
          ],
        },
      ],
    },
    {
      id: "WaddlesAndWiggles",
      title: "Waddle's and Wiggle's Wild Dash to the Way Out",
      date: "February 2025",
      image: "assets/images/waddlesAndWiggles/gamePlay.png",
      summary: "2D local multiplayer platformer",
      sections: [
        {
          title: "Overview",
          blocks: [
            {
              type: "p",
              text: "[Waddle's and Wiggle's Wild Dash to the Way Out](https://bcmassey.itch.io/waddles-and-wiggles-wild-dash-to-the-way-out) is a 2D platfomer game where the world is ending. At the end of the level there is a spaceship that will carry passengers to safety, but there is only one seat left. The two players have to race for the spot. As the players race through the world, the world crumbles behind them! There are many different power ups scattered throughout the map. It was made for the TSA video game competition in collaboration with Jack Marris.",
            },
          ],
        },
        {
          title: "Development",
          blocks: [
            {
              type: "p",
              text: "This game was developed in the Unity Game Engine, but do to many shortcomings of Unity's tools a lot of systems were built from scratch. For example, the 2D tile set tools Unity has by default had many issues such as small gaps between tiles. The default system also did not work with our destructible terrain. Instead, we made our own tile system. At the start of the game, a mesh is made for each level. In the mesh each set of two triangles represents one tile. Different levels could have their own tile sets, and when a level was destroyed it was very easy to move the tiles however we wanted. Since we made our own tile system we also had to make our own collision system. For the collision system I just rebuilt what I did for my 6502 computer.",
            },
          ],
        },
      ],
    },
    {
      id: "KingdomChaos",
      title: "Kingdom Chaos",
      date: "February 2024",
      image: "assets/images/kingdom/gamePlay.png",
      summary: "A chess themed bullet hell",
      sections: [
        {
          title: "Overview",
          blocks: [
            {
              type: "p",
              text: "[Kingdom Chaos](https://bcmassey.itch.io/kingdom-chaos) is a 2d platformer bullet hell with a chess theme. You play as a pawn, and you are the only one left in your army. Your king has asked you to defeat the enemy army and protect him. You then go off and complete a series of boss fights to save your king. This game was made for the TSA Video Game competition with Jack Marris. This game ended up winning 2nd place!",
            },
          ],
        },
      ],
    },
    {
      id: "TheWonderousWorld",
      title: "The Wonderous World",
      date: "February 2022",
      image: "assets/images/wonderworld/gamePlay.png",
      summary: "A 2D platformer based around the Wonders of the World.",
      sections: [
        {
          title: "Overview",
          blocks: [
            {
              type: "p",
              text: "[The Wonderous World](https://bcmassey.itch.io/the-wonderous-world) is a 2D platformer where you play as an adventurer collecting artifacts from the 7 Wonders of the World for a museum. Be careful, other adventurers are also trying to collect the artifacts! This game was developed for the TSA Video Game competition.",
            },
          ],
        },
      ],
    },
  ],
  other: [
    {
      id: "desmos",
      title: "Desmos Graphs",
      date: "",
      image: "assets/images/desmos/mandelbrot.png",
      summary: "A collection of cool graphs I have made in the Desmos graphing calculator",
      sections: [
        {
          title: "Overview",
          blocks: [
            {
              type: "p",
              text: "Desmos is a powerful graphing calculator. Here are some of the cool desmos graphs I have made.",
            }
          ],
        },
        {
          title: "Mandelbrot",
          blocks: [
            {
              type: "image",
              src: "assets/images/desmos/mandelbrot.png",
              alt: "Mandelbrot graph",
            },
            {
              type: "p",
              text: "[A graph of the mandelbrot fractal.](https://www.desmos.com/calculator/yqxevx1wje) ",
            }
          ],
        },
        {
          title: "MIT Dome",
          blocks: [
            {
              type: "image",
              src: "assets/images/desmos/mitDome.png",
              alt: "Mit Dome graph",
            },
            {
              type: "p",
              text: "[A graph drawing of the MIT Dome with fireworks in background.](https://www.desmos.com/calculator/5oohertnty) ",
            }
          ],
        },
        {
          title: "Golf Game",
          blocks: [
            {
              type: "image",
              src: "assets/images/desmos/golf.png",
              alt: "Golf game graph",
            },
            {
              type: "p",
              text: "[A golf game in desmos.](https://www.desmos.com/calculator/s75lspeotr) ",
            }
          ],
        },
        {
          title: "Mountain sunrise",
          blocks: [
            {
              type: "image",
              src: "assets/images/desmos/mountains.png",
              alt: "Mountain graph",
            },
            {
              type: "p",
              text: "[A graph of mountains with a rising sun.](https://www.desmos.com/calculator/tnhrnwuln1) ",
            }
          ],
        },
        {
          title: "3D Utah Teapot in 2D Graph",
          blocks: [
            {
              type: "image",
              src: "assets/images/desmos/utahteapot.png",
              alt: "3D Utah Teapot graph",
            },
            {
              type: "p",
              text: "[A 3D Utah Teapot in 2D Desmos.](https://www.desmos.com/calculator/fbb954dbde) ",
            }
          ],
        },
        {
          title: "Subwoofer Design",
          blocks: [
            {
              type: "image",
              src: "assets/images/desmos/subwoofer.png",
              alt: "3D Utah Teapot graph",
            },
            {
              type: "p",
              text: "[Designed a subwoofer in Desmos.](https://www.desmos.com/calculator/5945c5ae9c) ",
            }
          ],
        },
        {
          title: "Fixed Point 3D renderer",
          blocks: [
            {
              type: "image",
              src: "assets/images/desmos/FixedPointRenderer.png",
              alt: "3D Utah Teapot graph",
            },
            {
              type: "p",
              text: "[For one of my projects I was contemplating using fixed point arithmetic but before implementing it I wanted to see how it would look](https://www.desmos.com/calculator/siyzpfxagn) ",
            },
            {
              type: "p",
              text: "[Similarly I made a graph testing 16 bit floats instead.](https://www.desmos.com/calculator/nruwysokah) ",
            }
          ],
        },
        {
          title: "Color Bit-Depth",
          blocks: [
            {
              type: "image",
              src: "assets/images/desmos/hologramColors.png",
              alt: "Color graph",
            },
            {
              type: "p",
              text: "[Testing how colors would look given different bit depths](https://www.desmos.com/calculator/948df8a23c) ",
            },
          ],
        },
        {
          title: "Triangle Rasterizer",
          blocks: [
            {
              type: "image",
              src: "assets/images/desmos/rasterizer.png",
              alt: "Color graph",
            },
            {
              type: "p",
              text: "[Testing a triangle rasterizing algorithm](https://www.desmos.com/calculator/123724bd86) ",
            },
          ],
        },
        {
          title: "Ice Cream",
          blocks: [
            {
              type: "image",
              src: "assets/images/desmos/iceCream.png",
              alt: "Color graph",
            },
            {
              type: "p",
              text: "[Ice Cream](https://www.desmos.com/calculator/h6nvsgty4c) ",
            },
          ],
        },
        {
          title: "2D Raycaster",
          blocks: [
            {
              type: "image",
              src: "assets/images/desmos/2dRayCaster.png",
              alt: "Color graph",
            },
            {
              type: "p",
              text: "[Simple 2D Raycaster](https://www.desmos.com/calculator/230a234d96) ",
            },
          ],
        },
        {
          title: "Fourier Transform",
          blocks: [
            {
              type: "image",
              src: "assets/images/desmos/fourier.png",
              alt: "Color graph",
            },
            {
              type: "p",
              text: "[Simple Fourier Transform](https://www.desmos.com/calculator/aw5ukdoylh) ",
            },
          ],
        },
        {
          title: "Inverse Kinematics",
          blocks: [
            {
              type: "image",
              src: "assets/images/desmos/ik.png",
              alt: "Color graph",
            },
            {
              type: "p",
              text: "[Simple 2D inverse kinematics](https://www.desmos.com/calculator/8k7hc2nkzg) ",
            },
          ],
        },
        {
          title: "Planet With Fireworks",
          blocks: [
            {
              type: "image",
              src: "assets/images/desmos/planet.png",
              alt: "Color graph",
            },
            {
              type: "p",
              text: "[Graph of planet made for father's day](https://www.desmos.com/calculator/88383f58c1) ",
            },
          ],
        },
        {
          title: "Ocean Scene",
          blocks: [
            {
              type: "image",
              src: "assets/images/desmos/oceanScene.png",
              alt: "Color graph",
            },
            {
              type: "p",
              text: "[Graph made for a math class assignment. Kicked off my love for desmos](https://www.desmos.com/calculator/6c917ac4ba) ",
            },
          ],
        },
        
        
      ],
    },
    {
      id: "Speakers",
      title: "Big Speakers",
      date: "2025",
      image: "assets/images/speakers/speakersOnDesk.JPG",
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

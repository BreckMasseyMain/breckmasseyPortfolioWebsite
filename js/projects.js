//Local host instruction
//http://localhost:8000
//py -m http.server 8000


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
 *   { type: "image", src: "assets/images/photo.jpg", alt: "Description", aspectRatio: "4 / 3" }
 *   { type: "image", src: "assets/images/photo.jpg", alt: "Square", aspectRatio: "1 / 1" }
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
      id: "voxelOpenGLEngine",
      title: "Voxel OpenGL Engine",
      date: "2025",
      image: "assets/images/voxels/voxelEngineTerrainAndTrees.PNG",
      summary: "Tiny Voxel Engine based built OpenGl.",
      sections: [
        {
          title: "Overview",
          blocks: [
            {
              type: "p",
              text: "With my goal to make some sort of game with tiny voxels, I knew I would have to create my own engine. Other engines were too restrictive and I wanted full control of how the engine would run. I decided to use OpenGl because it gave me a lot of freedom and was easier to set up than vulkan.",
            },
          ]
        },
        {
          title: "Rendering Technique",
          blocks: [
            {
              type: "p",
              text: "Similar to my previous voxel projects I settled on using DDA raymarching. I also took inspiration from teardown. Instead of starting the rays from the camera, you first rasterize bounding boxes for all of the objects. Then in the fragment shader you render each object. The start of the ray is on the triangle saving a lot of compute. Each object is given a color palette then the voxel data stores an index to the color. This helps reduce the size of the voxel data. While other models are imported, the terrain is made on runtime. It reads in a texture and height map. The texture has no limit on how many colors it can have so, for each chunk you have to run a color compression algorithm to limit the number of colors to 256. It does not sound like much but there is no visible difference. Through tests I found less than a 1% error between the original color and final color.",
            },
            {
              type: "image",
              src: "assets/images/voxels/voxelEngineTerrain.PNG",
              alt: "Voxel terrain",
              caption: "Terrain with normal texture"
            },
            {
              type: "image",
              src: "assets/images/voxels/brickTerrainTexture.PNG",
              alt: "Voxel terrain with brick texture",
              caption: "Terrain with brick texture"
            },
          ],
          subsections: [
            {
              title: "Shadows",
              blocks: [
            {
              type: "p",
              text: "The next change was to add shadows. Once again I took inspiration from teardown. I made a huge low resolution texture which held the approximate data of the whole world. When rendering each object I would cast a ray through the low resolution texture and see if it hit anything. This allowed for a basic implementation of shadows",
            },
            {
              type: "image",
              src: "assets/images/voxels/shadowsWorking.PNG",
              alt: "Shadows",
              caption: "Terrain with rainbow texture and shadows"
            },
              ],
            },
          ]
        },
      ],
    },
    {
      id: "softBodyPhysicsEngine",
      title: "Soft Body Physics Engine",
      date: "2024",
      image: "assets/images/physics/softbodyPhysics.PNG",
      summary: "2D soft body physics engine capable of complex shapes.",
      sections: [
        {
          title: "Overview",
          blocks: [
            {
              type: "p",
              text: "After playing Jelly Car I wanted to create similar physics where everything is similar to Jell-O. Similar to my rigid body project, this project is a 2D physics engine which can handle complex colliders but everything acts like a soft body.",
            },
          ]
        },
        {
          title: "Technique",
          blocks: [
            {
              type: "p",
              text: "Each object is a polygon. To detect if a point is in a polygon you cast a ray from the point out to another point in infinity. Then count how many intersections there are between the point and the polygon. If the number of intersections is even the point is outside of the polygon. If it is odd the point is inside. To resolve the collision you find the closest point on the polygon and move the point there. Also adjust the polygon accordingly. It is relatively simple and can create complex results.",
            }
          ],
        },
        {
          title: "Demo",
          blocks: [
            {
              type: "embed",
              src: "demos/softBodyPhysics/softBody.html",
              title: "Soft Body Physics Engine",
              height: 640,
              caption: "Click the game, then use arrow keys.",
            }
          ],
        },
      ],
    },
    {
      id: "rigidBodyPhysics",
      title: "Rigid Body Physics Engine",
      date: "2023",
      image: "assets/images/physics/rigidbodyPhysics.PNG",
      summary: "2D rigid body physics engine capable of complex shapes.",
      sections: [
        {
          title: "Overview",
          blocks: [
            {
              type: "p",
              text: "I have always loved programming video games, but I would always get stumped when it came to the physics engine. Specifically collisions and collision resolution. In this project I built a 2D physics engine which can handle complex colliders. ",
            },
          ]
        },
        {
          title: "Technique",
          blocks: [
            {
              type: "p",
              text: "Each object is a polygon. To detect if a point is in a polygon you cast a ray from the point out to another point in infinity. Then count how many intersections there are between the point and the polygon. If the number of intersections is even the point is outside of the polygon. If it is odd the point is inside. To resolve the collision you find the closest point on the polygon and move the point there. It is relatively simple and can create complex results.",
            }
          ],
        },
        {
          title: "Demo",
          blocks: [
            {
              type: "embed",
              src: "demos/rigidBodyPhysics/rigidBody.html",
              title: "Rigid Body Physics Engine",
              height: 640,
              caption: "Click the game, then use arrow keys.",
            }
          ],
        },
      ],
    },
    {
      id: "voxelRenderingTechniques",
      title: "Voxel Rendering Techniques",
      date: "",
      image: "assets/images/voxels/shadertoyVoxel.PNG",
      summary: "A summary of my projects related to rendering voxels.",
      sections: [
        {
          title: "Overview",
          blocks: [
            {
              type: "p",
              text: "A voxel is a volumetric pixel, essentially a cube (think Minecraft). I became fascinated with voxels because of the game Teardown, which has a fully destructible world made of tiny voxels. Because of this fascination I have made many projects based around them.",
            },
          ],
        },
        {
          title: "Rendering Techniques",
          subsections: [
            {
              title: "Rasterization/Meshes",
              blocks: [
                {
                  type: "p",
                  text: "This method of rendering voxels uses the most straightforward method used by most games, rasterization. Every cube is made up of triangles. Sides of the cube that are surrounded are not drawn for efficiency. This method was the easiest to implement but has many drawbacks. When trying to do very small voxels the triangles become very small. While modern GPUs are very efficient, small triangles use a lot of resources. Also lighting and other effects are harder to implement than other methods. ",
                },
                {
                  type: "image",
                  src: "assets/images/voxels/rasterization.jpg",
                  alt: "Rasterized cubes",
                },
              ],
            },
            {
              title: "Marching Cubes",
              blocks: [
                {
                  type: "p",
                  text: "This is another rasterization method; However, instead of drawing cubes, you form a mesh around the voxel data. This method was originally developed to visualize medical scan. I liked this method but I preferred the look of cubes.",
                },
                {
                  type: "image",
                  src: "assets/images/voxels/marchingCubes.jpg",
                  alt: "Marching Cubes",
                },
              ],
            },
            {
              title: "DDA Raycasting",
              blocks: [
                {
                  type: "p",
                  text: "DDA is a line drawing algorithm which visits every \"pixel\" the line passes through. This is very useful for raycasting where a ray is essentially a line. To start I made a simple cpu based raycaster as a proof of concept, but since it was running on the cpu it was very inefficient.",
                },
                {
                  type: "image",
                  src: "assets/images/voxels/lowResCPURaycasting.jpg",
                  alt: "CPU Raymarcher",
                },
                {
                  type: "p",
                  text: "I converted the CPU raymarcher to a GPU raymarcher using shadertoy.",
                },
                {
                  type: "image",
                  src: "assets/images/voxels/shadertoyVoxel2.PNG",
                  alt: "GPU Raymarcher",
                },
              ],
            },
            {
              title: "DDA Raycasting Lighting",
              blocks: [
                {
                  type: "p",
                  text: "After getting the raycaster working on the GPU, I started experimenting with lighting. ",
                },
                {
                  type: "image",
                  src: "assets/images/voxels/shadertoyVoxel.PNG",
                  alt: "GPU Raymarcher with better Lighting",
                },
              ],
            },
            {
              title: "Multilevel DDA Raycasting",
              blocks: [
                {
                  type: "p",
                  text: "In the DDA method you visit every voxel. If there is a lot of open space this can be very slow. The solution is to have a hierarchy where large open spaces can be skipped. You start by casting the ray on the top level. If you hit something you go down a level until you are at the base level. This allows large spaces to be skipped. Once again I started by coding this method on the CPU.",
                },
                {
                  type: "image",
                  src: "assets/images/voxels/multiLevel2DDiagram.PNG",
                  alt: "Multilevel DDA diagram",
                },
                {
                  type: "image",
                  src: "assets/images/voxels/multiLevel.PNG",
                  alt: "Multilevel DDA diagram",
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
      id: "RISCComputer",
      title: "RISC-V computer and 3D Graphics Card",
      date: "Summer 2026",
      image: "assets/images/FPGAGraphicsCard/thumbnail.JPG",
      summary: "A custom computer running on an FPGA",
      //make sure to talk about
      /**
       * 
       * 
       * mandelbrot
       * 
       * tool website
       * c mock up
       * desmos mock up
       * shader toy mock up
       * 
       * skills learned section
       *  system verilog and making testbenches
       *  c and make/gcc
       *  vivado tools
       *  learned about cpu and gpu design
       *  learned about the floating point system and how to design hardware for it
       *  
       */
      sections: [
        {
          title: "Overview",
          blocks: [
            {
              type: "p",
              text: "Essentially, as a broad overview of this project, I made a fully functioning computer that runs on a FPGA (Field Programmable Gate Array). And I did it all without AI writing any of the hardware! An FPGA is a special type of computer chip that can \"emulate\" other circuitry. In this case the FPGA is \"emulating\" the computer I designed. The computer is split into two parts. There is the CPU (Central Processing Unit), which is the brains of the computer, then the GPU (Graphics Processing Unit) which does all of the drawing and computations related to drawing.",
            },
          ],

          subsections: [
            {
              title: "What can the computer do?",
              blocks: [
                {
                  type: "video",
                  src: "https://youtu.be/YBSbNq8QTDo",
                  caption: "Demo of computer rendering a 3D scene of a Ball, the Blender Monkey, and the Utah Teapot "
                }, 
                {
                  type: "p",
                  text: "The CPU can pretty much run any program written in the C programming language. The one limitation is floating arithmetic since the CPU has no instructions that can do it natively. The solution is memory mapped floating point arithmetic. The CPU can write to the screen allowing the user to make programs that draw shapes or text. When it comes to drawing, the CPU is pretty slow. Instead the much faster approach is to utilize the GPU.",
                },
                {
                  type: "p",
                  text: "The GPU takes in an list of vertices and a 4x4 matrix. The matrix is used to transform the vertices in 3d space. This is useful for translating/rotating/scaling models with respect to a camera. Then the GPU draws every 3 vertices as a triangle on the screen with a corresponding color."
                },
                {
                  type: "p",
                  text: "The structure of a normal program goes as follows. 1. The cpu will load the vertices and color for the model to a certain point in memory. 2. The cpu will make a 4x4 matrix based on a given rotation/translation/scale/and projection matrix. 3. The cpu will give this matrix to the GPU along with information on where the triangles are stored. 4. The cpu sends a command to draw all of the triangles for a given model. 5. repeat steps 2-4 for each model. 6. Wait for the GPU to finish drawing then tell the GPU to flip the front and back buffers so the image can be visible."
                },
              ],
            },   
            {
              title: "Quick Stats",
              blocks: [
                
                {
                  type: "p",
                  text: "The CPU is a slightly limited implementation of the RISCV-32I instruction set. It runs at around 10Mhz.",
                },
                {
                  type: "p",
                  text: "In general the GPU can draw around 300ish triangles at 60 fps on a 1280x720 resolution display at 24 bits per pixel. "
                },
                {
                  type: "p",
                  text: "Both the CPU and GPU can use 16 bit floating point arithmetic (Add/Sub, Mult, Div).",
                },
              ],
            },
            {
              title:"Development tools overview",
              blocks:[
                {
                  type: "p",
                  text: "I used the Urbana RealDigital board (uses the AMD XC7S50-CSG324A Spartan 7 FPGA). For this project all the hardware was made using SystemVerilog. I used the Visual Studio Code IDE. Vivado was used for simulation and generation of the bit file. I used the openFPGALoader to program the FPGA. Some custom made tools that I will talk about later. I used shadertoy to test some rendering methods. Finally I also used Desmos to test a lot of math throughout this project.",
                }
              ]
            }
          ],
        }, 
        {
          title: "Development timeline",
          blocks:[
            {
              type: "p",
              text: "I built this whole project over the summer of 2026. I started around June 1st and finished right around September 1st. My work on it was a bit sporadic depending on what I had going on, but surprisingly some of my most productive weeks were when I was on vacation! ",
            }
          ],
          subsections: [
            {
              title:"CPU Development",
              blocks:[
                {
                  type: "p",
                  text: "To start the summer I made the CPU. To start the CPU ran fully off of BRAM not the actual RAM chip. Through out the process of build the CPU I would write little test programs to test the functionality. This was before I learned about using Makefiles and GCC to compile C code for me. I am very grateful that I learned that skill because I've already spent enough of my life writing assembly (see my 6502 project)",
                },
                {
                  type: "video",
                  src: "https://youtube.com/shorts/TRToxRDlRAU",
                  caption: "Video demonstrating early RISC-V CPU running simple program"
                }
              ]
            },
            {
              title:"Implementing RAM",
              blocks:[
                {
                  type: "p",
                  text: "After making the CPU I decided to tackle writing up the RAM Controller. I knew all of the systems would eventually need to be hooked up to a real RAM so I decided to make that next. This was by far the hardest part for me. I was using the UberDDR3 RAM Controller was made by Angelo Jacobo to communicate with the actual DRAM chips. Getting this running in simulation was such a pain. Not because of me but because of some weird issues on Vivado's side. Vivado was seemingly ignoring the Define statements which were used to se up the type of RAM chip UberDDR3 would communicate with. After getting UberDDR3 working in simulation I started working on making the actual RAM controller. This took me a while, since I was also developing the HDMI Controller at the same time so I could visually check if the RAM was working. Between the two I kept running into weird off by one errors that would completely destroy the image. Basically all of my errors came down to improperly using FIFOs. Once I figured out how to properly use FIFOs all of my issues disappeared. You would think I learned my lesson but throughout the rest of the project I would try to take shortcuts when setting up FIFOs and it would always come back to bite me. I think the biggest lesson I have learned through this project is how to use FIFOs properly.",
                },
                {
                  type: "video",
                  src: "https://youtu.be/8qhd6F3SbVg",
                  caption: "Video showing the glitchy RAM outputs then the file stable RAM output."
                }
              ]
            },
            {
              title:"Hooking up the CPU to RAM and the Mandelbrot Fractal",
              blocks:[
                {
                  type: "p",
                  text: "The next big step was to convert my CPU from using the FPGA's BRAM to using the actual RAM. This was a challenge because my CPU was originally designed expecting the RAM to respond immediately to request. Now I had to change the structure slightly to support waiting for RAM request to finish. After hooking up the CPU to RAM I then added Memory Mapped I/O (MMIO). I used this for accessing external components such as LEDs. I also used it for communication between the CPU and GPU. And finally it gave my CPU which can only do integer operations access to external hardware which could do 16 bit floating point operations. After this I made the Mandelbrot Fractal as a demo. It took the computer about 3 minutes to compute the 1280x720 pixel display using 20 iterations per pixel. This is about 73 million floating point multiplications and 92 million floating point additions!"
                },
                {
                  type: "image",
                  src: "assets/images/FPGAGraphicsCard/mandel1.JPG",
                  caption: "Image showing output from Mandelbrot Fractal program."
                },
                {
                  type: "video",
                  src: "https://youtube.com/shorts/aE-O2uNWqME",
                  caption: "Time lapse of Mandelbrot Fractal being drawn by CPU."
                }
              ]
            },
            {
              title:"First Triangle",
              blocks:[
                {
                  type: "p",
                  text: "The next step was to start on the graphics card. I opted to start by making the triangle drawer because I could immediately see results. I essentially followed the method layed out in the paper \"A Parallel Algorithm for Polygon Rasterization\" by Juan Pineda to implement the rasterization. Bellow is an image of the first triangle successful triangle rendered by the triangle drawer. As you can see the triangle is stripped, but the triangle drawer can only actually draw one color for a triangle. This is because every time the triangle drawer finished drawing a triangle it was assigned a new color. What we are seeing is the triangle drawer drawing multiple triangles as the HDMI \"beam\" passes by."
                },
                {
                  type: "image",
                  src: "assets/images/FPGAGraphicsCard/Triangle1.JPG",
                  caption: "Image showing first triangle drawn by the triangle drawer."
                }
              ]
            },
            {
              title:"Start to GPU",
              blocks:[
                {
                  type: "p",
                  text: "In the current form the triangle drawer was only drawing the same hardwired triangle. So the next logical step was for the CPU to tell the GPU which triangles to draw. To do this I started setting up the GPU. For now I took vertices, which were fixed point screen space coordinates, and just transferred them to the triangle drawer. Before I had the triangle drawer directly connected to the RAM Controller but now it had to go through the GPU RAM Controller which manages all of the memory access for the GPU components. Even though the triangle drawer was not touched, this transition caused some new problems and exposed other problems about the triangle drawer. Most of the new issues were a result of poor FIFO usage when sending data to the RAM."
                },
                {
                  type: "video",
                  src: "https://youtu.be/6bPHYiQqM9M",
                  caption: "Initial buggy triangle drawing."
                }
              ]
            },
            {
              title:"Start to GPU",
              blocks:[
                {
                  type: "p",
                  text: "In the current form the triangle drawer was only drawing the same hardwired triangle. So the next logical step was for the CPU to tell the GPU which triangles to draw. To do this I started setting up the GPU. For now I took vertices, which were fixed point screen space coordinates, and just transferred them to the triangle drawer. Before I had the triangle drawer directly connected to the RAM Controller but now it had to go through the GPU RAM Controller which manages all of the memory access for the GPU components. Even though the triangle drawer was not touched, this transition caused some new problems and exposed other problems about the triangle drawer. Most of the new issues were a result of poor FIFO usage when sending data to the RAM."
                },
                {
                  type: "video",
                  src: "https://youtu.be/6bPHYiQqM9M",
                  caption: "Initial buggy triangle drawing."
                },
                {
                  type: "video",
                  src: "https://youtu.be/bK4tjq2lQGE",
                  caption: "Video showing some of the triangle bugs fixed"
                }
              ]
            },
            {
              title:"Vertex Transformer (Final Part of GPU)",
              blocks:[
                {
                  type: "p",
                  text: "Now that I could draw triangles, I had to implement the Vertex Transformer. The Vertex Transformer takes an input vertex and transforms it to a position on the screen using a 4x4 matrix. It then feeds the screen space coordinates to the Triangle Drawer to have them drawn onto the screen as triangles. Testing the Vertex Transformer exposed a lot of minute issues in the floating point hardware I designed. I had to revisit many of my simulations and correct these small mistakes. Eventually I was able to make it work and render triangles on screen in a similar method to other graphics cards."
                },
                {
                  type: "video",
                  src: "https://youtu.be/k9ztGii0XwQ",
                  caption: "Video showing a 3D quad rotating around on screen."
                },
                {
                  type: "video",
                  src: "https://youtu.be/KJYyj4gdRCQ",
                  caption: "Video showing progress on a drawing a cube"
                },
                {
                  type: "video",
                  src: "https://youtube.com/shorts/vkB4mIILwLs",
                  caption: "Video showing a 3d rotating cube being drawn by the graphics card"
                },
                {
                  type: "video",
                  src: "https://youtu.be/JFy78LCcJ14",
                  caption: "Video showing a 3d rotating low resolution Utah Teapot being drawn by the graphics card"
                },
                {
                  type: "video",
                  src: "https://youtu.be/UvBAtRNgecE",
                  caption: "Video showing a glitchy 3d rotating blender monkey being drawn by the graphics card. It reminds me oif the glitch effect from Spiderman into the Spiderverse."
                },
                {
                  type: "video",
                  src: "https://youtu.be/5lsJ-nbQT3c",
                  caption: "Video showing a less glitchy 3d rotating blender monkey being drawn by the graphics card."
                }
              ]
            },
            {
              title:"Depth Buffer",
              blocks:[
                {
                  type: "p",
                  text: "In the video above, you may have noticed when the monkey turned around, it's eyebrows were poking through the back of it's head. The reason being there was no depth buffer. The model was drawn in a specific order not based on depth meaning a further away triangle could be incorrectly drawn after a closer triangle. To fix that the depth buffer only allows closer triangles to be drawn. Due to size limitations I could not smoothly interpolate the depth across the triangle. Instead the triangle uses one depth which is an approximation of the 3 vertices. "
                },
                {
                  type: "video",
                  src: "https://youtu.be/xs2p3Ozwmxo",
                  caption: "Video showing the same blender monkey but with the depth buffer."
                },
                {
                  type: "p",
                  text: "After implementing the depth buffer the graphics card was essentially done. I then experimented with drawing multiple models and coloring them."
                },
                {
                  type: "video",
                  src: "https://youtube.com/shorts/UyBkrNyU9bU",
                  caption: "Video showing multiple objects. You may notice that the teapot seems to be showing internal triangles. This is because at that time the triangles were basing their depth on an arbitrary vertex rather than averaging the vertices. This would causes issues like this."
                },
                {
                  type: "video",
                  src: "https://youtu.be/YBSbNq8QTDo",
                  caption: "Final rendering Demo."
                }
              ]
            }

            //gpu development
            //programming
          ],
        },
        {
          title: "System Architecture",
          blocks:[
            {
              type: "image",
              src: "assets/images/FPGAGraphicsCard/generalArchitecture.PNG",
              alt: "Rough diagram of the system",
              aspectRatio: "1920 / 1080"
            },
          ],
          subsections: [
            {
              title: "System Architecture Overview",
              blocks: [
                {
                  type: "p",
                  text: "While the exciting parts of the system are the CPU and GPU, there is a lot of supporting architecture that allows the computer to work. For example, every component in the computer ends up touching the RAM Controller. Overall the whole system can be broken down into the following: CPU, GPU, RAM Controller, MMIO Controller (Memory Mapped I/O), HDMI Controller, and the CPU Floating point hardware.",
                },
                {
                  type: "p",
                  text: "CPU: Does all of the computation and runs the program",
                },
                {
                  type: "p",
                  text: "GPU: Draws the triangles",
                },
                {
                  type: "p",
                  text: "RAM Controller: Manages the read/write requests to RAM.",
                },
                {
                  type: "p",
                  text: "MMIO Controller: The Memory Mapped I/O Controller intercepts some request to RAM and instead reads or writes to a register used by other components.",
                },
                {
                  type: "p",
                  text: "HDMI Controller: Manages transferring the frame buffer from RAM to output it through HDMI.",
                },
                {
                  type: "p",
                  text: "CPU Floating Point Hardware: Takes inputs through the MMIO registers and outputs the calculated result through other MMIO registers.",
                },
              ],
            },
            {
              title: "System Memory Map",
              blocks:[
                {
                  type: "p",
                  text: "0x0000_0000-0x007F_FFFF - Screen Buffer 1"
                },
                {
                  type: "p",
                  text: "0x0080_0000-0x00FF_FFFF - Screen Buffer 2"
                },
                {
                  type: "p",
                  text: "0x0100_0000-0x017F_FFFF - Triangle Vertex Buffer"
                },
                {
                  type: "p",
                  text: "0x0180_0000-0x0180_00FF - MMIO (NOT byte addressable only word addressable)"
                },
                {
                  type: "p",
                  text: "0x0200_0000-end - CPU Program"
                }
              ],
            },
            {
              title: "CPU",
              blocks:[
                {
                  type: "p",
                  text: "The CPU is a slightly limited implementation of the RISCV-32I instruction set. The CPU uses all of the RISCV-32 instructions except the ones related to operating systems. Since I knew the end goal was not to have an operating system but run a game, I decided not to implement these functions. The CPU has full access to RAM except in the MMIO range. In this range the MMIO controller intercepts the reads and writes and instead reads from or writes to registers which are used for various purposes. One example of the uses of MMIO registers is on board LEDs and Switches. By writing/reading to a certain spot in RAM, the CPU can control them."
                },
                {
                  type: "p",
                  text: "The CPU is made up of a few different parts. The Register stack holds the 31 register used for calculations. The ALU does all of the math. The Instruction Decoder interprets and conducts the CPU. The CPU program loader is only used on start up to transfer the CPU's program from the FPGA's internal BRAM to the boards physical much larger RAM. Finally the CPU RAM Controller controls the flow of data in and out of the CPU. While the every component in the CPU runs at 10MHz, the CPU RAM Controller runs at 100MHz. The reason for the different speeds is because the rest of the components on the CPU needed more time to settle due to more complicated logic. The CPU RAM Controller, on the other hand, was much simpler and could run at a higher speed. The slow clock speed does not impact the performance of the CPU much because the CPU spends most of its time waiting for RAM to respond. This computer is mostly limited by RAM because so many components want to talk to it. "
                }
              ],
            },
            {
              title: "GPU",
              blocks:[
                {
                  type: "p",
                  text: "While the GPU's primary function is to draw triangles it can do a bit more than that. Specifically it can 0. Switch the front and back buffer then clear the new back buffer, 1. draw triangles, 2. clear back buffer, 3. switch buffers. The GPU is mostly made up of three components, the Vertex Transformer, Triangle Drawer and the GPU RAM Controller.",
                },
                {
                  type: "p",
                  text: "The RAM Controller simply controls the flow of data in and out of the GPU and also is responsible for clearing the back buffer."
                },
                {
                  type: "p",
                  text: "The Vertex Transformer takes each vertex the multiplies it against the input 4x4 matrix (provided by the CPU). Then the resulting vector is divided by its w component to give the vertex perspective. At this point, similar to openGL, the vertex should be in a box ranging from -1 to 1. The vertex is transformed from that box from -1 to 1 to screen space 0 - 1280 in the x and 0 - 720 in the y z goes from 0 - 256. When doing this the 16 bit floating point vertex is converted to 16 bit fixed point (12 bits.4 bits). This allows for much simpler logic in the triangle drawer. The final transformed vertex is then passed off to the triangle draw along with its color."
                },
                {
                  type: "p",
                  text: "The Triangle Drawer takes each vertices from triangle drawer. For every there vertices it gets it will draw a triangle of the given color. The triangle drawer only draws triangles of a counter clock wise winding order (industry standard). Each pixel of the triangle is only drawn if its depth is closer than the one in the depth buffer. The depth of each triangle is calculated on a whole triangle basis by an algorithm that approximates the average of the 3 z coordinates of the triangle. I attempted to make the depth interpolate across the triangle. It worked in simulation; however it was too large to fit on my FPGA so I had to remove it.  "
                },
                {
                  type: "image",
                  src: "assets/images/FPGAGraphicsCard/simDepthBuffer.PNG",
                  alt: "Sim Depth Buffer",
                  aspectRatio: "1 / 1",
                  caption: "Depth Buffer output from Simulation (per triangle)"
                },
                {
                  type: "p",
                  text: "The GPU is controlled by the CPU through MMIO registers. The CPU first starts by writing to Graphics Card Draw State Register to indicate what the GPU should do (0-switch buffers and clear back, 1-draw triangles, 2-clear back buffer, 3-switch buffers). Now if the state is 0, 2, or 3 the GPU does not need any more info and the CPU can signal the GPU to start by writing a 1 to the GPU Start register. If the state is 1 the CPU is telling the GPU to draw triangles so it has to indicate the starting index, ending index, and the 4x4 matrix. From here the CPU can tell the GPU to start. The GPU also outputs to one of the registers if it is ready more for commands so the CPU knows when it can send commands to the GPU."
                }
              ],
            },
            {
              title: "RAM Controller",
              blocks:[
                {
                  type: "p",
                  text: "I felt like a plumber making the RAM Controller since it takes all of these \"pipes\" of data from all of the computer sends them off to the RAM then there is another \"pipe\" coming back from the RAM which has to be split off and sent back to the right components. The RAM Controller essentially controls the data flow into and out of the UberDDR3 RAM Controller. The UberDDR3 RAM Controller was made by Angelo Jacobo to control the DRAM chip and make interfacing with it easy.",
                }
              ],
            },
            {
              title: "HDMI Controller",
              blocks:[
                {
                  type: "p",
                  text: "The HDMI Controller is pretty simple, all it does is read data from the front buffer and outputs it to the screen using HDMI.",
                }
              ],
            },
            {
              title: "MMIO Controller",
              blocks:[
                {
                  type: "p",
                  text: "The Memory Mapped I/O Controller gives the CPU access to MMIO. MMIO is used by the CPU to communicate with the GPU, 16 bit floating point hardware and external hardware. Bellow you can see all of the MMIO registers."
                },
                {
                  type: "image",
                  src: "assets/images/FPGAGraphicsCard/MMIO1.PNG",
                  alt: "MMIO table 1",
                  aspectRatio: "764 / 865", 
                },
                {
                  type: "image",
                  src: "assets/images/FPGAGraphicsCard/MMIO2.PNG",
                  alt: "MMIO table 2",
                  aspectRatio: "775 / 560", 
                },
              ],
            }
          ]
        }
      ],
    },
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
      image: "assets/images/jamIt/JamItCover.PNG",
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
              aspectRatio: "9 / 16"
            },
          ],
        },
      ],
    },
    {
      id: "WaddlesAndWiggles",
      title: "Waddle's and Wiggle's Wild Dash to the Way Out",
      date: "February 2025",
      image: "assets/images/waddlesAndWiggles/gamePlay.PNG",
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
      image: "assets/images/kingdom/gamePlay.PNG",
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
      image: "assets/images/wonderworld/gamePlay.PNG",
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
      image: "assets/images/desmos/mandelbrot.PNG",
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
              src: "assets/images/desmos/mandelbrot.PNG",
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
              src: "assets/images/desmos/mitDome.PNG",
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
              src: "assets/images/desmos/golf.PNG",
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
              src: "assets/images/desmos/mountains.PNG",
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
              src: "assets/images/desmos/utahteapot.PNG",
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
              src: "assets/images/desmos/subwoofer.PNG",
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
              src: "assets/images/desmos/FixedPointRenderer.PNG",
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
              src: "assets/images/desmos/hologramColors.PNG",
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
              src: "assets/images/desmos/rasterizer.PNG",
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
              src: "assets/images/desmos/iceCream.PNG",
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
              src: "assets/images/desmos/2dRayCaster.PNG",
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
              src: "assets/images/desmos/fourier.PNG",
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
              src: "assets/images/desmos/ik.PNG",
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
              src: "assets/images/desmos/planet.PNG",
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
              src: "assets/images/desmos/oceanScene.PNG",
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
      id: "printedSub",
      title: "3D Printed Subwoofer",
      date: "2025",
      image: "assets/images/speakers/subPrinted.JPG",
      summary: "Wanted to build speakers for my dorm.",
      sections: [
        {
          title: "Overview",
          blocks: [
            {
              type: "p",
              text: "When I moved into my dorm for college I was missing my big speakers, so I started work on a new set. Instead of buying drivers like last time, I wanted to build the actual subwoofer driver.",
            },
          ],
        },
        {
          title: "Development",
          blocks: [
            {
              type: "p",
              text: "I knew I wanted to make a parametric design in fusion so the subwoofer could be fully customizable, but before making it in fusion I made a mock up in Desmos.",
            },
            {
              type: "image",
              src: "assets/images/desmos/subwoofer.PNG",
              alt: "Desmos design",
            },
            {
              type: "p",
              text: "I knew the parametric design would work so I modeled a subwoofer in fusion."
            },
            {
              type: "image",
              src: "assets/images/speakers/subRender.jpg",
              alt: "Fusion design",
              aspectRatio: "1 / 1"
            },
            {
              type: "p",
              text: "From there I 3D printed the design and assembled it in my dorms maker space. I also designed a box for the speaker."
            },
            {
              type: "image",
              src: "assets/images/speakers/subInBox.JPG",
              alt: "Fusion design",
              aspectRatio: "1 / 1"
            },
          ],
          subsections:
          [
            {
              title: "Downfalls",
              blocks: [
                {
                  type: "p",
                  text: "While the subwoofer driver worked, I made some critical errors which made it so it could be practically used. The first error was I wound the coil with too thin of wire. This made the coil heat up very quickly at low volumes and unusable for any listening volumes. The other pitfall was I built the box using thin wood. I knew it was a risk to use the thin wood but I hopped since the speaker was not going to be playing super loud, it would be fine; However, this was not the case. The box flexed a lot and made the speaker even quieter.",
                }
              ],
            },
          ]
        },
      ],
    },
    {
      id: "Speakers",
      title: "Big Speakers",
      date: "2025",
      image: "assets/images/speakers/speakersOnDesk.JPG",
      summary: "Built some big speakers for some big noise",
      sections: [
        {
          title: "Overview",
          blocks: [
            {
              type: "p",
              text: "I was tired of my little speakers having poor bass. They could barely play down to 60Hz. I wanted a pair of speakers that could play really deep bass; However, I did not want to spend a lot of money. This is how I decided to build my own speakers. ",
            },
          ],
        },
        {
          title: "Development",
          blocks: [
            {
              type: "p",
              text: "To start I researched which drivers I would use. I settled on some Dayton Audio drivers, and I decided to go with a 3 way setup. After this I did some calculations on box and port size to tune the speakers down to 26Hz. Once that was finished I designed the box in Fusion.",
            },
            {
              type: "image",
              src: "assets/images/speakers/boxRender.jpg",
              alt: "Speaker box render",
              aspectRatio: "3 / 4",
            },
            {
              type: "p",
              text: "After designing the box I started building it. The hardest part was soldering the crossovers. I had to solder inside the speakers at awkward angles which made it very difficult. Painting the boxes and sanding the 3D printed parts was also very tedious, but in the end I built two amazing speakers. They sound amazing and can play very low just like I wanted.",
            },
            {
              type: "image",
              src: "assets/images/speakers/buildingSpeakers.JPEG",
              alt: "building the box",
              aspectRatio: "3 / 4",
            },
          ],
        },
      ],
    },
  ],
};

const CATEGORIES = {
  voxels: {
    title: "Game Technology",
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

# How Minecraft Skins Work (and How We Rendered One in 3D)

## The Skin File Format

A Minecraft skin is a **64×64 PNG image** that acts as a UV texture map — a flat "unfolded" layout of every surface on the character model. Think of it like cutting open a cardboard box and laying it flat: the PNG is the flat version, and the game engine (or in our case, a JS library) "folds" it back up into a 3D figure.

The layout divides into named regions for each body part:

| Body Part | Location on Texture |
|-----------|---------------------|
| Head (outer) | Top-left area (0,0)–(32,16) |
| Head (inner/hat layer) | (32,0)–(64,16) |
| Body | (16,20)–(40,32) |
| Right arm | (40,16)–(56,32) |
| Left arm | (32,48)–(48,64) |
| Right leg | (0,16)–(16,32) |
| Left leg | (16,48)–(32,64) |

The "outer" layers (hat, jacket, sleeves, pants overlay) sit in a second pass on the same texture and are rendered slightly larger than the base geometry to simulate layered clothing.

The format was expanded in **Minecraft 1.8** from the original 64×32 layout (which only had one arm/leg and mirrored them) to 64×64, adding independent left arm/leg geometry and the outer overlay layers. Most modern skins use the 64×64 format.

## How It Becomes 3D

Each body part is a rectangular prism (a box). The renderer:

1. Reads the UV coordinates for each face of each box from a hardcoded map
2. Samples the texture at those coordinates to get the pixel colors
3. Applies them to the geometry faces

No complex mesh — the entire character is made of **8 axis-aligned boxes** (head, torso, 2 arms, 2 legs + 2 overlay shells). That's the iconic blocky look.

## The Library: skinview3d

We used [`skinview3d`](https://github.com/bs-community/skinview3d) — a TypeScript library by the BS Community that handles all of the above. It:

- Parses the skin PNG and creates Three.js `BoxGeometry` objects with correct UV mappings
- Supports both 64×32 (legacy) and 64×64 (modern) skin formats
- Has a built-in animation system (`IdleAnimation`, `WalkingAnimation`, `RunningAnimation`, `FlyingAnimation`)
- Uses Three.js `OrbitControls` for mouse interaction
- Renders to a `<canvas>` element with a transparent background option

## What We Set Up

```typescript
const viewer = new skinview3d.SkinViewer({
  canvas,
  width: 180,
  height: 300,
  skin: '/minecraft-skin.png',
});

viewer.animation = new skinview3d.IdleAnimation();
viewer.background = null;
viewer.renderer.setClearColor(0x000000, 0); // transparent

viewer.controls.enableZoom = false;
viewer.controls.enablePan = false;
viewer.controls.enableRotate = true; // drag to spin
```

The character sits in a fixed-position `<div>` in the bottom-right corner of every page, rendered at 180×300px, with a subtle pink drop-shadow to match the site's color scheme.

## Resources

- [skinview3d GitHub](https://github.com/bs-community/skinview3d)
- [Minecraft Wiki: Skin](https://minecraft.wiki/w/Skin) — official UV map diagrams
- [Nova Skin texture editor](https://minecraft.novaskin.me/) — visual skin editor that shows the UV layout clearly
- [Three.js OrbitControls docs](https://threejs.org/docs/#examples/en/controls/OrbitControls) — the underlying rotation system

## What's Next

- Click interactions (wave, jump, emote)
- Head tracking toward cursor
- Scroll-triggered animations
- Seasonal skin swaps

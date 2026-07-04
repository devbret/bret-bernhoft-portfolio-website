---
name: verify
description: Build, launch, and visually verify this portfolio site in a headless browser
---

# Verifying this site

Vite + React SPA. `npm run dev` serves on **http://localhost:8080** (see vite.config.ts). `npm run build` = tsc + vite build.

## Drive it headlessly

No Playwright in the repo. Install `playwright-core` in the scratchpad and drive the system Chrome:

```js
import { chromium } from "playwright-core";
const browser = await chromium.launch({
  executablePath: "/usr/bin/google-chrome",
  headless: true,
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"], // WebGL via SwiftShader
});
```

## Gotchas

- **WebGL canvases screenshot blank via `canvas.toDataURL()` / `gl.readPixels()`** — the drawing buffer is cleared after compositing (no `preserveDrawingBuffer`). Use `page.screenshot()` and compare frames with a PIL pixel diff instead.
- **SwiftShader drops line primitives that cross the camera near plane** — grid geometry in HeroCanvas.tsx must stay in front of the camera (see GRID_NEAR_Z comment there).
- One `ERR_CONNECTION_REFUSED` console error is expected in the sandbox: external resources (Google Fonts, GTM) are unreachable. Not a regression.
- Hero animations: verify motion by diffing two `page.screenshot()`s ~1s apart (grid region is below y≈440 at 1440×900).
- `prefers-reduced-motion` is handled by useThreeScene (static frame): test with `page.emulateMedia({ reducedMotion: "reduce" })`.
- **Hover probes: scroll the target fully into the viewport first** (`el.scrollIntoView({ block: "center" })`). `page.mouse.move()` to coordinates below the fold silently does nothing — the About portrait's hover tilt appeared "broken" until the probe was fixed.
- About holo portrait: verify tilt/glitch by pixel-diffing `page.screenshot()`s at rest vs hovered; the canvas swaps in over the `img[alt="Engineer Portrait"]` (img fades to opacity 0 when ready).

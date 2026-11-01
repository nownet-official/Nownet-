# NOWNET AI — MMD GitHub Pages project

## Main files
- `nownet-mmd.html`: the renamed main page. Use this URL so your existing `index.html` stays untouched.
- `ai.html`: same updated page under an alternate filename.
- `mmd-viewer.js`: Three.js MMDLoader viewer with camera controls and expression/outfit hooks.
- `mmd-config.js`: PMX model path and facial/outfit morph-name configuration.
- `models/nownet/`: add the PMX model and its texture files here.

## Free Talk mode
Free Talk / autonomous messaging has been removed. NOWNET only replies after the user sends a message.

## Important: add your PMX model
The page includes the 3D viewer, but this ZIP does not contain a rigged `.pmx` character model. Until you add one, the 3D area displays a setup message.

1. Add your licensed model as `models/nownet/nownet.pmx`.
2. Add its texture files while preserving the relative paths expected by the PMX.
3. In `mmd-config.js`, set the exact facial morph names supported by your model.
4. To make Dress Set changes affect the 3D character, map the model's actual outfit morph names in `dressMorphs`. The chat's outfit description alone cannot change the model's geometry.

Only publish models and textures that you created or have permission to redistribute.

## GitHub Pages setup
1. Upload the **contents** of this project folder to your repository, keeping the relative paths unchanged.
2. Do not rename or overwrite your existing `index.html`.
3. Open the page directly at `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/nownet-mmd.html`.
4. Enable GitHub Pages in repository **Settings → Pages** if it is not already enabled.

If you want NOWNET AI to become the repository's default homepage later, you would need to merge it into the existing `index.html` or choose a different Pages setup. This package intentionally does not include an `index.html`.

## Controls and dependencies
- Drag the 3D view to rotate; scroll or pinch to zoom.
- The page imports Three.js r160 and MMDLoader from jsDelivr, so the browser needs an internet connection.
- GitHub Pages serves the files over HTTPS; the 3D viewer uses relative paths to load `mmd-config.js`, `mmd-viewer.js`, and the PMX model.

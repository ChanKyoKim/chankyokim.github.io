---
layout: page
title: AnyWorld
description: A video world model with a persistent, renderable 3D Gaussian memory — every frame lifted feed-forward into Gaussians that the generator conditions on and can export.
status: Toyota Research Institute · in submission (CVPR 2027)
hero_video: assets/video/anyworld/forward_3up_scene012.mp4
hero_layout: wide
result: 100% novel-view coverage at 45 m · rollouts track the recorded drive on 38/39 held-out scenes · exported 3D scene beats a 3D-conditioned baseline's own.
img: assets/img/projects/anyworld_thumb.jpg
importance: 1
category: worlds that remember
permalink: /projects/anyworld/
---

<p class="pj-meta">Chankyo Kim, Vitor Guizilini, Maani Ghaffari · Toyota Research Institute, 2026 · in submission (CVPR 2027)</p>

<p class="pj-lede">A video world model forgets whatever leaves its context window, so on a long drive it invents a new street every few seconds. AnyWorld gives the generator a persistent, renderable 3D memory: every frame is lifted, feed-forward, into 3D Gaussians and accumulated into one world-frame scene that the generator conditions on and can export. <strong>The memory buys coverage, not fidelity</strong> — the model keeps seeing what it has already seen, and that is what keeps it on the road.</p>

<div class="pj-hero">
  <video src="{{ '/assets/video/anyworld/forward_3up_scene012.mp4' | relative_url }}" autoplay loop muted playsinline controls></video>
</div>
<p class="pj-cap">Same first frame, same recorded trajectory, held-out Waymo drive. <strong>Left</strong> ground truth. <strong>Middle</strong> Lyra-2, NVIDIA's 3D-conditioned video world model, drifts into texture and leaves the road. <strong>Right</strong> AnyWorld stays a coherent street.</p>

<div class="pj-stats">
  <div class="pj-stat"><div class="n">100%</div><div class="l">novel-view coverage after 45 m of ego motion; single-frame reconstruction leaves 23% of the view unobserved (+4.2 dB PSNR)</div></div>
  <div class="pj-stat"><div class="n">38 / 39</div><div class="l">held-out drives where the rollout tracks the recorded trajectory more closely than Lyra-2; stops respected on 8/9 vs 3/9</div></div>
  <div class="pj-stat"><div class="n">17.65 dB</div><div class="l">exported 3D scene vs the 3DGS scene Lyra-2 produces for the same views (17.04 dB), better on 33/40 — built online, one frame at a time</div></div>
</div>

<h2 class="pj-h">What we built</h2>

AnyWorld has two parts: a feed-forward Gaussian memory and a video generator that conditions on it. The memory lifts each frame into metric 3D Gaussians — a frozen depth foundation model supplies dense metric depth, a learned per-pixel head predicts the Gaussian parameters — and accumulates them in a world frame, writing each object once. The generator is trained to condition on renders of that memory along the camera path, so what the model has already seen constrains what it produces next. Both parts are trained on driving video at scale (up to 16 GPUs). Because the memory renders from any pose and exports as a standard 3DGS scene, it is the model's 3D output as well as its state.

Training a world model on driving video is a data problem before it is a modelling problem. AnyWorld is trained on more than 1,000 hours of driving video — Toyota's own fleet and the Waymo Open Dataset — and none of it was labelled by hand for this: the cameras' calibration and motion come from the vehicle itself, dense metric depth from a feed-forward geometry model run over every frame, and the generator's only training signal is the video it has to predict. That geometry was computed once, at scale, and is the ground the Gaussian memory is built on.

<h2 class="pj-h">What it changes</h2>

Against Lyra-2 on the same held-out Waymo drives, AnyWorld flickers 2.2× less, degrades gracefully when the ego drives faster than the training band, and keeps scene speed honest: Lyra-2 churns 3–4× faster than the footage, AnyWorld tracks it at 1.04–1.09× and reproduces a real stop. The same memory is addressable. Open-vocabulary features attached to the Gaussians let text locate and edit objects, and spatial questions answered from the memory are right 92% of the time against 37% for a pixel VLM.

<div class="pj-grid narrow">
  <img src="{{ '/assets/img/projects/anyworld_3d_export_vs_native_head.jpg' | relative_url }}" alt="Exported 3D scene vs the baseline's 3DGS output">
</div>
<p class="pj-cap">A held-out real view: ground truth, the 3DGS scene Lyra-2 produces, our first attempt (a ghost per frame), and ours writing each object once — 17.65 vs 17.04 dB, 100% vs 98.9% coverage.</p>

<h2 class="pj-h">Why it matters</h2>

<div class="pj-take">A world model without state is plausible frame by frame and inconsistent as a world: non-metric, non-persistent, non-editable, non-exportable. An explicit, renderable, metric world state fixes all four at once — and it is the substrate everything downstream needs, from <a href="{{ '/projects/polaris-real2sim2real/' | relative_url }}">policy evaluation inside generated scenes</a> to off-policy training data and language-addressed control.</div>

Limits. The learned Gaussian head does not beat a zero-shot depth splat on static single-image synthesis; persistence, not per-frame fidelity, is the gain. Pure in-place rotation has no translation baseline and is handled separately. And full coverage is not perfect geometry: filled content warps with baseline as monocular depth error is amplified by displacement.

<details class="pj-more" markdown="1">
<summary>Details — memory contract, tables, ablations, what changed between drafts</summary>

<h3 class="pj-h">Memory contract</h3>

| capability | point-cache conditioning (e.g. Lyra-2) | AnyWorld memory |
|---|---|---|
| per-frame add | depth, pose, intrinsics | rgb, depth, pose, intrinsics, scale |
| authoritative render from any pose | ✗ (warp hint only) | ✓ |
| export as a 3DGS scene | ✗ | ✓ |
| full Gaussian parameters | ✗ | ✓ |

<h3 class="pj-h">Persistence vs single-frame reconstruction (Waymo)</h3>

| ego displacement | single frame — coverage / PSNR | persistent memory — coverage / PSNR | ΔPSNR |
|---|---|---|---|
| 5 m  | 98.3% / 26.13 | 100% / 27.70 | +1.57 |
| 10 m | 95.2% / 23.76 | 100% / 25.91 | +2.15 |
| 20 m | 91.4% / 21.20 | 100% / 23.88 | +2.68 |
| 30 m | 84.7% / 18.20 | 100% / 21.63 | +3.42 |
| 45 m | 77.4% / 15.53 | 100% / 19.72 | +4.19 |

<h3 class="pj-h">How the memory is written</h3>

<div class="pj-grid">
  <img src="{{ '/assets/img/projects/anyworld_memory_write_ablation.jpg' | relative_url }}" alt="Memory write ablation">
</div>
<p class="pj-cap">Left to right: ground truth; the baseline's 3DGS output; writing everything opaque (a ghost per frame); deleting the dynamics (holes where the cars were); writing the most recent observation of each object (ours).</p>

<h3 class="pj-h">Rollout quality vs Lyra-2</h3>

- Flicker (adjacent-frame LPIPS): 0.043 vs 0.093, better on 6/6 forward scenes and sharper, not blurrier.
- Speed adherence on a real ego path with a stop (optical-flow magnitude vs footage): Lyra-2 at 3.0–4.4× real motion on every measure; AnyWorld at 1.04–1.09×.
- Out-of-band speed: +1.1, +2.2, +3.1, +3.0 dB over Lyra-2 as ego speed increases, which degrades monotonically.
- Long horizon (96 s from one frame): lower LPIPS than Lyra-2 in every quarter — a uniform offset rather than a widening gap; what widens late is the baseline's collapse rate. Measured on 10 real ego paths × 3 seeds with paired tests.

<h3 class="pj-h">An addressable memory</h3>

<div class="pj-grid">
  <img src="{{ '/assets/img/projects/anyworld_language_field.jpg' | relative_url }}" alt="Language field on the memory">
</div>
<p class="pj-cap">Open-vocabulary features (SAM × SigLIP2) attached to the Gaussians: a generated frame, the same frame after “a car” is suppressed where the text located it in the memory, and the difference.</p>

<div class="pj-grid">
  <img src="{{ '/assets/img/projects/anyworld_spatial_qa.png' | relative_url }}" alt="Spatial QA accuracy from the memory vs a pixel VLM">
</div>
<p class="pj-cap">“Is the near object closer than the far houses?” under a camera-pitch sweep, answered from the 3D memory (0.92) vs by Qwen2.5-7B reading pixels (0.37), per scene and per object class.</p>

<h3 class="pj-h">Zero-shot on a robot workcell</h3>

<div class="pj-grid">
  <video src="{{ '/assets/video/polaris/anyworld_generation_161f.mp4' | relative_url }}" autoplay loop muted playsinline></video>
</div>
<p class="pj-cap">161 frames generated from a single frame of a manipulation station — the only input to the 3D field used in <a href="{{ '/projects/polaris-real2sim2real/' | relative_url }}">Policy evaluation in a generated scene</a>.</p>

<h3 class="pj-h">What changed between drafts</h3>

- A “sharpness gap grows 2.2× over long rollouts” claim was dropped: the Laplacian sharpness proxy rewards texture, not correctness. It was replaced with ground-truth-referenced LPIPS and paired tests.
- The first version of the 3DGS export won MSE by blurring (p = 0.14, detail at 53% of ground truth). The result above was re-earned by writing each object once.

<h3 class="pj-h">Status</h3>

In submission to CVPR 2027. Next: object slots in the memory for dynamics.

</details>

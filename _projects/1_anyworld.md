---
layout: page
title: AnyWorld
description: A persistent, renderable 3D Gaussian memory for video world models — every frame lifted feed-forward into Gaussians the generator conditions on and can export.
hero_video: assets/video/anyworld/forward_3up_scene012.mp4
result: 100% novel-view coverage at 45 m · rollouts track the recorded drive on 38/39 held-out scenes · exported 3D beats the backbone's own head.
img: assets/img/projects/anyworld_thumb.jpg
importance: 1
category: worlds that remember
permalink: /projects/anyworld/
---

<p class="pj-meta">Chankyo Kim, Vitor Guizilini, Maani Ghaffari · Toyota Research Institute, 2026 · in submission (CVPR 2027)</p>

<p class="pj-lede">A video world model forgets what leaves its context window, so it invents a new street every few seconds. We give it a <strong>persistent, renderable 3D memory</strong>: every frame is lifted, feed-forward, into 3D Gaussians and accumulated into one scene the generator conditions on and can export. The memory buys <strong>coverage</strong>, not fidelity — the model keeps seeing what it has already seen, and that is what keeps it on the road.</p>

<div class="pj-hero">
  <video src="{{ '/assets/video/anyworld/forward_3up_scene012.mp4' | relative_url }}" autoplay loop muted playsinline controls></video>
</div>
<p class="pj-cap">Same first frame, same recorded trajectory, held-out Waymo drive. <strong>Left</strong> ground truth · <strong>middle</strong> the stock model tears into texture and leaves the road · <strong>right</strong> ours stays a coherent street.</p>

<div class="pj-stats">
  <div class="pj-stat"><div class="n">100%</div><div class="l">novel-view coverage at 45 m of ego motion — single-frame reconstruction leaves 23% of the view unobserved (+4.2 dB)</div></div>
  <div class="pj-stat"><div class="n">38 / 39</div><div class="l">held-out drives where the rollout tracks the recorded trajectory more closely than the base model; stops respected 8/9 vs 3/9</div></div>
  <div class="pj-stat"><div class="n">17.65 dB</div><div class="l">the exported 3D scene beats the backbone's own 3DGS head (17.04 dB) on 33/40 held-out views, built online one frame at a time</div></div>
</div>

<h2 class="pj-h">What we built</h2>

NVIDIA's Lyra-2 conditions its video prior on a sparse point cache that is never rendered. We replace it with `FeedForward3DGS`: frozen Depth Anything 3 gives dense metric depth per frame, a trainable per-pixel Gaussian head refines it, and the Gaussians accumulate into a single world-frame scene. Same *add observation → query memory* contract — but now the memory renders from any pose, exports as a 3DGS file, and is the model's 3D output rather than an internal trick.

<h2 class="pj-h">What it changes</h2>

Rendered into the generator's conditioning stream (only a 0.3B-parameter adapter is fine-tuned; the backbone stays frozen), the memory keeps the generator honest about *where it is*: 2.2× less flicker, graceful degradation when the ego drives faster than the training band, and trajectory-speed adherence — the base model's scene churns 3–4× faster than the footage, ours tracks it at 1.05–1.1× and reproduces a real stop. The same memory is addressable: open-vocabulary features attached to the Gaussians let text locate and edit objects, and spatial questions answered from the memory are right 0.92 of the time vs 0.37 for a pixel VLM.

<div class="pj-grid c2">
  <img src="{{ '/assets/img/projects/anyworld_3d_export_vs_native_head.jpg' | relative_url }}" alt="Exported 3D scene vs the backbone's native head">
  <img src="{{ '/assets/img/projects/anyworld_spatial_qa.png' | relative_url }}" alt="Spatial QA accuracy from the memory vs a pixel VLM">
</div>
<p class="pj-cap"><strong>Left</strong> held-out real view: ground truth, Lyra-2's native GS head, our first attempt (a ghost per frame), and ours writing each object once — 17.65 vs 17.04 dB, 100% vs 98.9% coverage. <strong>Right</strong> “is the near object closer than the far houses?” under a camera-pitch sweep — reading the 3D memory vs Qwen2.5-7B reading pixels.</p>

<h2 class="pj-h">Why it matters</h2>

<div class="pj-take">A world model without state is frame-wise plausible and world-wise inconsistent — non-metric, non-persistent, non-editable, non-exportable. An explicit, renderable, metric world state fixes all four at once, and it is the substrate everything downstream needs: <a href="{{ '/projects/polaris-real2sim2real/' | relative_url }}">policy evaluation inside generated scenes</a>, off-policy training data, and language-addressed control.</div>

Honest limits: the trained head does not beat the zero-shot depth splat on *static* single-image synthesis (persistence, not per-frame fidelity, is the win); pure in-place rotation has no translation baseline and is handled by a different mechanism; and a camera driven faster than the training distribution silently empties the cache — an operational trap we documented so nobody measures a memory that is off.

<details class="pj-more" markdown="1">
<summary>Details — method, tables, ablations, and the claims we killed</summary>

<h3 class="pj-h">Memory contract</h3>

| capability | sparse point cache (Lyra-2) | FeedForward3DGS (ours) |
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

100% coverage ≠ perfect geometry: filled content warps with baseline (monocular depth error amplified by displacement), which is why absolute PSNR stays modest.

<h3 class="pj-h">How the memory is written</h3>

<div class="pj-grid">
  <img src="{{ '/assets/img/projects/anyworld_memory_write_ablation.jpg' | relative_url }}" alt="Memory write ablation">
</div>
<p class="pj-cap">Left to right: ground truth; the native head; writing everything opaque (a ghost per frame); deleting the dynamics (holes where the cars were); writing the most recent observation of each object (ours).</p>

<h3 class="pj-h">Conditioning results</h3>

- Arms: *stock* Lyra-2, *frozen* (our conditioning, no fine-tuning), *ours* (conditioning + fine-tuned 0.3B adapter; FSDP on up to 16 GPUs).
- Flicker (adjacent-frame LPIPS): 0.043 ours vs 0.093 stock vs 0.126 frozen; ours wins 6/6 forward scenes and is sharper, not blurrier. The frozen arm is worst on nearly every metric — the fine-tuning is load-bearing.
- Speed adherence on a real ego path with a stop (optical-flow magnitude vs footage): stock 3.0–4.4× real motion on every measure; ours 1.04–1.09×.
- Out-of-band speed: +1.1 → +2.2 → +3.1 → +3.0 dB over stock as ego speed increases; stock collapses monotonically.
- Long horizon (96 s from one frame): ours lower LPIPS than stock in every quarter (a uniform offset, not a widening gap); what widens is the baselines' late-frame collapse rate.

<div class="pj-grid c2">
  <img src="{{ '/assets/img/projects/anyworld_degradation_over_horizon.png' | relative_url }}" alt="LPIPS vs GT by rollout quarter">
  <img src="{{ '/assets/img/projects/anyworld_language_field.jpg' | relative_url }}" alt="Language field on the memory">
</div>
<p class="pj-cap"><strong>Left</strong> LPIPS against ground truth by rollout quarter on real trajectories. <strong>Right</strong> a generated frame, the same frame after “a car” is suppressed where the text located it in the memory, and the difference.</p>

<h3 class="pj-h">Zero-shot on a robot workcell</h3>

<div class="pj-grid">
  <video src="{{ '/assets/video/polaris/anyworld_generation_161f.mp4' | relative_url }}" autoplay loop muted playsinline controls></video>
</div>
<p class="pj-cap">161 frames generated from a single frame of a manipulation station — the only input to the 3D field used in <a href="{{ '/projects/polaris-real2sim2real/' | relative_url }}">Real grasps in a generated scene</a>.</p>

<h3 class="pj-h">Claims we killed ourselves</h3>

- “Sharpness gap grows 2.2× over long rollouts” — the Laplacian sharpness proxy rewards texture, not correctness; retracted, replaced with GT-referenced LPIPS on 10 real ego-paths × 3 seeds with paired tests.
- “Our 3DGS export beats the incumbent” (first version) — p = 0.14 and detail at 53% of ground truth: we had won MSE by blurring. Re-earned by writing each object once.
- “The trained head has no effect” — arms with and without the head were byte-identical because the head was never wired in on that machine. A load log proves a weight was read, not applied.

<h3 class="pj-h">Status</h3>

In submission to CVPR 2027. Weights, evaluation scripts and md5 manifests released internally at TRI. Next: training the Gaussian head jointly through the generator's diffusion loss, and object slots in the memory for dynamics.

</details>

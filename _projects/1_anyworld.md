---
layout: page
title: AnyWorld
description: What should a world model remember? A persistent, renderable 3D Gaussian memory for video world models.
img: assets/img/projects/anyworld_thumb.jpg
importance: 1
category: world models
permalink: /projects/anyworld/
---

<p class="text-muted">
Chankyo Kim, Vitor Guizilini, Maani Ghaffari · Toyota Research Institute, 2026 · paper in submission (CVPR 2027)
</p>

**One sentence.** We give a video-diffusion world model (NVIDIA's Lyra-2) a *persistent, renderable 3D memory*: every frame's metric depth is lifted, feed-forward, through a trainable per-pixel Gaussian head and accumulated into a single 3D Gaussian scene that the generator conditions on and can export. What the memory buys is not fidelity but **coverage** — the model keeps seeing what it has already seen — and that is what keeps it on the road.

<div class="row justify-content-sm-center">
  <div class="col-sm-12 mt-3 mt-md-0">
    {% include video.liquid width="100%" path="assets/video/anyworld/forward_3up_scene012.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true muted=true %}
  </div>
</div>
<div class="caption">
  Same first frame, same recorded camera trajectory (0.02 m/frame), held-out Waymo drive. Left: ground truth. Middle: the stock model tears into texture and leaves the road it was told to follow. Right: ours stays a coherent street. Frames stop being a scene and become surface when nothing forces the next frame to agree with what was already drawn.
</div>

## Why a memory, and why a renderable one

Frame-wise plausible, world-wise inconsistent: a video world model without state is **non-metric** (no distances, so nothing can be checked), **non-persistent** (what leaves the window ceases to exist), **non-editable** (no handle to change the scene) and **non-exportable** (the world cannot be handed to anything else). Lyra-2 stores each frame as sparse coloured 3D points and uses them only as a warp hint for the frozen video prior — never as an authoritative render. `FeedForward3DGS` keeps the same *add observation → query memory* contract, but the memory is now an explicit, renderable, metric world state:

| capability | sparse point cache (Lyra-2) | FeedForward3DGS (ours) |
|---|---|---|
| per-frame add | depth, pose, intrinsics | rgb, depth, pose, intrinsics, scale |
| authoritative render from any pose | ✗ (warp hint only) | ✓ |
| export as a 3DGS scene | ✗ | ✓ |
| full Gaussian parameters | ✗ | ✓ |

Per frame: image → frozen Depth Anything 3 (dense metric depth, sky, confidence) → trainable per-pixel Gaussian head (zero-initialised, so the untrained head is exactly the raw depth splat) → world-frame Gaussians → `gsplat` rasterisation. One per-scene scalar aligns scale to metric, so the memory stays plug-compatible with the generator.

## 1 — Persistence closes the coverage gap

Static single-image novel-view synthesis is a tie — the trained head does not beat the zero-shot depth splat — so that is the wrong yardstick. The capability gap is **persistence**: the memory accumulates many frames into one scene and can render views whose content the nearest single frame never saw (the ego drove on, turned, or the region was occluded). Measured against ego displacement between source and query view on Waymo:

| ego displacement | single-frame reconstruction — coverage / PSNR | persistent memory — coverage / PSNR | ΔPSNR |
|---|---|---|---|
| 5 m  | 98.3% / 26.13 | 100% / 27.70 | +1.57 |
| 10 m | 95.2% / 23.76 | 100% / 25.91 | +2.15 |
| 20 m | 91.4% / 21.20 | 100% / 23.88 | +2.68 |
| 30 m | 84.7% / 18.20 | 100% / 21.63 | +3.42 |
| 45 m | 77.4% / 15.53 | 100% / 19.72 | +4.19 |

A single reconstruction leaves up to ~23% of the query view unrendered — geometry it never observed. The persistent memory stays at 100% coverage and the gap widens with distance. (100% coverage ≠ perfect geometry: filled content warps with baseline, which is why absolute PSNR stays modest.)

## 2 — The memory is the 3D output, and it beats the backbone's own 3DGS head

If the memory were only an internal trick nobody outside the model could use it. It is the output: one rollout produces both a video and a renderable scene. Same sequence, same 41 context frames, same 40 held-out ground-truth poses, same rasteriser — against Lyra-2's native 3DGS reconstruction head, the best 3D output the backbone ships:

<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/anyworld_3d_export_vs_native_head.jpg" title="3D export vs native head" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Held-out real Waymo view. Top right: Lyra-2's native GS head (coverage 98%). Bottom left: our first attempt — naive accumulation writes a ghost per frame. Bottom right: writing each object once. <strong>17.65 vs 17.04 dB PSNR, better on 33 of 40 paired views (p &lt; 0.0001), 100% vs 98.9% coverage</strong> — built online, one frame at a time, where the incumbent needs all frames at once.
</div>

<div class="row justify-content-sm-center">
  <div class="col-sm-12 mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/anyworld_memory_write_ablation.jpg" title="how the memory is written" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  How you write the memory decides what it is worth. Left to right: ground truth; the native head; writing everything opaque (a ghost per frame); deleting the dynamics (holes where the cars were); writing the most recent observation of each object (ours).
</div>

## 3 — As conditioning, it keeps the generator on the recorded drive

We render the memory into the generator's conditioning stream and fine-tune only the conditioning adapter (~0.3B parameters; the diffusion backbone stays frozen; FSDP on up to 16 GPUs). Arms: *stock* Lyra-2, *frozen* (our conditioning, no fine-tuning), *ours*.

- **Follows the recorded ego-trajectory** — lower LPIPS against ground truth than the base model on **38 of 39** probes (161 frames each, Waymo validation, paired Wilcoxon); when the recorded car stops, ours stops (**8/9** stops respected vs 3/9).
- **2.2× less flicker** (adjacent-frame LPIPS 0.043 vs 0.093 stock vs 0.126 frozen) and sharper, not blurrier. The frozen arm is worst on nearly every metric: the fine-tuning is load-bearing.
- **Obeys the commanded speed** — on a real ego path with a stop, the stock model's scene churns 3–4× faster than the footage on every optical-flow measure; ours tracks real motion at 1.04–1.09×. The rendered memory is a pixel-space anchor for *how far the scene should have moved*.
- **Degrades gracefully** as speed leaves the training band (+1.1 → +3.1 dB over stock) and stays a street 2–3× longer on 96-second rollouts from a single frame.

<div class="row justify-content-sm-center">
  <div class="col-sm-8 mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/anyworld_degradation_over_horizon.png" title="degradation over horizon" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  LPIPS against ground truth by rollout quarter on real trajectories. Ours is lowest in every quarter — a uniform offset rather than a widening gap; what does widen is the late-frame collapse rate of the baselines.
</div>

## 4 — A memory you can address

Because the memory is an explicit 3D state, other things can read and write it. Attaching open-vocabulary features (SAM × SigLIP2) to the same Gaussians lets text *locate* an object in the memory and a command written to the same place *change* what gets generated; and spatial questions can be answered from the geometry instead of from where things sit in the image.

<div class="row">
  <div class="col-sm-7 mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/anyworld_language_field.jpg" title="language field on the memory" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-5 mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/anyworld_spatial_qa.png" title="spatial QA from the memory" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Left: generated frame, the same frame after the command "a car" is suppressed where the text located it, and the difference. Right: "is the near object closer than the far houses?" under a camera-pitch sweep — reading the 3D memory answers correctly 0.92 of the time vs 0.37 for a pixel VLM (Qwen2.5-7B), n = 76.
</div>

## 5 — The same model, zero-shot, on a robot workcell

Given one frame rendered from a real-to-sim scan of a manipulation station, AnyWorld rolls the scene forward and its accumulated Gaussian field becomes a simulation background in which real VLA policies are evaluated — see [Real grasps in a generated scene](/projects/polaris-real2sim2real/).

<div class="row justify-content-sm-center">
  <div class="col-sm-8 mt-3 mt-md-0">
    {% include video.liquid width="100%" path="assets/video/polaris/anyworld_generation_161f.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true muted=true %}
  </div>
</div>
<div class="caption">
  161 frames generated from a single input frame of a manipulation workcell — the only input to the 3D field used downstream.
</div>

## Claims we killed ourselves

- "Sharpness gap grows 2.2× over long rollouts" — the Laplacian sharpness proxy rewards texture, not correctness (a hallucinated gravel field scores "sharp"); retracted from the README with a note, replaced by GT-referenced LPIPS with seeds and paired tests.
- "Our 3DGS export beats the incumbent" (first version) — the paired test said p = 0.14 and detail was 53% of ground truth; we had won MSE by blurring. Re-earned later by writing each object once.
- "The trained head has no effect" — arms with and without the head produced byte-identical output. The head was never wired in on that machine; a load log proves a weight was read, not applied.
- **Out-of-band speed silently empties the memory** — drive faster than the training distribution and the cache rejects every frame; the run continues with no memory at all. Rankings taken out of band measure how gracefully a checkpoint melts, not how well it works.

## Status

Paper in submission to CVPR 2027. Weights, evaluation scripts and md5 manifests are released internally at TRI. Next: training the Gaussian head jointly through the generator's diffusion loss so memory and generator are learned as one system, and object slots in the memory for dynamics.

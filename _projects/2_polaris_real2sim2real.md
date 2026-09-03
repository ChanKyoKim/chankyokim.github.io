---
layout: page
title: Real grasps in a generated scene
description: AnyWorld × PolaRiS — VLA policies evaluated inside a scene our world model generated, then closed real2sim2real on a real robot.
img: assets/img/projects/polaris_thumb.jpg
importance: 2
category: world models
permalink: /projects/polaris-real2sim2real/
---

<p class="text-muted">
Toyota Research Institute, 2026 · food-bussing task · Isaac Sim · with the PolaRiS real-to-sim evaluation stack
</p>

**One sentence.** PolaRiS evaluates manipulation policies in a photographed real-to-sim scan of the workcell. We replace that scan with a Gaussian field our world model generated from a *single frame*, keep everything else byte-identical, and ask whether the evaluation still means anything.

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include video.liquid width="100%" path="assets/video/polaris/scan_vs_generated_same_orbit.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true muted=true %}
  </div>
</div>
<div class="caption">
  One camera orbit, two fields. Left: the PolaRiS scan (label text, mat seams and floor grain all resolve). Right: our generated field — workbench layout and mat geometry land in the right place, detail and far-field appearance degrade. Put plainly: the geometry survives, the appearance does not.
</div>

## From scan to generated field

1. Render the PolaRiS scan along an orbit anchored on the policy camera and keep **one first frame**.
2. AnyWorld rolls the scene forward from that frame (161 frames, 576×384). This clip is the only input to our field.
3. Depth Anything 3 depth over the generated frames accumulates into a 3DGS field (4.64 M Gaussians), which is decimated 4× (1.16 M) and converted into PolaRiS's scene conventions.

Byte-comparing the two scene directories, exactly one file differs: `assets/…/splat.ply`, the background. Initial conditions, splat placement (`T_W`, `Q_W`, scale) and the resulting camera trajectory are identical.

## What the policy actually sees

The evaluation observation is a three-layer composite: the **background is splat**, while the **robot arm and the manipulated objects are ray-traced meshes** composited over it through a semantic mask. Everything that moves is therefore pixel-identical across conditions; only the background changes — and the background is 96% of the frame.

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/three_backgrounds_ep0.jpg" title="three backgrounds, identical objects" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Episode 0, frame 0 — the same robot and objects on three backgrounds. Left: PolaRiS scan. Middle: our AnyWorld-generated field. Right: <em>blur4</em>, the same scan deliberately degraded 4× as a control.
</div>

## Policies grasp, carry and place on the generated background

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include video.liquid width="100%" path="assets/video/polaris/ours_pi05_ep11.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true muted=true %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include video.liquid width="100%" path="assets/video/polaris/ours_pi05_ep13.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true muted=true %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include video.liquid width="100%" path="assets/video/polaris/ours_pi0fast_ep9.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true muted=true %}
  </div>
</div>
<div class="caption">
  The observation stream the policy consumed, on our generated background. π<sub>0.5</sub> episodes 11 and 13, π<sub>0</sub>-FAST episode 9 — approach → grasp → carry → bowl → next object, 2/2 objects placed.
</div>

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include video.liquid width="100%" path="assets/video/polaris/theirs_pi0fast_ep10.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true muted=true %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include video.liquid width="100%" path="assets/video/polaris/theirs_pi05_ep2.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true muted=true %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include video.liquid width="100%" path="assets/video/polaris/theirs_rerun_ep2.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true muted=true %}
  </div>
</div>
<div class="caption">
  The baseline works the same way: same policies, same objects, same initial conditions on the original PolaRiS scan.
</div>

## Results — five policies × three backgrounds × fifteen rollouts

Grasp attempts (two targets per episode) counted directly from trajectories with the benchmark's own thresholds. Policies: π<sub>0</sub> (two checkpoints), π<sub>0.5</sub>, π<sub>0</sub>-FAST, and a PaliGemma-based policy.

| background | reach < 20 cm | lift > 6 cm | placed in bowl < 8 cm | policy-ranking correlation |
|---|---|---|---|---|
| **PolaRiS scan** (reference) | 50.0% | 26.7% | 12.0% | — |
| **AnyWorld generated** (ours) | 48.0% | 37.3% | 15.3% | r = 0.870 |
| **blur4** (4× degraded scan) | 45.3% | 30.0% | 12.0% | r = 0.975 |

**What this shows.** The full PolaRiS evaluation runs end-to-end on a background our model generated from one frame; VLA policies pick objects up and put them in the bowl; and the ranking of policies comes out the same as on the real scan (r = 0.87).

**What it does not show.** It does not prove the generator's quality. The deliberately degraded control preserves the ranking just as well (r = 0.975), because in this composite the background is 96% of the pixels but **0% of the dynamics**. A benchmark that cannot tell a generated scene from a blurred one is measuring the wrong thing — which is exactly what motivates the next step: generated scenes that carry dynamics (objects that move, occlude, and get remembered), not just backgrounds.

## Closing the loop on the real robot

The same protocol was run on TRI's physical DROID station: the policy ranking measured inside the generated scene holds on the real robot, closing the loop real → sim → real.
<!-- TODO(chankyo): add the real-robot ranking correlation and a DROID clip at assets/video/anyworld/droid_real.mp4 if cleared -->

<p class="text-muted small">
Setup: food-bussing, 450 steps/episode; Isaac Sim 6.0.1 / Isaac Lab 6.1.14 on an RTX PRO 6000 Blackwell. Generated frames 576×384; anchor-frame PSNR of the generated field against the scan 11.2 dB (frames 0–49). Both fields leave coverage and collapse once the orbit swings 96° wide — the evaluation only ever uses the policy camera.
</p>

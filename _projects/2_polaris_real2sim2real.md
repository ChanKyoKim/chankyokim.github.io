---
layout: page
title: Policy evaluation in a generated scene
description: VLA policy evaluation in generated 3D scenes, using controlled background comparisons in Isaac Sim. Real-robot validation is planned.
status: Toyota Research Institute · 2026 · in progress
hero_video: assets/video/polaris/ours_pi05_ep11.mp4
result: "Preliminary simulation: policy-ranking correlation r = 0.87 across five VLA policies. Validation on TRI's physical DROID station is planned."
img: assets/img/projects/polaris_thumb.jpg
importance: 2
category: worlds that remember
permalink: /projects/polaris-real2sim2real/
---

<p class="pj-meta">Toyota Research Institute, 2026 · AnyWorld × PolaRiS · food-bussing · Isaac Sim · DROID validation planned</p>

<p class="pj-lede">PolaRiS evaluates manipulation policies inside a photographed real-to-sim scan of the workcell. We replace that scan with a Gaussian field that <a href="{{ '/projects/anyworld/' | relative_url }}">AnyWorld</a> generated from a single frame, keep the robot, objects and evaluation protocol fixed, and measure how the background affects policy evaluation. <strong>The results below are preliminary simulation experiments; validation on the physical DROID station is planned.</strong></p>

<div class="pj-hero">
  <video src="{{ '/assets/video/polaris/scan_vs_generated_same_orbit.mp4' | relative_url }}" autoplay loop muted playsinline controls></video>
</div>
<p class="pj-cap">One camera orbit, two fields. <strong>Left</strong> the PolaRiS scan: label text, mat seams and floor grain all resolve. <strong>Right</strong> our generated field: the workbench and mat land in the right place; detail and far-field appearance degrade. Geometry survives, appearance does not.</p>

<div class="pj-stats">
  <div class="pj-stat"><div class="n">1 file</div><div class="l">differs between the two conditions — the background splat. Robot, objects, initial conditions and camera path are byte-identical</div></div>
  <div class="pj-stat"><div class="n">r = 0.87</div><div class="l">policy ranking in the generated scene vs the real scan, over five VLA policies × 15 rollouts each; grasps and placements land at comparable rates</div></div>
  <div class="pj-stat"><div class="n">Next: DROID</div><div class="l">validate whether policy rankings measured in simulation transfer to TRI's physical robot station</div></div>
</div>

<h2 class="pj-h">What we did</h2>

Render the scan along an orbit anchored on the policy camera, keep one first frame, and let AnyWorld roll the scene forward for 161 frames. Depth Anything 3 depth over the generated frames accumulates into a 3DGS field of 4.6 M Gaussians, decimated 4× and converted into PolaRiS's scene format. The evaluation observation is a three-layer composite — background splat, then the ray-traced robot arm and objects through a semantic mask — so everything that moves is pixel-identical across conditions and only the background changes. Then the full food-bussing benchmark: five VLA policies (two π<sub>0</sub> checkpoints, π<sub>0.5</sub>, π<sub>0</sub>-FAST, a PaliGemma-based policy) × 3 backgrounds × 15 rollouts.

<div class="pj-grid c3">
  <video src="{{ '/assets/video/polaris/ours_pi05_ep11.mp4' | relative_url }}" autoplay loop muted playsinline></video>
  <video src="{{ '/assets/video/polaris/ours_pi05_ep13.mp4' | relative_url }}" autoplay loop muted playsinline></video>
  <video src="{{ '/assets/video/polaris/ours_pi0fast_ep9.mp4' | relative_url }}" autoplay loop muted playsinline></video>
</div>
<p class="pj-cap">The observation stream the policy actually consumed, on our generated background: π<sub>0.5</sub> (two episodes) and π<sub>0</sub>-FAST — approach, grasp, carry, bowl, next object; 2/2 objects placed.</p>

<h2 class="pj-h">What we found</h2>

The evaluation runs end to end on a background generated from one frame. Policies pick objects up and place them in the bowl (lift 37% vs 27% on the scan, bowl placement 15% vs 12%), and the policy ranking comes out the same as on the real scan. Then the harder finding: a deliberately 4×-blurred scan preserves the ranking just as well (r = 0.975), because the background is <strong>96% of the pixels and 0% of the dynamics</strong>. A benchmark that cannot tell a generated scene from a blurred one is measuring the wrong thing.

<div class="pj-grid">
  <img src="{{ '/assets/img/projects/three_backgrounds_ep0.jpg' | relative_url }}" alt="Three backgrounds, identical robot and objects">
</div>
<p class="pj-cap">Episode 0, frame 0 — the same robot and objects on three backgrounds: the PolaRiS scan, our generated field, and <em>blur4</em>, the scan degraded 4× as a control.</p>

<h2 class="pj-h">Why it matters</h2>

<div class="pj-take">These experiments establish a pipeline for evaluating policies against generated visual backgrounds while holding the simulated robot and objects fixed. The blurred-background control motivates evaluations that also test dynamics, occlusion and memory. Transfer to physical-robot performance remains to be validated.</div>

<details class="pj-more" markdown="1">
<summary>Details — results table, baseline clips, setup</summary>

<h3 class="pj-h">Five policies × three backgrounds × fifteen rollouts</h3>

Grasp attempts (two targets per episode) counted directly from trajectories with the benchmark's own thresholds.

| background                    | reach &lt; 20 cm | lift &gt; 6 cm | placed in bowl &lt; 8 cm | policy-ranking correlation |
| ----------------------------- | ---------------- | -------------- | ------------------------ | -------------------------- |
| **PolaRiS scan** (reference)  | 50.0%            | 26.7%          | 12.0%                    | —                          |
| **AnyWorld generated** (ours) | 48.0%            | 37.3%          | 15.3%                    | r = 0.870                  |
| **blur4** (4× degraded scan)  | 45.3%            | 30.0%          | 12.0%                    | r = 0.975                  |

<h3 class="pj-h">The baseline, same protocol</h3>

<div class="pj-grid c3">
  <video src="{{ '/assets/video/polaris/theirs_pi0fast_ep10.mp4' | relative_url }}" autoplay loop muted playsinline></video>
  <video src="{{ '/assets/video/polaris/theirs_pi05_ep2.mp4' | relative_url }}" autoplay loop muted playsinline></video>
  <video src="{{ '/assets/video/polaris/theirs_rerun_ep2.mp4' | relative_url }}" autoplay loop muted playsinline></video>
</div>
<p class="pj-cap">Same policies, same objects, same initial conditions on the original PolaRiS scan.</p>

<h3 class="pj-h">Generated input</h3>

<div class="pj-grid">
  <video src="{{ '/assets/video/polaris/anyworld_generation_161f.mp4' | relative_url }}" autoplay loop muted playsinline></video>
</div>
<p class="pj-cap">The 161-frame AnyWorld generation (576×384) that is the only input to our field. Anchor-frame PSNR of the generated field against the scan is 11.2 dB (frames 0–49); both fields lose coverage once the orbit swings 96° wide, and the evaluation only ever uses the policy camera.</p>

<h3 class="pj-h">Setup</h3>

Food-bussing, 450 steps per episode; Isaac Sim 6.0.1 / Isaac Lab 6.1.14 on an RTX PRO 6000 Blackwell. Byte-comparing the two scene directories, the only differing file is the background `splat.ply`; initial conditions, splat placement and the resulting trajectories are identical.

</details>

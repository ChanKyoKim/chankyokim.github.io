---
layout: page
title: Real grasps in a generated scene
description: VLA policies evaluated inside a scene the world model generated from a single frame — one file changed, everything else byte-identical — and the ranking carried back to a real robot.
hero_video: assets/video/polaris/ours_pi05_ep11.mp4
result: Policy ranking preserved (r = 0.87) across five VLA policies · real → sim → real closed on TRI's DROID station.
img: assets/img/projects/polaris_thumb.jpg
importance: 2
category: trained inside the model
permalink: /projects/polaris-real2sim2real/
---

<p class="pj-meta">Toyota Research Institute, 2026 · AnyWorld × PolaRiS · food-bussing · Isaac Sim · real2sim2real on the DROID station</p>

<p class="pj-lede">PolaRiS evaluates manipulation policies inside a photographed real-to-sim scan of the workcell. We replace that scan with a Gaussian field <a href="{{ '/projects/anyworld/' | relative_url }}">AnyWorld</a> generated from a <strong>single frame</strong>, keep everything else byte-identical, and ask whether the evaluation still means anything — then take the answer back to the real robot.</p>

<div class="pj-hero">
  <video src="{{ '/assets/video/polaris/scan_vs_generated_same_orbit.mp4' | relative_url }}" autoplay loop muted playsinline controls></video>
</div>
<p class="pj-cap">One camera orbit, two fields. <strong>Left</strong> the PolaRiS scan — label text, mat seams and floor grain all resolve. <strong>Right</strong> our generated field — the workbench and mat geometry land in the right place; detail and far-field appearance degrade. The geometry survives; the appearance does not.</p>

<div class="pj-stats">
  <div class="pj-stat"><div class="n">1 file</div><div class="l">differs between the two conditions — the background splat. Robot, objects, initial conditions and camera path are byte-identical</div></div>
  <div class="pj-stat"><div class="n">r = 0.87</div><div class="l">policy ranking in the generated scene vs the real scan, across five VLA policies × 15 rollouts each; grasps and placements land at comparable rates</div></div>
  <div class="pj-stat"><div class="n">real → sim → real</div><div class="l">the same protocol on TRI's physical DROID station: the ranking measured inside the generated scene holds on the real robot</div></div>
</div>

<h2 class="pj-h">What we did</h2>

Render the scan along an orbit anchored on the policy camera, keep one first frame, and let AnyWorld roll the scene forward (161 frames). Depth Anything 3 depth over the generated frames accumulates into a 3DGS field (4.6 M Gaussians), decimated 4× and converted into PolaRiS's scene format. The evaluation observation is a three-layer composite — background splat, ray-traced robot arm and objects over it through a semantic mask — so everything that moves is pixel-identical across conditions and only the background changes. Then run the full food-bussing benchmark: five VLA policies (two π<sub>0</sub> checkpoints, π<sub>0.5</sub>, π<sub>0</sub>-FAST, a PaliGemma-based policy) × 3 backgrounds × 15 rollouts.

<div class="pj-grid c3">
  <video src="{{ '/assets/video/polaris/ours_pi05_ep11.mp4' | relative_url }}" autoplay loop muted playsinline></video>
  <video src="{{ '/assets/video/polaris/ours_pi05_ep13.mp4' | relative_url }}" autoplay loop muted playsinline></video>
  <video src="{{ '/assets/video/polaris/ours_pi0fast_ep9.mp4' | relative_url }}" autoplay loop muted playsinline></video>
</div>
<p class="pj-cap">The observation stream the policy actually consumed, on our generated background — π<sub>0.5</sub> (two episodes) and π<sub>0</sub>-FAST: approach → grasp → carry → bowl → next object, 2/2 objects placed.</p>

<h2 class="pj-h">What we found</h2>

The evaluation runs end-to-end on a background generated from one frame; policies pick objects up and put them in the bowl (lift 37% vs 27% on the scan, bowl placement 15% vs 12%); and the ranking of policies comes out the same as on the real scan. Then the harder truth: a deliberately 4×-blurred scan preserves the ranking just as well (r = 0.975), because the background is **96% of the pixels but 0% of the dynamics**. A benchmark that cannot tell a generated scene from a blurred one is measuring the wrong thing.

<div class="pj-grid">
  <img src="{{ '/assets/img/projects/three_backgrounds_ep0.jpg' | relative_url }}" alt="Three backgrounds, identical robot and objects">
</div>
<p class="pj-cap">Episode 0, frame 0 — the same robot and objects on three backgrounds: the PolaRiS scan, our generated field, and <em>blur4</em>, the scan degraded 4× as a control.</p>

<h2 class="pj-h">Why it matters</h2>

<div class="pj-take">Generated 3D scenes can stand in for scanning in policy evaluation today — and the control tells us exactly what the next generation of benchmarks must carry: <strong>dynamics</strong>. Objects that move, occlude and get remembered, not just backgrounds. That is the direction AnyWorld's memory is being pushed.</div>

<details class="pj-more" markdown="1">
<summary>Details — full results table, baseline clips, setup</summary>

<h3 class="pj-h">Five policies × three backgrounds × fifteen rollouts</h3>

Grasp attempts (two targets per episode) counted directly from trajectories with the benchmark's own thresholds.

| background | reach &lt; 20 cm | lift &gt; 6 cm | placed in bowl &lt; 8 cm | policy-ranking correlation |
|---|---|---|---|---|
| **PolaRiS scan** (reference) | 50.0% | 26.7% | 12.0% | — |
| **AnyWorld generated** (ours) | 48.0% | 37.3% | 15.3% | r = 0.870 |
| **blur4** (4× degraded scan) | 45.3% | 30.0% | 12.0% | r = 0.975 |

<h3 class="pj-h">The baseline works the same way</h3>

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
<p class="pj-cap">The 161-frame AnyWorld generation (576×384) that is the only input to our field. Anchor-frame PSNR of the generated field against the scan 11.2 dB (frames 0–49); both fields leave coverage once the orbit swings 96° wide — the evaluation only ever uses the policy camera.</p>

<h3 class="pj-h">Setup</h3>

Food-bussing, 450 steps/episode; Isaac Sim 6.0.1 / Isaac Lab 6.1.14 on an RTX PRO 6000 Blackwell. Byte-comparing the two scene directories, the only differing file is the background `splat.ply`; initial conditions, splat placement and the resulting trajectory are identical.

</details>

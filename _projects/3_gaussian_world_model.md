---
layout: page
title: Gaussian World Model
description: A learned dynamics model over a 3D Gaussian scene — rigid-body pose updates on the splats — with a sampling planner in closed loop on top; on the Pushing Gaussians benchmark, from 0/24 to 49% per attempt.
status: UMich × MBZUAI · 2026 · in progress
hero_video: assets/video/pushing_gaussians/task124_solved_long_haul.mp4
result: 0/24 → 49% per attempt, 79% within three tries, 23/24 tasks solved · offline error did not predict closed-loop success.
img: assets/img/projects/pushing_gaussians_thumb.jpg
importance: 3
category: geometry that moves
permalink: /projects/gaussian-world-model/
---

<p class="pj-meta">University of Michigan (Prof. Maani Ghaffari) × MBZUAI (Prof. Xingxing Zuo's group), 2026 · model-based planning on a 3D Gaussian representation · follows <a href="{{ '/projects/e3dgs/' | relative_url }}">E3DGS</a></p>

<p class="pj-lede">A 3DGS scene is a photograph in three dimensions: it has no idea what happens if you push the object in the middle of it. We built a world model that predicts exactly that, put a sampling planner on top, and asked a robot to push reconstructed objects onto goal poses within 30 mm — a 24-task benchmark we call Pushing Gaussians. <strong>It started at 0 of 24 tasks. It ends at 49% per attempt and 79% within three tries.</strong></p>

<div class="pj-grid c4 pj-hero">
  <video src="{{ '/assets/video/pushing_gaussians/task101_solved_clean_push.mp4' | relative_url }}" autoplay loop muted playsinline></video>
  <video src="{{ '/assets/video/pushing_gaussians/task124_solved_long_haul.mp4' | relative_url }}" autoplay loop muted playsinline></video>
  <video src="{{ '/assets/video/pushing_gaussians/task129_solved_rolling.mp4' | relative_url }}" autoplay loop muted playsinline></video>
  <video src="{{ '/assets/video/pushing_gaussians/task120_solved_corrections.mp4' | relative_url }}" autoplay loop muted playsinline></video>
</div>
<p class="pj-cap">Four solved tasks — same model, same planner, same seed. Green ghost is the goal pose, orange arrow the current error, red vector the action being executed. <strong>Left to right:</strong> one committed push; a 217 mm haul as a chain of short pushes; a rolling object that keeps going after contact; repeated corrections re-approaching from a new side.</p>

<div class="pj-stats">
  <div class="pj-stat"><div class="n">0 → 49%</div><div class="l">per-attempt success on a 24-task push-to-goal benchmark (106/216 over 9 planner seeds), from a first model that solved nothing</div></div>
  <div class="pj-stat"><div class="n">33 mm</div><div class="l">model error at the 60-step planning horizon — the size of the 30 mm goal tolerance. Every lever that worked kept the planner inside the model's trust region</div></div>
  <div class="pj-stat"><div class="n">17%</div><div class="l">success of the checkpoint with the lowest rollout error, a third of the champion's. Offline metrics did not predict closed-loop performance</div></div>
</div>

<h2 class="pj-h">Why this is possible at all</h2>

Predicting how a few hundred thousand Gaussians move one by one would be hopeless. The scenes are rigid: every Gaussian is welded to a body, so the entire future of the scene is one position and rotation update per body per step. The model outputs those, the splats follow rigidly, and the renderer never retrains. That turns an intractable field-prediction problem into a small structured one — and it is the single reason a world model over a photorealistic reconstruction can be cheap enough to sit inside a planner's inner loop. The planner is MPPI × CEM: 192 candidate action sequences imagined 60 frames ahead through the learned model, one step of the winner executed, replan. Nothing here is a physics engine.

<h2 class="pj-h">What moved the number</h2>

Four levers out of fifteen tried, each measured on the same 24 tasks with at least two repeats. Cap actions to the training distribution, because an optimizer will find where the model is wrong (2 → 8 of 24). Train the rollout as long as the planner plans — the single biggest jump, 33% → 44%, while the same fine-tune at the old length did nothing, which pins the cause. Double the execution budget, since pushing is slow, corrective work (44% → 49%). And retry, because MPPI is stochastic and failure is observable (49% → 79% best of three; 23/24 tasks ever solved). The eleven that failed — shorter horizons, gentler pushes, ensembles, DAgger, more capacity, heavier losses, finer geometry, harder search — are why we believe the four.

<div class="pj-grid c4">
  <video src="{{ '/assets/video/pushing_gaussians/task117_failed_near_miss.mp4' | relative_url }}" autoplay loop muted playsinline></video>
  <video src="{{ '/assets/video/pushing_gaussians/task131_failed_model_error.mp4' | relative_url }}" autoplay loop muted playsinline></video>
  <video src="{{ '/assets/video/pushing_gaussians/task102_failed_systematic.mp4' | relative_url }}" autoplay loop muted playsinline></video>
  <video src="{{ '/assets/video/pushing_gaussians/task103_failed_650mm.mp4' | relative_url }}" autoplay loop muted playsinline></video>
</div>
<p class="pj-cap">Four failures, same run. <strong>Left to right:</strong> a near miss that oscillates out (2 of 9 seeds solve it — the case for retry); model error cashing out as a wrong contact that throws the object 514 mm; a systematic error the planner commits to on every seed; and the one task never solved in 216 attempts — 650 mm of travel, five times the median.</p>

<h2 class="pj-h">The finding that transfers</h2>

<div class="pj-take">Selecting a checkpoint by one-step error made planning worse (23/48 → 13/48 while the metric improved). Selecting by 40-step rollout error was no better: the best model by that metric planned at 17%. <strong>A world model built for planning has to be selected by the planner, in closed loop</strong> — and part of any champion's margin is luck, so say so.</div>

Every number is in simulation with the reconstruction as the observation. Capability is nearly complete — 23/24 tasks solved at least once, the same envelope as a privileged oracle. Reliability is not: what separates 49% from that envelope is a bad approach route on a given attempt, not knowledge the model lacks.

<details class="pj-more" markdown="1">
<summary>Details — levers, the eleven that failed, results table, setup</summary>

<h3 class="pj-h">The constraint everything follows from</h3>

Rolled out through the model, error in the target's predicted position is 5.9 mm after 8 steps and 33 mm after 40 — against a 30 mm goal tolerance. Shortening the horizon does not help: horizon 20 gave 6/48 and horizon 40 gave 11/48, against 17–19/48 at horizon 60. Short horizons lose the strategic signal (where to stand before pushing) faster than they gain accuracy; the answer was to make the model trustworthy farther ahead, not to plan less far.

<h3 class="pj-h">Four levers</h3>

| # | lever | what it fixed | result |
|---|---|---|---|
| L1 | Cap actions at the training distribution's 90th percentile | Given free rein, MPPI proposed pushes far larger than anything in training; the model extrapolated an optimistic outcome and the real object went flying. | 2/24 → 8/24 |
| L2 | Train the rollout as long as the planner plans | Trained on 20-step rollouts, asked to imagine 30. Fine-tuning at rollout length 38 was the biggest jump; the same fine-tune at length 20 did nothing. | 33% → 44% (6 repeats) |
| L3 | Double the execution budget (400 → 800 steps) | Most failures at 400 were unfinished, not wrong; 1200 gave nothing back. | 44% → 49% (9 repeats, 216 attempts) |
| L4 | Retry | Stochastic planner, observable failure. A system-level lever, reported separately. | 49% → ~79% best of 3 → 23/24 in 9 tries |

<h3 class="pj-h">Eleven that did not work</h3>

Shorter horizons (strategic signal is worth more than per-step accuracy); gentler pushes (too slow to reach at all); an ensemble of three with a disagreement penalty (immature members poison the pessimism term); two rounds of DAgger (distribution shift was mild at 1.2–1.9×; doubling data confirmed that L2's active ingredient was rollout length); more capacity at widths 160/224/320 (all plateaued worse); a heavier long-horizon loss (improves the metric it weights, not the planning); doubling geometric resolution (geometry was not the limit); searching harder with 384 samples (a better optimizer exploits model error better — L1's lesson); a 1200-step budget (saturated); and re-rolling the champion checkpoint with the same recipe and seed (31%, 45% — it did not reproduce).

<h3 class="pj-h">Results</h3>

| per attempt | best of 3 tries | tasks ever solved | starting point |
|---|---|---|---|
| **49.1%** (106 of 216) | **~79%** (79 / 92 / 67% over three disjoint seed groups) | **23 / 24** — only the 650 mm task never fell | **0 / 24** (first learned model, uncapped actions) |

<h3 class="pj-h">Setup</h3>

24-task push-to-goal benchmark · planner MPPI×CEM, horizon 60, 192 samples, 4 iterations, replan every 5 · action cap 0.34 lin / 0.20 ang · 800-step budget · 30 mm tolerance · required travel 62–650 mm. The per-attempt figure is 106/216 over 9 independent planner seeds; best-of-3 uses three disjoint groups of three seeds; all comparisons have at least two repeats.

</details>

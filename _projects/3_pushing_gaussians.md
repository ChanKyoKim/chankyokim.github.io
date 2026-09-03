---
layout: page
title: Pushing Gaussians
description: Planning through a learned world model over a 3D Gaussian scene — from 0/24 to 49% per attempt, and why offline metrics could not have got us there.
img: assets/img/projects/pushing_gaussians_thumb.jpg
importance: 3
category: world models
permalink: /projects/pushing-gaussians/
---

<p class="text-muted">
University of Michigan (Prof. Maani Ghaffari) × MBZUAI (Prof. Xingxing Zuo's group), 2026 — the Gaussian-world-model line that follows <a href="/projects/e3dgs/">E3DGS</a>
</p>

**One sentence.** A 3DGS scene is a frozen photograph in three dimensions — it has no notion of what happens if you shove the thing in the middle of it. We built a world model that predicts exactly that, put a sampling planner on top, and asked a robot to push reconstructed objects onto goal poses within 30 mm. It started at 0/24. It ends at **49% per attempt** and **79% within three tries**.

## Why this is possible at all

Predicting how a few hundred thousand Gaussians move, one by one, would be hopeless and pointless. The scenes here are rigid: every Gaussian is welded to a body, so the entire future of the scene is one Δp, Δω per body per step. The model outputs those; the splats follow rigidly; the renderer never has to be retrained. That collapses an intractable field-prediction problem into a small structured one — and it is the single reason a world model over a photorealistic reconstruction can be cheap enough to sit inside a planner's inner loop, where it is called tens of thousands of times per second of simulated pushing.

**The task.** 24 push-to-goal instances. An arm must push one target object to a goal position, keeping the others where they are; success is the target inside 30 mm of the goal. Required travel ranges from 62 mm to 650 mm.

**The planner.** MPPI × CEM: each replan rolls 192 candidate action sequences 60 frames into the future through the learned model, weights them by predicted cost, executes one step of the winner, and throws the rest away. Nothing here is a physics engine — every imagined future is the network's guess.

## The constraint everything else follows from

Rolled out through the model, error in the target's predicted position is **5.9 mm after 8 steps** and **33 mm after 40 steps** — the planning horizon — against a **30 mm** goal tolerance. At the horizon the planner actually uses, model error and goal tolerance are the same size: the planner is steering by a map whose uncertainty equals the target it is aiming at. Every lever that worked, worked because it kept the planner inside the range where the model is still trustworthy.

The tempting fix is to shorten the horizon. We measured it: horizon 20 gave 6/48, horizon 40 gave 11/48, against 17–19/48 at horizon 60. Short horizons lose the strategic signal — where to stand before pushing — faster than they gain accuracy. The answer was not to plan less far ahead, but to make the model trustworthy that far ahead.

## Four levers that moved the number

Each measured against the one before it on the same 24 tasks with the same planner; each needed at least two repeats to count.

| # | lever | what it fixed | result |
|---|---|---|---|
| L1 | Cap actions at the training distribution's 90th percentile | An optimizer finds where the model is wrong: given free rein, MPPI proposed pushes far larger than anything in the training data, the model extrapolated an optimistic outcome, and the real object went flying. | 2/24 → 8/24 |
| L2 | Train the rollout as long as the planner plans | The model was trained on 20-step rollouts and asked to imagine 30. Fine-tuning at rollout length 38 was the single biggest jump; the same fine-tune at length 20 did nothing, which pins the cause to horizon coverage, not extra data or epochs. | 33% → 44% (6 repeats) |
| L3 | Give the planner twice the execution budget | Pushing is slow, corrective, many-contact work; most failures at 400 steps were unfinished, not wrong. 800 saturates — 1200 gave nothing back. | 44% → 49% (9 repeats, 216 attempts) |
| L4 | Retry | MPPI is stochastic and failure is observable in simulation. A system-level lever, reported separately from the per-attempt number. | 1 try 49% → 3 tries ~79% → 9 tries 23/24 solved |

## Eleven that did not work

Four levers survived out of fifteen tried. The discarded eleven are the more useful half of the record — they are why we believe the four. Shorter horizons (refuted: strategic signal is worth more than per-step accuracy); gentler pushes (too slow to reach at all); an ensemble of three models with a disagreement penalty (immature members poison the pessimism term); two rounds of DAgger (distribution shift was mild, 1.2–1.9×, and doubling data confirmed L2's active ingredient was rollout length); more capacity at widths 160/224/320 (all plateaued worse); a heavier long-horizon loss (improves the metric it weights, not the planning); doubling geometric resolution (geometry was not the limiting representation); searching harder with 384 samples (a better optimizer exploits model error better — the same lesson as L1); a 1200-step budget (saturated); and re-rolling the champion checkpoint with the same recipe and seed (31%, 45% — it did not reproduce).

## The finding that transfers: offline metrics do not predict closed-loop performance

Selecting a checkpoint by one-step error made planning **worse** — 23/48 at epoch 50 fell to 13/48 at epoch 120 while the error metric improved. Selecting by 40-step rollout error was no better: the model with the lowest rollout error we ever trained, 13.5 mm, planned at 17%, a third of the champion's rate. Adjacent epochs of one run swing by 12 points. We now treat checkpoint choice as something that must be measured in closed loop, not proxied — and part of the champion's margin is luck, and we say so.

## Results — 216 attempts, 24 tasks, 9 independent planner seeds

| per attempt | best of 3 tries | tasks ever solved | starting point |
|---|---|---|---|
| **49.1%** (106 of 216) | **~79%** (79 / 92 / 67% over three disjoint seed groups) | **23 / 24** — only the 650 mm task never fell | **0 / 24** (first learned model, uncapped actions) |

Capability and reliability are different problems here. Across nine attempts the planner solved 23 of 24 tasks at least once — the same envelope a privileged-information oracle reaches. What separates 49% from that envelope is not knowledge the model lacks; it is that any single attempt may pick a bad approach route and never recover.

## Watch it — four that worked, four that didn't

All eight are the same model, same planner, same seed — one run of the full 24-task benchmark. The green ghost is the goal pose; the orange arrow is the current error; the red vector is the action being executed.

<div class="row">
  <div class="col-sm-3 mt-3 mt-md-0">
    {% include video.liquid width="100%" path="assets/video/pushing_gaussians/task101_solved_clean_push.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true muted=true %}
  </div>
  <div class="col-sm-3 mt-3 mt-md-0">
    {% include video.liquid width="100%" path="assets/video/pushing_gaussians/task120_solved_corrections.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true muted=true %}
  </div>
  <div class="col-sm-3 mt-3 mt-md-0">
    {% include video.liquid width="100%" path="assets/video/pushing_gaussians/task124_solved_long_haul.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true muted=true %}
  </div>
  <div class="col-sm-3 mt-3 mt-md-0">
    {% include video.liquid width="100%" path="assets/video/pushing_gaussians/task129_solved_rolling.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true muted=true %}
  </div>
</div>
<div class="caption">
  <strong>Solved.</strong> Task 101 — the clean case: approach, one committed push, stop (98 mm to travel, 9 mm final error, 80 of 800 steps). Task 120 — repeated small corrections, re-approaching from a new side each time the object drifts (450 steps; the task that needed lever L3). Task 124 — long haul, 217 mm of travel down to 27 mm in a chain of short pushes. Task 129 — a rolling object that keeps going after the arm stops; within reach only after lever L2 taught the model to imagine 40 steps ahead.
</div>

<div class="row">
  <div class="col-sm-3 mt-3 mt-md-0">
    {% include video.liquid width="100%" path="assets/video/pushing_gaussians/task117_failed_near_miss.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true muted=true %}
  </div>
  <div class="col-sm-3 mt-3 mt-md-0">
    {% include video.liquid width="100%" path="assets/video/pushing_gaussians/task131_failed_model_error.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true muted=true %}
  </div>
  <div class="col-sm-3 mt-3 mt-md-0">
    {% include video.liquid width="100%" path="assets/video/pushing_gaussians/task102_failed_systematic.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true muted=true %}
  </div>
  <div class="col-sm-3 mt-3 mt-md-0">
    {% include video.liquid width="100%" path="assets/video/pushing_gaussians/task103_failed_650mm.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true muted=true %}
  </div>
</div>
<div class="caption">
  <strong>Failed.</strong> Task 117 — the near miss: closes to 59 mm, then a re-approach nudges it back out to 142 mm (2 of 9 seeds solve it — the clearest argument for retry). Task 131 — model error cashed out: a contact the model got wrong sends the object 514 mm away. Task 102 — a systematic error, not a noisy one: the object never once gets nearer the goal, every seed. Task 103 — the only task never solved in 216 attempts: 650 mm of required travel, five times the benchmark median; an honest hard ceiling.
</div>

## What this does and does not show

It shows that a learned dynamics model over a photorealistic Gaussian reconstruction is accurate enough to plan real multi-contact pushing through, that the pose-per-body structure makes it cheap enough for a sampling planner's inner loop, and that the gap between 0% and 49% was closed by four measurable, ordinary engineering decisions rather than a new architecture. It does **not** show real-world transfer — every number here is in simulation, with the reconstruction as the observation — nor a converged architecture; and 49% per attempt is not deployable on its own; the honest system number is the retry number.

<p class="text-muted small">
24-task push-to-goal benchmark · planner MPPI×CEM, horizon 60, 192 samples, 4 iterations, replan every 5 · action cap 0.34 lin / 0.20 ang · 800-step budget · 30 mm tolerance. Per-attempt figure is 106/216 over 9 independent planner seeds; best-of-3 is three disjoint groups of three seeds; all comparisons ≥ 2 repeats.
</p>

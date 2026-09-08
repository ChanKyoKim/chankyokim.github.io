---
layout: page
title: Closed-loop RL for a driving policy
description: A diffusion-policy driving model fine-tuned with closed-loop RL in simulation, with one road-relative reward — closed-loop completion of an unseen curve tripled, seeds and limits included.
status: Toyota Research Institute · 2026 · interim report
hero_video: assets/video/rl_driving/rl_finetuned_unseen_curve.mp4
result: Unseen-curve completion 17% → 50% in closed-loop evaluation (1/6 → 3/6 seeds) · lane-center error 0.44–0.56 m on completed runs · three limits measured and reproduced.
img: assets/img/projects/rl_driving_thumb.jpg
importance: 1
category: trained in the loop
permalink: /projects/rl-driving/
---

<p class="pj-meta">Toyota Research Institute, 2026 · closed-loop RL post-training of a driving policy · MetaDrive · interim report, September 2026</p>

<p class="pj-lede">Imitation gives a driving policy the average of what it saw. Post-training with reinforcement learning lets it improve on its own rollouts. We fine-tuned a diffusion-policy driving model in closed loop inside a simulator, with a single road-relative reward, and asked one question: does it take a curve it has never seen at lane center more often than the model it started from? <strong>It does — three times as often — and we report exactly how often.</strong></p>

<div class="pj-grid c2 pj-hero">
  <video src="{{ '/assets/video/rl_driving/rl_base_unseen_curve.mp4' | relative_url }}" autoplay loop muted playsinline></video>
  <video src="{{ '/assets/video/rl_driving/rl_finetuned_unseen_curve.mp4' | relative_url }}" autoplay loop muted playsinline></video>
</div>
<p class="pj-cap">Same unseen road, same start, same time budget; only the model differs. <strong>Left</strong> before fine-tuning: out of the lane 39 m in. <strong>Right</strong> after: 259 m at 0.25 m from lane center, ended by the clock. In each clip the left panel is the camera the policy sees and the right panel is the top-down track — orange is lane center, the green box is the car, red when it leaves the lane.</p>

<div class="pj-stats">
  <div class="pj-stat"><div class="n">1/6 → 3/6</div><div class="l">completions of an unseen curve over six initial-noise seeds, before vs after fine-tuning — closed-loop success 17% → 50%; median distance 42 m → 159 m</div></div>
  <div class="pj-stat"><div class="n">0.44–0.56 m</div><div class="l">lane-center error on completed runs, with zero lane departures (lane half-width 1.75 m); the base model's one completion sits at 0.89 m</div></div>
  <div class="pj-stat"><div class="n">1.8×</div><div class="l">training return in the one configuration of four whose reward actually rose (4.6 → 8.4), with exploration reaching past the curve exit</div></div>
</div>

<h2 class="pj-h">One reward, no branches</h2>

The reward for a step is progress along the road multiplied by two quality terms — how far the car sits from lane center and how far its heading deviates from the road tangent. All three are measured against the road itself, so when the road bends the target bends with it; there is no curve-specific term and no straight/curve branch. The terms are multiplied rather than added so the policy cannot trade one for another: standing still earns nothing, and cutting a corner gains no road-distance. Heading is weighted more sharply than position (10° off costs 41%, 20° costs 88%), because on a curve heading error appears one step before position error does.

<h2 class="pj-h">What generalizes, and what does not</h2>

Trained on two roads, the fine-tuned policy completes held-out roads of the same family at lane center — it did not memorize a road. The boundary is equally clear. Roads from a different generator fail even when the curve's radius, length and turn angle match to within a meter. The training curves were both left turns, and on right curves the fine-tuned model is worse than the base model. Changing sky, lighting and ground texture keeps the car moving but costs lane accuracy: on one cloudy variant it spends 71% of the run outside the lane.

<div class="pj-grid c3">
  <video src="{{ '/assets/video/rl_driving/rl_limit_other_generator.mp4' | relative_url }}" autoplay loop muted playsinline></video>
  <video src="{{ '/assets/video/rl_driving/rl_limit_right_curve.mp4' | relative_url }}" autoplay loop muted playsinline></video>
  <video src="{{ '/assets/video/rl_driving/rl_limit_cloudy.mp4' | relative_url }}" autoplay loop muted playsinline></video>
</div>
<p class="pj-cap">Three measured limits, fine-tuned model. <strong>Left</strong> a road from a different generator with a near-identical curve (radius 27.5 vs 28.3 m): lane error 5.15 m. <strong>Middle</strong> a right curve after training only on left curves: lost at 57 m. <strong>Right</strong> an unseen road under cloudy appearance: still driving, 71% of the time outside the lane.</p>

<h2 class="pj-h">Reading the result honestly</h2>

Completion is a probability, not a property. The same model on the same road either completes about 300 m or leaves the road near 50 m depending on the initial noise, and the base model completes one run in six too. What fine-tuning did is raise that probability. Two things in the report were corrected along the way: an evaluation that ran three configurations with a test-time execution rule they were never trained with was caught in the logs and redone with matched rules over six seeds, and an earlier "6.7× driving distance" figure, measured on a single seed, was withdrawn.

<div class="pj-take">Post-training moved the number that matters — how often the policy takes an unseen curve at lane center — and the three things that bound it (road family, curve direction, appearance) are each pinned down by a reproduced measurement. Next: diversify the training roads across generators and curve directions, randomize appearance during training, and evaluate everything at six seeds or more.</div>

<details class="pj-more" markdown="1">
<summary>Details — reward, training configurations, the evaluation error, seed table</summary>

<h3 class="pj-h">Reward</h3>

Per step: 1.5 × progress × position quality × heading quality, where progress is distance advanced along the road centerline divided by 3.75 m, position quality is exp(−d² / 2·(1.273 m)²) for lateral offset d, and heading quality is exp(−θ² / 2·(9.73°)²) for the angle θ to the road tangent. A small penalty on rotational acceleration suppresses zig-zagging; leaving the roadway ends the episode with a penalty.

| state | quality | cost vs. centered |
|---|---|---|
| on center, heading exact | 1.000 | — |
| 1.0 m off center, heading exact | 0.735 | 1.4× |
| on the lane edge, heading exact | 0.389 | 2.6× |
| on center, heading 10° off | 0.590 | 1.7× |
| on center, heading 20° off | 0.121 | 8.3× |
| lane edge and 25° off | 0.014 | 69.8× |

<h3 class="pj-h">Training</h3>

Group-relative policy optimization: within each batch of rollouts, trajectories that score above the batch mean are reinforced. Four configurations ran in parallel with the same reward, the same two training roads, the same starting model, learning rate and update count; they differ only in the items below.

| configuration | trajectory per step | initial noise within a batch | batch | exploration | episode cap | training reward |
|---|---|---|---|---|---|---|
| A | 16 candidates → execute the one the model scores highest | shared across the batch | 16 | 0.5 | 150 | 4.6 → 8.4 (p < 0.001) |
| B | 1 candidate, executed as is | drawn per sample | 16 | 0.5 | 150 | flat |
| C | 1 candidate | drawn per sample | 24 | 0.7 | 150 | fell; batch spread narrowed |
| D | as C | as C | 24 | 0.7 | 300 | fell; training stopped at iteration 70 |

A and B differ only in the first two columns, so they are the cleanest comparison. In A the batch spread widened and the policy kept moving; in C and D the spread collapsed and learning stalled.

<h3 class="pj-h">The evaluation error</h3>

A first evaluation ran all four configurations with the 16-candidate execution rule. B, C and D were trained with one candidate — they had been tested with a rule they never learned. The mismatch was confirmed in code and run logs, and every configuration was re-evaluated with its own training rule over six initial-noise seeds.

<h3 class="pj-h">Six seeds, unseen road A</h3>

| model | rule | completions | median distance | center error when completed |
|---|---|---|---|---|
| A (fine-tuned) | 16 candidates | **3/6** (p = 0.047 vs base) | 159 m | 0.44 · 0.45 · 0.56 m |
| C (fine-tuned) | 1 candidate | 3/6 (p = 0.12) | 167 m | 0.63 · 0.74 · 0.50 m |
| B (fine-tuned) | 1 candidate | 1/6 | 82 m | 1.27 m |
| D (fine-tuned) | 1 candidate | 1/6 | 45 m | 0.65 m |
| base model | 16 candidates | 1/6 | 42 m | 0.89 m |
| A with 1 candidate (mismatched) | 1 candidate | 0/6 | 180 m | — |
| B, C, D with 16 candidates (mismatched) | 16 candidates | 0/6 each | 40–65 m | — |

Completion = 250 m or more; the episode ends only when the car leaves the roadway entirely (cap 300 m). Run with a mismatched rule, model A's six runs cluster at 98–243 m rather than splitting into completions and early exits — so candidate selection shapes the outcome distribution at deployment, and is not by itself evidence of having learned more. The claim that "16 candidates was decisive" is not supported by this data.

<h3 class="pj-h">Generalization runs (single seed)</h3>

<div class="pj-grid c2">
  <video src="{{ '/assets/video/rl_driving/rl_finetuned_unseen_road_b.mp4' | relative_url }}" autoplay loop muted playsinline></video>
  <video src="{{ '/assets/video/rl_driving/rl_finetuned_unseen_road_c.mp4' | relative_url }}" autoplay loop muted playsinline></video>
</div>
<p class="pj-cap">Unseen roads B (radius 27.9 m) and C (radius 30.9 m), fine-tuned model A, seed 3: 267 m and 290 m at 0.63 m and 0.59 m from lane center. Different terrain, trees and buildings; all runs start 25 m before the curve.</p>

<h3 class="pj-h">Setup</h3>

MetaDrive; two training roads, twelve evaluation roads, about 280 measured rollouts; 120 training iterations per configuration (70 for D). Curves are located by re-sampling the road centerline at 1 m and thresholding curvature; every run starts 25 m before curve entry. Harness repeatability measured separately: 2% on short runs, 7% on long ones. Clips are the policy's own runs — the left panel is its camera input, the right panel the same moment from above.

</details>

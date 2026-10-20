---
layout: page
title: RL post-training for closed-loop driving
description: Improve a diffusion driving policy through feedback from its own closed-loop rollouts.
status: Toyota Research Institute · controlled simulation study
hero_video: assets/video/rl_driving/rl_finetuned_unseen_curve.mp4
result: "Unseen-curve completions: 1/6 → 3/6 seeds under matched execution rules. Generalization tested across road geometry and appearance."
img: assets/img/projects/rl-driving/rl_finetuned_unseen_curve.jpg
importance: 1
category: trained in the loop
permalink: /projects/rl-driving/
---

<p class="pj-meta">Toyota Research Institute · Diffusion policies and group-relative policy optimization · MetaDrive</p>

<p class="pj-lede">A driving policy must recover from the states its own actions create. This study uses closed-loop reinforcement learning to improve a diffusion policy on unseen roads, then tests whether that improvement survives changes in road geometry and appearance.</p>

<div class="pj-stats">
  <div class="pj-stat"><div class="n">1/6 → 3/6</div><div class="l">completed runs on an unseen curve, before and after post-training, across six initial-noise seeds</div></div>
  <div class="pj-stat"><div class="n">42 → 159 m</div><div class="l">median driving distance on that curve, with matched candidate-selection rules</div></div>
  <div class="pj-stat"><div class="n">0.44–0.56 m</div><div class="l">lane-center error on completed post-trained runs; the base model's completed run: 0.89 m</div></div>
</div>

<p class="pj-cap">A controlled six-seed pilot in simulation. These results describe this held-out curve and evaluation protocol, rather than an overall driving success rate.</p>

{% include research_video.liquid
  id="rl-before"
  title="Before post-training"
  duration="Baseline rollout"
  src="/assets/video/rl_driving/rl_base_unseen_curve.mp4"
  poster="/assets/img/projects/rl-driving/rl_base_unseen_curve.jpg"
  caption="The base policy leaves the lane 39 m into this unseen curve. Each clip shows the policy's camera input and the corresponding overhead track."
%}

{% include research_video.liquid
  id="rl-after"
  title="After post-training"
  duration="Same road and start"
  src="/assets/video/rl_driving/rl_finetuned_unseen_curve.mp4"
  poster="/assets/img/projects/rl-driving/rl_finetuned_unseen_curve.jpg"
  caption="The post-trained policy covers 259 m, with 0.25 m lane-center error in this example, before the time limit. The clips are individual rollouts; the six-seed aggregate above is the quantitative comparison."
%}

<section class="research-section">
  <p class="research-eyebrow">Learn from execution</p>
  <h2>A road-relative reward for progress and control</h2>
  <p>The reward combines progress along the road with lane-centering and heading quality. Because all three are measured relative to the road, the target follows the curve without a separate rule for turns. Group-relative policy optimization reinforces trajectories that score above the rollout batch mean.</p>
  <p>The reward terms are multiplied so progress cannot simply compensate for poor alignment. A rotational-acceleration penalty discourages zig-zagging, and leaving the roadway ends the episode.</p>
</section>

<section class="research-section">
  <p class="research-eyebrow">Test the boundaries</p>
  <h2>Generalization depends on the road and the observation.</h2>
  <p>Improvement transfers to held-out roads in the training family. A different road generator, a reversed turn direction, and changed appearance expose distinct failure modes. These examples motivate broader training coverage and separate geometry and appearance tests.</p>
</section>

<div class="pj-grid c3">
  <figure class="research-media">
    <div class="research-media-heading"><h3>Different road generator</h3></div>
    <video src="{{ '/assets/video/rl_driving/rl_limit_other_generator.mp4' | relative_url }}" poster="{{ '/assets/img/projects/rl-driving/rl_limit_other_generator.jpg' | relative_url }}" controls muted playsinline preload="none"></video>
    <figcaption>Near-matched curve geometry, but 5.15 m lane-center error in this run.</figcaption>
  </figure>
  <figure class="research-media">
    <div class="research-media-heading"><h3>Unseen turn direction</h3></div>
    <video src="{{ '/assets/video/rl_driving/rl_limit_right_curve.mp4' | relative_url }}" poster="{{ '/assets/img/projects/rl-driving/rl_limit_right_curve.jpg' | relative_url }}" controls muted playsinline preload="none"></video>
    <figcaption>A right curve after left-turn training: the policy is lost at 57 m.</figcaption>
  </figure>
  <figure class="research-media">
    <div class="research-media-heading"><h3>Changed appearance</h3></div>
    <video src="{{ '/assets/video/rl_driving/rl_limit_cloudy.mp4' | relative_url }}" poster="{{ '/assets/img/projects/rl-driving/rl_limit_cloudy.jpg' | relative_url }}" controls muted playsinline preload="none"></video>
    <figcaption>Cloudy appearance: continued motion, but 71% of this run outside the lane.</figcaption>
  </figure>
</div>

<div class="research-next">
  <p class="research-eyebrow">Related work · Submitted to ICLR 2027</p>
  <h2>ActionGuide: improving the reasoning around a frozen planner</h2>
  <p>ActionGuide studies a complementary route: post-train a multimodal guide to verify proposed trajectories and provide corrective guidance, while keeping the underlying motion planner frozen.</p>
  <a href="{{ '/projects/actionguide/' | relative_url }}">Read about ActionGuide →</a>
</div>

<details class="pj-more" markdown="1">
<summary>Experimental details: reward, training, and per-seed results</summary>

<h3 class="pj-h">Reward</h3>

Per step: 1.5 × progress × position quality × heading quality, where progress is distance advanced along the road centerline divided by 3.75 m, position quality is exp(−d² / 2·(1.273 m)²) for lateral offset d, and heading quality is exp(−θ² / 2·(9.73°)²) for the angle θ to the road tangent. A small penalty on rotational acceleration suppresses zig-zagging; leaving the roadway ends the episode with a penalty.

| state                           | quality | cost vs. centered |
| ------------------------------- | ------- | ----------------- |
| on center, heading exact        | 1.000   | —                 |
| 1.0 m off center, heading exact | 0.735   | 1.4×              |
| on the lane edge, heading exact | 0.389   | 2.6×              |
| on center, heading 10° off      | 0.590   | 1.7×              |
| on center, heading 20° off      | 0.121   | 8.3×              |
| lane edge and 25° off           | 0.014   | 69.8×             |

<h3 class="pj-h">Training</h3>

Group-relative policy optimization: within each batch of rollouts, trajectories that score above the batch mean are reinforced. Four configurations ran in parallel with the same reward, the same two training roads, the same starting model, learning rate and update count; they differ only in the items below.

| configuration | trajectory per step                                      | initial noise within a batch | batch | exploration | episode cap | training reward                        |
| ------------- | -------------------------------------------------------- | ---------------------------- | ----- | ----------- | ----------- | -------------------------------------- |
| A             | 16 candidates → execute the one the model scores highest | shared across the batch      | 16    | 0.5         | 150         | 4.6 → 8.4                              |
| B             | 1 candidate, executed as is                              | drawn per sample             | 16    | 0.5         | 150         | flat                                   |
| C             | 1 candidate                                              | drawn per sample             | 24    | 0.7         | 150         | fell; batch spread narrowed            |
| D             | as C                                                     | as C                         | 24    | 0.7         | 300         | fell; training stopped at iteration 70 |

Candidate selection and noise sharing change together between A and B, so this comparison does not isolate either factor. In A the batch spread widened and the policy kept moving; in C and D the spread collapsed and learning stalled.

<h3 class="pj-h">Matched execution rules</h3>

Each configuration is evaluated with the candidate-selection rule used during its training, over six initial-noise seeds. Mismatched execution rules are shown separately as diagnostic controls.

<h3 class="pj-h">Six seeds, unseen road A</h3>

| model                                   | rule          | completions | median distance | center error when completed |
| --------------------------------------- | ------------- | ----------- | --------------- | --------------------------- |
| A (fine-tuned)                          | 16 candidates | **3/6**     | 159 m           | 0.44 · 0.45 · 0.56 m        |
| C (fine-tuned)                          | 1 candidate   | 3/6         | 167 m           | 0.63 · 0.74 · 0.50 m        |
| B (fine-tuned)                          | 1 candidate   | 1/6         | 82 m            | 1.27 m                      |
| D (fine-tuned)                          | 1 candidate   | 1/6         | 45 m            | 0.65 m                      |
| base model                              | 16 candidates | 1/6         | 42 m            | 0.89 m                      |
| A with 1 candidate (mismatched)         | 1 candidate   | 0/6         | 180 m           | —                           |
| B, C, D with 16 candidates (mismatched) | 16 candidates | 0/6 each    | 40–65 m         | —                           |

Completion = 250 m or more; the episode ends only when the car leaves the roadway entirely (cap 300 m). Run with a mismatched rule, model A's six runs cluster at 98–243 m rather than splitting into completions and early exits — so candidate selection shapes the outcome distribution at deployment, and is not by itself evidence of having learned more. The claim that "16 candidates was decisive" is not supported by this data.

<h3 class="pj-h">Generalization runs (single seed)</h3>

<div class="pj-grid c2">
  <video src="{{ '/assets/video/rl_driving/rl_finetuned_unseen_road_b.mp4' | relative_url }}" poster="{{ '/assets/img/projects/rl-driving/rl_finetuned_unseen_road_b.jpg' | relative_url }}" controls muted playsinline preload="none"></video>
  <video src="{{ '/assets/video/rl_driving/rl_finetuned_unseen_road_c.mp4' | relative_url }}" poster="{{ '/assets/img/projects/rl-driving/rl_finetuned_unseen_road_c.jpg' | relative_url }}" controls muted playsinline preload="none"></video>
</div>
<p class="pj-cap">Unseen roads B (radius 27.9 m) and C (radius 30.9 m), fine-tuned model A, seed 3: 267 m and 290 m at 0.63 m and 0.59 m from lane center. Different terrain, trees and buildings; all runs start 25 m before the curve.</p>

<h3 class="pj-h">Setup</h3>

MetaDrive; two training roads, twelve evaluation roads, about 280 measured rollouts; 120 training iterations per configuration (70 for D). Curves are located by re-sampling the road centerline at 1 m and thresholding curvature; every run starts 25 m before curve entry. Harness repeatability measured separately: 2% on short runs, 7% on long ones. Clips are the policy's own runs — the left panel is its camera input, the right panel the same moment from above.

</details>

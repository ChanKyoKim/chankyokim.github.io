---
layout: page
title: "ActionGuide: Learning Transferable Action-Grounded Reasoning for Closed-Loop Driving"
description: A multimodal model that checks a frozen planner's trajectories and corrects them when none is safe — trained only in simulation, measured on real-world scenes and in closed loop.
status: Submitted to ICLR 2027 · co-authored research
result: "Action-grounded accuracy 41.4% → 53.5% from simulation-only training · at-fault scene score of a frozen planner 43.7 → 49.5 in closed loop · reasoning accuracy tracks driving utility (Pearson r = 0.90)."
img: assets/img/projects/actionguide/overview.jpg
importance: 2
category: trained in the loop
permalink: /projects/actionguide/
---

<p class="pj-meta">Co-authored research · Submitted to ICLR 2027 · CARLA training data, real-world evaluation (nuScenes, Waymo, Argoverse 2), closed-loop driving in AlpaSim</p>

<p class="pj-lede">A multimodal model can describe a driving scene. Can it tell whether a <em>specific trajectory</em> is safe — and does that judgment make a car drive better? ActionGuide puts a multimodal model in the loop as an online guide to a frozen motion planner: it rejects unsafe proposals and supplies a correction when none is acceptable. <strong>Trained only on simulated data, it is the most accurate open model we evaluated on real-world action judgments, and it gives the frozen planner its largest closed-loop gain.</strong></p>

<div class="pj-stats">
  <div class="pj-stat"><div class="n">53.5%</div><div class="l">overall action-grounded accuracy on real-world scenes, against 41.5% for the best of ten open MLLMs and driving VLAs, and 41.4% for the same model before training</div></div>
  <div class="pj-stat"><div class="n">43.7 → 49.5</div><div class="l">at-fault-collision scene score of the frozen DrivoR planner over 131 decision-critical AlpaSim scenarios once ActionGuide guides it (+5.84), the largest gain among eight guides</div></div>
  <div class="pj-stat"><div class="n">r = 0.90</div><div class="l">correlation between action-grounded accuracy and closed-loop scene score across seven guides (Spearman ρ = 0.96): the benchmark predicts driving utility</div></div>
</div>

<div class="research-links">
  <a class="research-link-primary" href="https://drive.google.com/file/d/1lnMP2VqkLdETzyftFpLUsavZFJA_2EsA/view?usp=sharing">Read the submitted paper ↗</a>
</div>

<figure class="research-media">
  <img src="{{ '/assets/img/projects/actionguide/overview.jpg' | relative_url }}" alt="ActionGuide-Bench: four action-grounded tasks (top) and the closed-loop guide around a frozen planner (bottom)">
  <figcaption><strong>Top:</strong> four action-grounded tasks — which evidence matters, what a plan will cause, whether a trajectory is acceptable, and which correction to take. <strong>Bottom:</strong> in closed loop the guide verifies each of the planner's proposals; the planner selects among the accepted ones, and if none is accepted, the guide picks a corrective anchor (here: stop and yield to pedestrians).</figcaption>
</figure>

<section class="research-section">
  <p class="research-eyebrow">Result 1 · Closed loop</p>
  <h2>A better guide makes the same planner drive better.</h2>
  <p>The planner (DrivoR) and its proposals are held fixed; only the guide changes. Every guide is evaluated on the same 131 curated AlpaSim scenarios — traffic signals, unprotected turns, yielding, work zones — under the same verification-and-correction interface. Pretrained models already help a little. ActionGuide helps most: it lowers at-fault collisions and off-road departures together, rather than trading one for the other.</p>
</section>

<div class="research-table" markdown="1">

| Guide over frozen DrivoR             | Collision, all ↓ | Collision, at-fault ↓ | Off-road ↓ | Scene score, all ↑ | Scene score, at-fault ↑ |
| ------------------------------------ | ---------------- | --------------------- | ---------- | ------------------ | ----------------------- |
| none (DrivoR alone)                  | 41.98%           | 38.17%                | 22.90%     | 42.56              | 43.66                   |
| + Qwen3-VL-32B                       | 36.64%           | 35.88%                | 24.43%     | 45.45              | 45.45                   |
| + Cosmos-Reason2-8B (before training) | 39.69%          | 35.88%                | 21.37%     | 45.36              | 47.92                   |
| **+ ActionGuide**                    | 37.40%           | **35.11%**            | **20.61%** | **48.18**          | **49.50**               |

</div>
<p class="pj-cap">AlpaSim, 131 scenarios. ActionGuide is Cosmos-Reason2-8B after supervised fine-tuning on ActionGuide-Train. All eight guides are in the details below.</p>

<div class="pj-grid c2">
  <figure class="research-media">
    <div class="research-media-heading"><h3>Repair</h3></div>
    <img src="{{ '/assets/img/projects/actionguide/case_repair.jpg' | relative_url }}" alt="The planner advances toward queued traffic; the guide selects Stop and avoids the collision">
    <figcaption>The planner advances toward queued traffic (blue); the guide picks Stop (red) and the collision that happens without guidance does not occur.</figcaption>
  </figure>
  <figure class="research-media">
    <div class="research-media-heading"><h3>Junction rescue</h3></div>
    <img src="{{ '/assets/img/projects/actionguide/case_junction_rescue.jpg' | relative_url }}" alt="All ten proposals are rejected; the corrective Stop anchor yields to cross traffic">
    <figcaption>All of the planner's top-10 proposals are rejected; the corrective Stop anchor — a motion outside the planner's own candidate set — yields to cross traffic.</figcaption>
  </figure>
</div>
<p class="pj-cap">Gray: the planner's proposals. Blue: the planner's own choice. Red: the guided choice. Examples use the pretrained Cosmos-Reason2-8B guide.</p>

<section class="research-section">
  <p class="research-eyebrow">Result 2 · Sim-to-real</p>
  <h2>Behavior knowledge learned in simulation transfers to real scenes.</h2>
  <p>Every training example comes from CARLA; every evaluation question comes from real driving logs (nuScenes, Waymo Open Motion, Argoverse 2 — 2,539 questions). Fine-tuning raises overall accuracy from 41.4% to 53.5%: Consequence Prediction +23.7 points, Corrective Guidance +14.2, Evidence Grounding +9.6. The gains are largest where the judgment is about driving behavior — unnecessary stopping, collision risk, crosswalk entry. Where the judgment depends on exact geometry and camera calibration (wide turns, corner cutting), accuracy drops; we report that as the limit of what simulation teaches.</p>
</section>

<figure class="research-media">
  <img src="{{ '/assets/img/projects/actionguide/sim_to_real.jpg' | relative_url }}" alt="Accuracy before and after simulation-only fine-tuning, per driving behavior">
  <figcaption>Real-world accuracy by behavior, before (gray) and after (green) simulation-only fine-tuning. Large gains on semantic, behavior-level judgments (up to +72.3 points); regressions on the two most geometry-sensitive categories (−9.1 and −30.0).</figcaption>
</figure>

<div class="research-table" markdown="1">

| Real-world action-grounded accuracy | Evidence  | Consequence | Trajectory | Corrective | Overall   |
| ----------------------------------- | --------- | ----------- | ---------- | ---------- | --------- |
| Qwen-Drive-1.0 (driving VLA)        | 30.62     | 45.12       | **69.23**  | 21.19      | 41.54     |
| Qwen3-VL-32B                        | 41.73     | 52.32       | 51.86      | 17.48      | 40.85     |
| Cosmos-Reason2-8B (before training) | 44.94     | 42.08       | 60.34      | 18.28      | 41.41     |
| **ActionGuide**                     | **54.57** | **65.76**   | 61.01      | **32.45**  | **53.45** |

</div>
<p class="pj-cap">Accuracy (%) on the four tasks; overall is the unweighted mean. Ten baselines in total — general MLLMs, a driving-knowledge MLLM, and three driving VLAs — are in the details below. No baseline exceeds 42% overall.</p>

<section class="research-section">
  <p class="research-eyebrow">Result 3 · Why the benchmark matters</p>
  <h2>Action-grounded accuracy predicts closed-loop utility.</h2>
  <p>Across seven guides, overall accuracy on the four tasks correlates with the closed-loop at-fault scene score at Pearson r = 0.901 (Spearman ρ = 0.964). Evidence Grounding alone already correlates at r = 0.858. A driving VLA can be good at one task and still drive poorly: Qwen-Drive-1.0 has the best trajectory-verification accuracy (69.2%) but scores 35.2 in closed loop as a standalone planner. Breadth across the four capabilities is what tracks driving.</p>
</section>

<div class="pj-grid c2">
  <figure class="research-media">
    <img src="{{ '/assets/img/projects/actionguide/capability_utility.jpg' | relative_url }}" alt="Overall action-grounded accuracy vs closed-loop scene score across seven guides">
    <figcaption>Each point is one guide over the same frozen planner. ActionGuide sits at the top right.</figcaption>
  </figure>
  <figure class="research-media">
    <img src="{{ '/assets/img/projects/actionguide/gains_by_category.jpg' | relative_url }}" alt="Average scene-score gain from MLLM guidance by scenario category">
    <figcaption>Where guidance helps: scene-score gain by scenario category for the pretrained guide — largest at signal transitions and unprotected left turns.</figcaption>
  </figure>
</div>

<section class="research-section">
  <p class="research-eyebrow">Result 4 · Reasoning before acting</p>
  <h2>Explicit reasoning makes pretrained knowledge actionable.</h2>
  <p>On 28 traffic-light and yielding scenarios, asking the pretrained guide to reason about signals and traversable space before recommending a behavior raised the at-fault scene score from 19.33 (planner alone) and 20.93 (proposal-by-proposal verification) to 31.24. That result is what motivated ActionGuide-Train: supervision that ties scene evidence, consequences and a concrete driving decision together.</p>
</section>

<figure class="research-media">
  <img src="{{ '/assets/img/projects/actionguide/reasoning_example.jpg' | relative_url }}" alt="Scene reasoning maps visual evidence to a recommended behavior and a planner proposal">
  <figcaption>Observation → reasoning → decision → execution. At a red light with cross traffic the guide recommends Stop; two seconds later, on green with a clear lane, Straight. Dashed: the planner's choice without reasoning.</figcaption>
</figure>

<section class="research-section">
  <p class="research-eyebrow">How it is trained</p>
  <h2>A simulation data engine with verified labels</h2>
  <p>ActionGuide-Train is built in CARLA from scenarios drawn from the California Driver's Handbook. For each decision state it creates contrasting behaviors under the same observation — rule-based variations that comply or conflict, plus proposals mined from real planner rollouts — replays them, and labels all four tasks from simulator state. The guide is Cosmos-Reason2-8B, fine-tuned on this data for one epoch.</p>
</section>

<figure class="research-media">
  <img src="{{ '/assets/img/projects/actionguide/data_engine.jpg' | relative_url }}" alt="Simulation-based data engine: anchor mining, scenario construction, behavior generation, grounded supervision">
  <figcaption>Anchor mining → scenario construction → behavior generation (rule-based synthesis and planner-rollout mining) → grounded supervision from structured simulator state.</figcaption>
</figure>

<div class="pj-take">What the evidence supports: a guide trained only in simulation improves real-world action judgments and improves a <em>fixed</em> planner in closed-loop simulation. It does not make DrivoR the strongest planner — the standalone Alpamayo-1.5 scores 63.8 under the same protocol — and closed-loop results are AlpaSim simulation, not on-vehicle driving. Guidance can also hurt: the cases below include a regression and an execution failure.</div>

<div class="pj-grid c2">
  <figure class="research-media">
    <div class="research-media-heading"><h3>Regression</h3></div>
    <img src="{{ '/assets/img/projects/actionguide/case_regression.jpg' | relative_url }}" alt="The guide chooses Go over Slow and the rollout later goes off-road">
    <figcaption>The guide chooses Go where the planner chose Slow near a constrained roadside; the rollout later leaves the road.</figcaption>
  </figure>
  <figure class="research-media">
    <div class="research-media-heading"><h3>Execution failure</h3></div>
    <img src="{{ '/assets/img/projects/actionguide/case_execution_failure.jpg' | relative_url }}" alt="Stop is selected but residual speed carries the ego into the lead vehicle">
    <figcaption>The right decision, too late: Stop is selected, but residual speed carries the car into the lead vehicle.</figcaption>
  </figure>
</div>

<details class="pj-more" markdown="1">
<summary>Full tables: all guides, all baselines, standalone planners, setup</summary>

<h3 class="pj-h">Closed loop: every guide over frozen DrivoR (AlpaSim, 131 scenarios)</h3>

| Guide                 | Collision, all (%) ↓ | Collision, at-fault (%) ↓ | Off-road (%) ↓ | Scene score, all ↑ | Scene score, at-fault ↑ |
| --------------------- | -------------------- | ------------------------- | -------------- | ------------------ | ----------------------- |
| none (DrivoR)         | 41.98                | 38.17                     | 22.90          | 42.56              | 43.66                   |
| + Qwen2.5-VL-7B       | 38.17                | 36.64                     | 22.90          | 44.72              | 45.38                   |
| + DriveFusion QA      | 38.93                | 38.17                     | 23.66          | 44.57              | 44.57                   |
| + Qwen3-VL-8B         | 37.40                | 36.64                     | 25.19          | 45.26              | 45.26                   |
| + Qwen3.5-4B          | 37.40                | 36.64                     | 26.72          | 45.27              | 45.27                   |
| + InternVL3.5-8B      | 37.40                | 36.64                     | 24.43          | 44.86              | 44.86                   |
| + Qwen3-VL-32B        | 36.64                | 35.88                     | 24.43          | 45.45              | 45.45                   |
| + Cosmos-Reason2-8B   | 39.69                | 35.88                     | 21.37          | 45.36              | 47.92                   |
| **+ ActionGuide**     | 37.40                | **35.11**                 | **20.61**      | **48.18**          | **49.50**               |

With the pretrained Cosmos-Reason2-8B guide, 18 of 131 scenarios improve, 13 of them by removing at least one collision or off-road outcome.

<h3 class="pj-h">Action-grounded evaluation: all models (accuracy, %)</h3>

| Model                         | Evidence  | Consequence | Trajectory | Yes ratio | Corrective | Overall   |
| ----------------------------- | --------- | ----------- | ---------- | --------- | ---------- | --------- |
| Alpamayo-1.5-10B (VLA)        | 27.41     | 31.20       | 50.13      | 99.87     | 14.70      | 30.86     |
| ReCogDrive (VLA)              | 25.43     | 37.76       | 50.80      | 2.12      | 16.95      | 32.74     |
| Qwen-Drive-1.0 (VLA)          | 30.62     | 45.12       | **69.23**  | 52.65     | 21.19      | 41.54     |
| Qwen2.5-VL-7B                 | 25.68     | 29.60       | 50.00      | 0.00      | 15.63      | 30.23     |
| DriveFusion QA                | 36.54     | 16.96       | 57.03      | 30.64     | 19.21      | 32.43     |
| Qwen3-VL-8B                   | 26.67     | 42.72       | 50.80      | 0.80      | 14.57      | 33.69     |
| Qwen3-VL-32B                  | 41.73     | 52.32       | 51.86      | 2.39      | 17.48      | 40.85     |
| Qwen3.5-4B                    | 33.09     | 42.40       | 64.46      | 43.10     | 18.54      | 39.62     |
| InternVL3.5-8B                | 27.65     | 37.92       | 54.77      | 11.67     | 19.34      | 34.92     |
| Cosmos-Reason2-8B             | 44.94     | 42.08       | 60.34      | 68.17     | 18.28      | 41.41     |
| **ActionGuide**               | **54.57** | **65.76**   | 61.01      | 54.77     | **32.45**  | **53.45** |

Yes ratio is diagnostic, with no preferred value: models with similar verification accuracy range from approving almost nothing (0%) to approving almost everything (99.9%), so equal accuracy can mean very different intervention behavior.

<h3 class="pj-h">Standalone planners under the same AlpaSim protocol</h3>

| Planner        | Collision, all (%) ↓ | Collision, at-fault (%) ↓ | Off-road (%) ↓ | Progress (%) ↑ | Scene score, all ↑ | Scene score, at-fault ↑ |
| -------------- | -------------------- | ------------------------- | -------------- | -------------- | ------------------ | ----------------------- |
| ReCogDrive     | 62.6                 | 61.1                      | 9.2            | 30.2           | 13.1               | 13.2                    |
| MindDrive      | 64.1                 | 62.6                      | 10.7           | 38.4           | 16.1               | 16.9                    |
| AutoVLA        | 54.2                 | 51.9                      | 37.4           | 79.5           | 26.8               | 27.5                    |
| Qwen-Drive-1.0 | 45.8                 | 42.7                      | 25.2           | 68.5           | 33.2               | 35.2                    |
| DrivoR         | 42.0                 | 38.2                      | 22.9           | 77.1           | 42.6               | 43.7                    |
| Alpamayo-1.5   | 16.8                 | 14.5                      | 22.1           | 85.3           | 63.6               | 63.8                    |

DrivoR is used as the base planner because it produces multiple candidate trajectories per step, which gives every guide the same proposal set to verify.

<h3 class="pj-h">Setup</h3>

Inputs to the guide: four front-view history frames over the preceding 2 s plus the current front, front-left and front-right views, with the candidate trajectory drawn as an overlay. Trajectories: eight waypoints at 0.5 s (4 s horizon). Corrective anchors: hard left, light left, straight, light right, hard right, stop. Training data: CARLA 0.9.16. Fine-tuning: Cosmos-Reason2-8B, LLM backbone updated with the vision encoder and aligner frozen, bfloat16 on 8 GPUs, one epoch, AdamW, learning rate 1 × 10⁻⁵, effective batch 16. Real-world evaluation: 2,539 multiple-choice questions from the validation splits of nuScenes, Waymo Open Motion and Argoverse 2. Closed loop: AlpaSim, 131 human-curated decision-critical scenarios, scene score as the primary metric.

</details>

<div class="research-next">
  <p class="research-eyebrow">Two routes to better closed-loop decisions</p>
  <h2>Policy post-training and reasoning around the planner</h2>
  <p>My related diffusion-policy project updates the driving policy using reinforcement learning. ActionGuide instead studies the reasoning interface around a frozen planner.</p>
  <a href="{{ '/projects/rl-driving/' | relative_url }}">Explore closed-loop policy post-training →</a>
</div>

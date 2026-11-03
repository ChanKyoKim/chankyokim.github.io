---
layout: page
title: "RoboBelief: A Belief Bottleneck for Robot Policies That Share the World"
description: When a person changes the scene while the robot is not watching, a VLA that carries an explicit probability over the hidden state decides far better than one that only remembers frames.
status: UMich × MBZUAI · 2026 · in progress · simulation
result: "Posterior-optimal first drawer in 87% of 200 runs vs 40% for the best frame-memory VLA and 56.5% for the best of six controls · 85% beyond the training horizon · the policy follows a swapped-in belief in 179/180 runs."
img: assets/img/projects/robobelief/robobelief_thumb.jpg
importance: 1
category: beliefs that act
permalink: /projects/robobelief/
---

<p class="pj-meta">University of Michigan × MBZUAI (Prof. Xingxing Zuo's group), 2026 · X-VLA 0.9B with LoRA · LIBERO kitchen with a scripted human partner · pre-registered closed-loop experiments</p>

<p class="pj-lede">A person opens a drawer, moves the bowl, closes it — while the robot looks elsewhere. Asked to fetch the bowl, the robot has to act on what probably happened. Today's VLAs see only the current frame or keep a memory of past frames. RoboBelief gives the policy an explicit <em>belief</em>: a calibrated probability over the hidden variable ("which drawer is the bowl in?"), updated as events arrive and fed into the action model. <strong>With the same backbone, data and budget, the belief policy opens the posterior-optimal drawer first in 87% of runs; every frame-memory variant stays at the level of a policy that ignores the history.</strong></p>

<div class="pj-grid">
  <img src="{{ '/assets/img/projects/robobelief/eval_chain_a_T16_seed2.gif' | relative_url }}" alt="Belief bottleneck opens the middle drawer first; FrameMem-128 and Blind open the top drawer" loading="lazy">
</div>
<p class="pj-cap">The same scene for three policies, from the actual evaluation runs (4× speed). The decisive move was masked; the partner's habit, seen earlier in the session, says <em>middle</em> with probability 0.6. <strong>Left:</strong> the belief policy opens the middle drawer first. <strong>Center and right:</strong> frame memory with 128 frames of history, and a policy with no history, both open the top drawer.</p>

<div class="pj-stats">
  <div class="pj-stat"><div class="n">87% vs 40%</div><div class="l">posterior-optimal first choice on the search task (174/200 runs) against the best frame-memory VLA; no history at all gives 33%, and the strongest of six controls reaches 56.5%. Task success: 94.5% vs at most 74.5%</div></div>
  <div class="pj-stat"><div class="n">85%</div><div class="l">at 64 partner acts, twice the longest history seen in training — against 39% for the strongest memory policy (gap +0.46, 95% CI [0.40, 0.53])</div></div>
  <div class="pj-stat"><div class="n">179/180</div><div class="l">runs in which the first drawer follows a belief swapped in at test time, with the frames unchanged (chance 1/3): the policy acts on the probability, not on a shortcut in the images</div></div>
</div>

<section class="research-section">
  <p class="research-eyebrow">The testbed</p>
  <h2>A hidden state with an exact answer</h2>
  <p>In the LIBERO kitchen, a scripted partner acts between the robot's observations: it moves the bowl (in view or masked), touches drawers without changing anything, glimpses inside, or shows a drawer empty. Because the partner's generative model is known, the correct posterior over the bowl's drawer is computed exactly for every test cell (3,998 cells, maximum error about 10⁻¹⁶). A policy is scored on whether its <em>first</em> drawer is the posterior-optimal one (POFC) — a measure of the decision, not of eventually finding the bowl by search.</p>
</section>

<div class="pj-grid c2">
  <figure class="research-media">
    <div class="research-media-heading"><h3>What the robot sees</h3></div>
    <img src="{{ '/assets/img/projects/robobelief/session_chain_a_T16.gif' | relative_url }}" alt="A session with 16 partner acts, the masked decisive move, then the robot's query" loading="lazy">
    <figcaption>One session with 16 partner acts. Grey frames: the decisive move happens while the robot is not watching.</figcaption>
  </figure>
  <figure class="research-media">
    <div class="research-media-heading"><h3>Even a witnessed move</h3></div>
    <img src="{{ '/assets/img/projects/robobelief/eval_chain_w_T16_seed0.gif' | relative_url }}" alt="Belief policy opens the bottom drawer; FrameMem-128 opens the top drawer although the move was visible" loading="lazy">
    <figcaption>The partner moves the bowl to the bottom drawer in full view. Frame memory still opens the top drawer; the belief policy goes straight to the bottom.</figcaption>
  </figure>
</div>

<section class="research-section">
  <p class="research-eyebrow">Result 1 · Decisions</p>
  <h2>Memory policies receive the evidence and do not use it.</h2>
  <p>At 16 partner acts, the 51 frames a RoboMME-style memory policy samples contain the decisive event in 96–100% of episodes. Its first choice is still at the level of the blind policy and the uniform floor. The belief policy keeps posterior-optimal choices at every horizon, including 64 acts it never trained on.</p>
</section>

<div class="research-table" markdown="1">

| Policy (same X-VLA backbone and data)    | Hidden-state labels | Probability fed to actions | First choice optimal | Task success |
| ---------------------------------------- | ------------------- | -------------------------- | -------------------- | ------------ |
| **Belief bottleneck** (training seed 0)  | ✓                   | ✓                          | **87%** (174/200)    | **94.5%**    |
| Belief bottleneck (training seed 1)      | ✓                   | ✓                          | 81%                  | 88%          |
| SelfSupBelief (label-free recurrent)     | –                   | latent only                | 56.5%                | 74.5%        |
| Recurrent + auxiliary labels             | ✓ (side head)       | –                          | 46.5%                | 70.5%        |
| FrameMem-51 + auxiliary labels           | ✓ (side head)       | –                          | 40%                  | 39.5%        |
| FrameMem-128 (RoboMME-style)             | –                   | –                          | 39.5%                | 40.5%        |
| FrameMem-51 (RoboMME-style)              | –                   | –                          | 34.5%                | 26.5%        |
| Blind (no history)                       | –                   | –                          | 33%                  | 41.5%        |
| _Floors: uniform / always the habit drawer_ |                  |                            | _33% / 35%_          |              |

</div>
<p class="pj-cap">Search family, 16 and 32 partner acts pooled, 10 fixed scene seeds, 200 runs per policy, no failure filtering. An end-to-end recurrent policy without labels failed to execute (no drawer opened in 55% of runs) and is excluded from the comparison.</p>

<figure class="research-media">
  <img src="{{ '/assets/img/projects/robobelief/fig4_ladder.png' | relative_url }}" alt="Posterior-optimal first choice across five task families and horizons: belief bottleneck vs best memory variant vs blind" loading="lazy">
  <figcaption>All five task families. Blue: belief bottleneck; orange: best memory variant; green: blind. With a binary hidden variable, memory matches the belief policy in two families (Identity, Temporal) and trails by about 25 points in two (Resume, Long-chain). In the three-way search family it falls to the blind level at every horizon. Error bars: Wilson 95% intervals.</figcaption>
</figure>

<section class="research-section">
  <p class="research-eyebrow">Result 2 · Which ingredient matters</p>
  <h2>Not the labels, not the recurrence — the probability in the action path.</h2>
  <p>The controls separate the three ingredients. <strong>Labels alone</strong> do not help: frame memory given the same hidden-state labels as an auxiliary head stays at 40%. <strong>Recurrence with labels</strong> does not either: a recurrent policy that reads the whole stream and is supervised on the same labels executes well but chooses at prior level — the belief policy beats it by +0.40 [0.31, 0.49] at 32 acts (Holm-adjusted p &lt; 0.001). <strong>A label-free recurrent belief</strong> keeps moves it saw (0.87 on witnessed chains) but loses the partner's habit on masked moves: 0.10, against 0.70 for the belief bottleneck.</p>
  <p>The policy also reads the belief causally. Replacing the posterior at query time while keeping every frame fixed, the first drawer follows the swapped-in belief in 179 of 180 runs. Feeding the history of a different scene moves the first choice to that scene's posterior in 75% of runs. One qualification we report: passing only the belief's top choice works as well on this task (88%), so the gain lies in forming the right belief, not in the policy using its fine-grained probabilities.</p>
</section>

<section class="research-section">
  <p class="research-eyebrow">Result 3 · The belief itself</p>
  <h2>A calibrated posterior that updates like Bayes' rule</h2>
  <p>On 231 validation episodes the filter's distance from the exact posterior is KL 0.080 and Brier 0.037. A forecast that uses only the partner's habit is at 0.712 / 0.424, and the auxiliary label head of the best memory policy is at 6.52 / 0.981. When the robot finds a drawer empty, the filter redistributes the probability between the two remaining drawers as Bayes' rule does, to within 0.054 on average over 119 events.</p>
</section>

<div class="pj-grid c2">
  <figure class="research-media">
    <img src="{{ '/assets/img/projects/robobelief/fig3_traces.png' | relative_url }}" alt="Filter posterior vs exact posterior over a session for witnessed and masked moves" loading="lazy">
    <figcaption>Filter belief (solid) against the exact posterior (dotted) over a session. Witnessed moves give a one-hot belief; after a masked move the belief spreads toward the partner's habit.</figcaption>
  </figure>
  <figure class="research-media">
    <img src="{{ '/assets/img/projects/robobelief/fig5_bayes.png' | relative_url }}" alt="Filter renormalisation after an empty drawer vs Bayes renormalisation" loading="lazy">
    <figcaption>After the first empty drawer: the filter's renormalised probability against Bayes' rule, 119 events.</figcaption>
  </figure>
</div>

<div class="pj-take">How far the claim goes: the filter recipe is not yet stable across fits. Refitted with other seeds, the same recipe gives first-choice rates of 71–87% (mean 77%), and the 87% headline uses the best of those fits. <strong>Every fit still beats every frame-memory and label-supervised control by at least 24 points, and the label-free recurrent belief by at least 14.</strong> Most policies were trained with one seed, the memory baselines with about 1/32 of RoboMME's training budget, the partner is scripted, and everything is in simulation with at most three hidden states. All hypotheses were pre-registered before data collection: 34 held, 14 were partially supported, 9 were not confirmed, 2 were invalid.</div>

<details class="pj-more" markdown="1">
<summary>Details: per-horizon results, policies, setup, and what runs next</summary>

<h3 class="pj-h">Search family by horizon (%)</h3>

| Policy                       | First choice optimal, 16 / 32 / 64 acts | Success, 16 / 32 / 64 acts |
| ---------------------------- | --------------------------------------- | -------------------------- |
| Belief bottleneck (seed 0)   | **89 / 85 / 85**                        | **92 / 97 / 92**           |
| Belief bottleneck (seed 1)   | 81 / 81 / 81                            | 86 / 90 / 93               |
| FrameMem-128                 | 37 / 42 / 39                            | 36 / 45 / 47               |
| FrameMem-51 + auxiliary      | 41 / 39 / 37                            | 40 / 39 / 41               |
| FrameMem-51 (seed 0)         | 35 / 34 / 37                            | 30 / 23 / 24               |
| Blind                        | 32 / 34 / 33                            | 39 / 44 / 41               |

Training covered 16 and 32 acts; 64 is beyond the training horizon. At 64 acts no memory variant's interval overlaps the belief policy's, and none excludes the blind policy's.

<h3 class="pj-h">The belief bottleneck</h3>

An element encoder feeds a GRU filter that runs over the whole session and emits three probabilities, one per drawer. The probabilities (as [log p, p]) enter the action transformer through four tokens. The filter (about 38 MB) is fitted first on exactly weighted ground-truth labels and then frozen while the policy is trained — which is what allows clamping or swapping the belief at test time. Every policy is a LoRA adapter (rank 32, α 64) of the same pinned X-VLA-Libero checkpoint, trained on the same demonstrations for 20k iterations.

<h3 class="pj-h">Rules</h3>

Hypotheses, analysis plans and decision rules were fixed in hashed files before data collection; amendments are dated. Failed runs and seeds are excluded and reported, never replaced. Contrast intervals are 95% cluster-bootstrap intervals over the 10 evaluation scene seeds.

<h3 class="pj-h">Next</h3>

Running: two partners with mirrored habits (does the belief read <em>who</em> acted? — the current filter does not use actor identity), three-way identity among identical bowls, and masked container swaps. Planned: memory baselines retrained at RoboMME scale with three seeds, filter stabilization (ensembles, selection against the exact posterior), a π0.5 backbone, and the RoboMME permanence tasks.

</details>

<div class="research-next">
  <p class="research-eyebrow">Related · decisions under hidden state</p>
  <h2>ActionGuide: reasoning that checks the action before it is taken</h2>
  <p>RoboBelief makes a robot policy carry what it cannot see. ActionGuide asks a related question for driving: can a multimodal model judge a concrete trajectory well enough to make a frozen planner drive better in closed loop?</p>
  <a href="{{ '/projects/actionguide/' | relative_url }}">Read about ActionGuide →</a>
</div>

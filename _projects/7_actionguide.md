---
layout: page
title: "ActionGuide: Learning Transferable Action-Grounded Reasoning for Closed-Loop Driving"
description: Multimodal reasoning that verifies candidate trajectories and guides a frozen driving planner.
status: Submitted to ICLR 2027 · co-authored research
importance: 2
category: trained in the loop
permalink: /projects/actionguide/
---

<p class="pj-meta">Co-authored research · Submitted to ICLR 2027</p>

<p class="pj-lede">Can a multimodal model turn scene understanding into better driving decisions? ActionGuide connects action-grounded reasoning to closed-loop execution, using a multimodal model as an online guide to a frozen motion planner.</p>

<div class="research-links">
  <a class="research-link-primary" href="https://drive.google.com/file/d/1lnMP2VqkLdETzyftFpLUsavZFJA_2EsA/view?usp=sharing">Read the submitted paper ↗</a>
</div>

## From understanding a scene to evaluating an action

ActionGuide-Bench evaluates four complementary capabilities: evidence grounding, consequence prediction, trajectory verification, and corrective guidance. Closed-loop simulation then measures whether those judgments improve the planner's decisions as actions change subsequent observations.

The guide checks the planner's proposed trajectories. When none are suitable, it supplies corrective guidance through an anchor behavior library. The underlying motion planner remains frozen, allowing the evaluation to focus on the utility of the multimodal guide.

## Post-training for transferable behavior knowledge

ActionGuide-Train links decision-critical contexts with alternative behaviors, execution outcomes, and corrective actions. Rule-based synthesis and planner rollouts in CARLA provide supervision for post-training the guide. Evaluation includes action-grounded judgments on real-world scenes and closed-loop driving in AlpaSim.

The study connects better reasoning with execution outcomes while keeping the distinction between real-world scene understanding and simulated driving explicit. Closed-loop results are simulation evaluations, not physical-vehicle deployment.

<div class="research-next">
  <p class="research-eyebrow">Two routes to better closed-loop decisions</p>
  <h2>Policy post-training and reasoning around the planner</h2>
  <p>My related diffusion-policy project updates the driving policy using reinforcement learning. ActionGuide instead studies the reasoning interface around a frozen planner.</p>
  <a href="{{ '/projects/rl-driving/' | relative_url }}">Explore closed-loop policy post-training →</a>
</div>

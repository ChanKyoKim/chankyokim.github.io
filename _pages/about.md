---
layout: about
title: about
permalink: /
subtitle: Ph.D. Candidate in Robotics at the <a href='https://robotics.umich.edu/'>University of Michigan</a> · Research Scientist Intern, World Foundation Model Team, <a href='https://www.tri.global/'>Toyota Research Institute</a>

profile:
  align: right
  image: chankyo2.jpg
  image_circular: false # crops the image to make it circular
  more_info: >
    <p>World Foundation Model Team, TRI</p>
    <p>Los Altos, CA, USA</p>

selected_papers: true # includes a list of papers marked as "selected={true}"
social: true # includes social icons at the bottom of the page

announcements:
  enabled: true # includes a list of news items
  scrollable: true # adds a vertical scroll bar if there are more than 3 news items
  limit: 5 # leave blank to include all the news in the `_news` folder

latest_posts:
  enabled: false
  scrollable: true # adds a vertical scroll bar if there are more than 3 new posts items
  limit: 3 # leave blank to include all the blog posts
---

I build world models that remember, act, and hold up in the real world — and I evaluate them in closed loop, on the robot.

I am a Ph.D. candidate in Robotics at the University of Michigan, advised by [Prof. Maani Ghaffari](https://curly.engin.umich.edu/). Since May 2026 I have been a Research Scientist Intern on the World Foundation Model team at Toyota Research Institute, building foundation models for driving and robotics. Before that I worked on factor-graph visual SLAM at Bear Robotics and co-founded [OUTTA](https://outta.ai/), an AI-education non-profit that has taught 3,000+ students.

My work runs along three lines. A world model needs a **memory** that outlives its context window and can be handed to other systems. A policy needs to keep improving after imitation, **in closed loop**, against what actually happens. And the whole stack rests on **geometry** that transforms lawfully as the world does.

<div class="pillars">
  <a class="pillar" href="{{ '/projects/anyworld/' | relative_url }}">
    <img src="{{ '/assets/img/projects/anyworld_thumb.jpg' | relative_url }}" alt="AnyWorld — a generated drive that stays on the road">
    <div class="body">
      <div class="eyebrow">Foundation world models</div>
      <h3>Worlds that remember</h3>
      <p>AnyWorld gives a video world model a persistent, renderable 3D Gaussian memory, so it keeps seeing what it has already seen — and can export the scene for policies to be evaluated in.</p>
      <p class="result">100% novel-view coverage at 45 m · rollouts track the recorded drive on 38/39 held-out scenes · policy rankings preserved inside generated scenes (r = 0.87)</p>
    </div>
  </a>
  <a class="pillar" href="{{ '/projects/rl-driving/' | relative_url }}">
    <img src="{{ '/assets/img/projects/rl_driving_thumb.jpg' | relative_url }}" alt="A fine-tuned driving policy taking an unseen curve at lane center">
    <div class="body">
      <div class="eyebrow">Post-training with RL</div>
      <h3>Trained in the loop</h3>
      <p>A diffusion-policy driving model fine-tuned with closed-loop RL in simulation, with one road-relative reward, so it takes curves it has never seen at lane center more often than the model it started from.</p>
      <p class="result">Unseen-curve completion 1/6 → 3/6 · lane-center error under 0.6 m on completed runs · every limit measured, not assumed</p>
    </div>
  </a>
  <a class="pillar" href="{{ '/projects/pushing-gaussians/' | relative_url }}">
    <img src="{{ '/assets/img/projects/pushing_gaussians_thumb.jpg' | relative_url }}" alt="A planner pushing reconstructed objects to goal poses">
    <div class="body">
      <div class="eyebrow">Geometry for manipulation</div>
      <h3>Geometry that moves</h3>
      <p>A Gaussian world model whose dynamics are rigid-body pose updates on the splats, planned through in closed loop with MPPI — built on equivariant representations (E3DGS, ReLN).</p>
      <p class="result">Push-to-goal success 0/24 → 49% per attempt, 79% within three tries · offline model error did not predict closed-loop success</p>
    </div>
  </a>
</div>

Underneath all three is a view about representations: a good one is aligned with what it should mean, controllable in the parts you want to intervene on, and consistent — it transforms lawfully as the world does. My equivariance work builds the third property in by construction: [Reductive Lie Neurons](https://arxiv.org/abs/2510.22984) (ICML 2026) for general linear symmetries on Lie algebras, and [E3DGS]({{ '/projects/e3dgs/' | relative_url }}), which shows that spherical-harmonic color is algebraically a geometric tensor.

If you work on world models, 3D/4D scene representations, or evaluating embodied agents, write to **chankyo@umich.edu**.

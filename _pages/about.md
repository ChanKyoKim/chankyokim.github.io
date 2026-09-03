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

I build **world models that remember, act, and hold up in the real world** — and I evaluate them where it counts: in closed loop, on the robot.

I am a Ph.D. candidate in Robotics at the University of Michigan, advised by [Prof. Maani Ghaffari](https://curly.engin.umich.edu/), and a Research Scientist Intern on the World Foundation Model team at Toyota Research Institute (2026). Before that: factor-graph visual SLAM at **Bear Robotics**, and co-founding [OUTTA](https://outta.ai/), an AI-education non-profit that has taught 3,000+ students.

My work runs along three lines. A world model needs a **memory** that outlives its context window and can be handed to other systems; a policy trained or judged **inside** that model has to survive contact with reality; and the whole stack rests on **geometry** that transforms lawfully as the world does.

<div class="pillars">
  <a class="pillar" href="{{ '/projects/anyworld/' | relative_url }}">
    <img src="{{ '/assets/img/projects/anyworld_thumb.jpg' | relative_url }}" alt="AnyWorld — a generated drive that stays on the road">
    <div class="body">
      <div class="eyebrow">Foundation world models</div>
      <h3>Worlds that remember</h3>
      <p>AnyWorld gives a video world model a persistent, renderable 3D Gaussian memory — 100% novel-view coverage, a 3D export that beats the backbone's own head, and rollouts that stay on the recorded drive.</p>
    </div>
  </a>
  <a class="pillar" href="{{ '/projects/polaris-real2sim2real/' | relative_url }}">
    <img src="{{ '/assets/img/projects/polaris_thumb.jpg' | relative_url }}" alt="A robot policy grasping inside a generated scene">
    <div class="body">
      <div class="eyebrow">Post-training with RL</div>
      <h3>Trained inside the model</h3>
      <p>Driving policies RL-fine-tuned inside the world model; VLA policies benchmarked inside scenes it generated, with the ranking carried back to a real robot — real2sim2real.</p>
    </div>
  </a>
  <a class="pillar" href="{{ '/projects/pushing-gaussians/' | relative_url }}">
    <img src="{{ '/assets/img/projects/pushing_gaussians_thumb.jpg' | relative_url }}" alt="A planner pushing reconstructed objects to goal poses">
    <div class="body">
      <div class="eyebrow">Geometry for manipulation</div>
      <h3>Geometry that moves</h3>
      <p>A Gaussian world model whose dynamics are rigid-body pose updates on the splats, planned through with MPPI — and the equivariant representations (E3DGS, ReLN) underneath it.</p>
    </div>
  </a>
</div>

Underneath all three is a conviction about representations: a good one is **aligned** with what it should mean, **controllable** in parts you can intervene on, and **consistent** — it transforms lawfully as the world does. My equivariance work builds the third property in by construction: [Reductive Lie Neurons](https://arxiv.org/abs/2510.22984) (ICML 2026) for general linear symmetries on Lie algebras, and [E3DGS]({{ '/projects/e3dgs/' | relative_url }}), which proves that spherical-harmonic **color is algebraically a geometric tensor**.

If you work on world models, 3D/4D scene representations, or evaluating embodied agents, write to **chankyo@umich.edu**.

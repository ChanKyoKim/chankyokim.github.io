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

I build world models that **remember, predict, and plan in 3D** — and I hold them to account in closed loop.

**Remember.** A world model that forgets what it has seen cannot plan beyond its current frame. In [AnyWorld](/projects/anyworld/) I give a video world model a *persistent, renderable 3D memory*: every observation is lifted, feed-forward, into 3D Gaussians and accumulated into a single scene that the generator conditions on and can export. Persistence is what closes the coverage gap — 100% novel-view coverage where single-frame reconstruction leaves up to a quarter of the view unobserved — and it makes generation more stable and more obedient to the commanded trajectory.

**Predict.** The right thing to predict is rarely pixels. I study which *latent* a world model should predict in (dynamics-aware video features re-identify occluded objects where image features cannot), build action-conditioned models that forecast a *distribution* over futures rather than a point estimate, and — with collaborators at MBZUAI — a [Gaussian world model](/projects/pushing-gaussians/) whose dynamics are rigid-body pose updates on the splats themselves, cheap enough to sit inside a planner's inner loop.

**Plan, and evaluate closed-loop.** Offline metrics mislead: in our pushing benchmark the checkpoint with the lowest rollout error planned at a third of the best one's rate. So I evaluate where it counts — fine-tuning driving policies with RL inside the world model, benchmarking VLA policies inside [scenes the model generated](/projects/polaris-real2sim2real/) and closing the loop on a real robot, and planning with MPPI through the Gaussian world model.

Underneath all of this is a conviction about representations. A good one is **aligned** with the meaning it should carry, **controllable** — factored into parts you can read off and intervene on — and **consistent**: it transforms lawfully as the world does, so the same scene from a new viewpoint or a later moment maps to a representation you can still trust. My work on equivariance builds the third property in by construction: [Reductive Lie Neurons](https://arxiv.org/abs/2510.22984) (ICML 2026) for general linear symmetries on Lie algebras, and [E3DGS](/projects/e3dgs/), which proves that low-degree spherical-harmonic **color is algebraically a geometric tensor**, so geometry and appearance can share one $SE(3)$-equivariant representation.

I am a Ph.D. candidate in Robotics at the University of Michigan, advised by [Prof. Maani Ghaffari](https://curly.engin.umich.edu/), and a Research Scientist Intern on the World Foundation Model team at Toyota Research Institute (2026). Before that I worked on factor-graph visual SLAM at **Bear Robotics**, and I co-founded [OUTTA](https://outta.ai/), an AI-education non-profit that has run bootcamps for 3,000+ students.

If you work on **world models**, **3D/4D scene representations**, or **evaluation of embodied agents**, I would love to talk: **chankyo@umich.edu**.

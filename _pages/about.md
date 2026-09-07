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
  limit: 9 # the whole year; the box scrolls

latest_posts:
  enabled: false
  scrollable: true # adds a vertical scroll bar if there are more than 3 new posts items
  limit: 3 # leave blank to include all the blog posts
---

I build world models with explicit 3D state, and I test them where it counts: in closed loop, on real robots.

I am a Ph.D. candidate in Robotics at the University of Michigan, advised by [Prof. Maani Ghaffari](https://curly.engin.umich.edu/). Since May 2026 I have been a Research Scientist Intern on the World Foundation Model team at Toyota Research Institute, building foundation models for driving and robotics. Before that I worked on factor-graph visual SLAM at Bear Robotics and co-founded [OUTTA](https://outta.ai/), an AI-education non-profit that has taught 3,000+ students.

My work runs from representation to control. At the bottom, representations that transform lawfully as the world does: [Reductive Lie Neurons](https://arxiv.org/abs/2510.22984) (ICML 2026) extends equivariance to general linear symmetries on Lie algebras, [E3DGS]({{ '/projects/e3dgs/' | relative_url }}) shows that the color of a 3D Gaussian is itself a geometric tensor, and [GINIO]({{ '/projects/ginio/' | relative_url }}) (CoRL 2026) applies the same law to sensing — a learned inertial measurement whose mean transforms as a vector and whose covariance transforms as a tensor, so a remounted IMU on a real robot needs no retraining. On top of that, a world model with memory: at TRI I am building [AnyWorld]({{ '/projects/anyworld/' | relative_url }}), a video world model that keeps a persistent, renderable 3D Gaussian memory of everything it has seen, and using the scenes it generates to [evaluate manipulation policies]({{ '/projects/polaris-real2sim2real/' | relative_url }}) with the result carried back to a physical robot. And at the top, policies that improve after imitation: [RL post-training of a driving policy]({{ '/projects/rl-driving/' | relative_url }}) in closed loop, and [planning through a learned Gaussian world model]({{ '/projects/gaussian-world-model/' | relative_url }}) for pushing tasks. A recurring thread is evaluation: building the harnesses — simulation, real-robot, seeded closed-loop — that decide whether a world model is actually useful.

The conviction underneath is simple: a scene representation should persist beyond what the model can currently see, transform lawfully when the viewpoint changes, and be judged by what a robot can do with it. Most of what I have learned came from the third part — a surprising amount of what looks good offline does not survive the closed loop, and finding out why is the job.

If you work on world models, 3D/4D scene representations, or evaluating embodied agents, write to **chankyo@umich.edu**.

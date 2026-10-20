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
    <p>Los Altos, CA · Ann Arbor, MI</p>

selected_papers: true # includes a list of papers marked as "selected={true}"
social: true # includes social icons at the bottom of the page

announcements:
  enabled: true # includes a list of news items
  scrollable: true # adds a vertical scroll bar if there are more than 3 news items
  limit: 8 # the whole year; the box scrolls

latest_posts:
  enabled: false
  scrollable: true # adds a vertical scroll bar if there are more than 3 new posts items
  limit: 3 # leave blank to include all the blog posts
---

I build world models with explicit 3D state for spatial reasoning and robot learning.

I am a Ph.D. candidate in Robotics at the University of Michigan, advised by [Prof. Maani Ghaffari](https://curly.engin.umich.edu/). Since May 2026 I have been a Research Scientist Intern on the World Foundation Model team at Toyota Research Institute, building foundation models for driving and robotics. Before that I worked on factor-graph visual SLAM at Bear Robotics and co-founded [OUTTA](https://outta.ai/), an AI-education non-profit that has taught 3,000+ students.

My work runs from representation to control, and one rule holds at every level: the representation should transform lawfully as the world does. [Reductive Lie Neurons](https://arxiv.org/abs/2510.22984) (ICML 2026) extends equivariance to general linear symmetries on Lie algebras. [E3DGS]({{ '/projects/e3dgs/' | relative_url }}) asks what a good latent for a 3D Gaussian looks like, and answers with one compact embedding that carries position, covariance and color together, so a single equivariant network can process a splat without Clebsch–Gordan machinery — and can be pre-trained with no labels at all, by masked prediction over the splats. [GINIO]({{ '/projects/ginio/' | relative_url }}) (CoRL 2026) applies the same law to sensing: a learned inertial measurement — mean and covariance alike — survives remounting the IMU on a real robot without retraining.

At TRI, I lead [AnyWorld]({{ '/projects/anyworld/' | relative_url }}), a camera-controlled world model whose persistent metric 3D memory directly exports as a scene asset. One set of weights spans driving, indoor scenes and games, with 8% median endpoint displacement error across six evaluation domains, compared with 24–65% for the evaluated baselines under the same sensor anchor and without alignment. I am also developing an [Isaac Sim pipeline to evaluate manipulation policies in generated scenes]({{ '/projects/polaris-real2sim2real/' | relative_url }}); validation on TRI's physical DROID station is planned.

My work on control includes [RL post-training of a driving policy]({{ '/projects/rl-driving/' | relative_url }}) in closed loop and [planning through a learned Gaussian world model]({{ '/projects/gaussian-world-model/' | relative_url }}) for pushing. Across these projects, I connect representation quality to measurable behavior through controlled evaluation.

Underneath the projects is one question: what makes a representation of the world good. My answer is three properties that reinforce one another. It is *aligned* — it carries the meaning it should, across the views and modalities it is drawn from. It is *controllable* — it factors the world into parts you can read off and intervene on, which is what turns perception into prediction and planning. And it is *consistent* — it transforms lawfully as the world does, so a new viewpoint or a later moment maps to something you can still trust. Geometric equivariance, in this picture, is one instance of consistency: a clean and powerful one, but a single member of a larger family. The closed loop is where I find out whether the other two hold.

If you work on world models, 3D/4D scene representations, or evaluating embodied agents, write to **chankyo@umich.edu**.

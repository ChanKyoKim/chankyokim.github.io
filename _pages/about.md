---
layout: about
title: about
permalink: /
subtitle: Ph.D. Candidate in Robotics at the <a href='https://robotics.umich.edu/'>University of Michigan</a> · Research Scientist Intern, World Foundational Model Team, <a href='https://www.tri.global/'>Toyota Research Institute</a>

profile:
  align: right
  image: chankyo2.jpg
  image_circular: false # crops the image to make it circular
  more_info: >
    <p>World Foundational Model Team, TRI</p>
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

I believe progress toward machine intelligence comes down to learning **good representations** of the world. What makes a representation *good*, to me, is not a single property but a few that reinforce one another. A good representation is **aligned**—it lines up with the meaning it should carry, and across the modalities and views it is drawn from. It is **controllable**—it factors the world into parts you can read off and intervene on independently, turning passive perception into prediction and planning. And it is **consistent**—it transforms lawfully as the world does, so the same scene from a new viewpoint or a later moment maps to a representation you can still trust. Geometric symmetry and equivariance, in this picture, are one instance of consistency—a clean and powerful one, but a single member of a larger family.

I’m a second-year Ph.D. student in Robotics at the University of Michigan, Ann Arbor, advised by Prof. Maani Ghaffari, and currently a Research Scientist Intern at **Toyota Research Institute (TRI)**. Guided by this picture, I study **representation learning, alignment, and world models**, and I treat **world models** as the setting where all three properties have to hold at once: to predict and to act, a model must represent a scene it can *align* to observation, *factor* into controllable parts, and roll forward *consistently* under motion.

Much of my work builds these properties in by **decomposing** a representation into parts with known transformation behavior—the controllable and consistent sides of a single idea. In [Reductive Lie Neurons](https://arxiv.org/abs/2510.22984) (ICML 2026), I design networks whose features stay consistent under general linear symmetries on Lie algebras. In [E3DGS](https://arxiv.org/abs/2607.15536), I carry this into appearance, proving that low-degree spherical-harmonic **color is algebraically a geometric tensor**—so geometry and appearance can be factored into one representation for action-conditioned Gaussian world modeling. In parallel, I work on **real-time, city-scale neural VIO/SLAM**, designing efficient visual encoders and temporal fusion for localization and mapping under long-horizon motion. Throughout, my aim is representations for **vision encoders and world models** that earn robustness and data efficiency from how they are built.

If you’re interested in collaboration on **representation learning**, **world models**, **alignment**, or **equivariant / consistent 3D representations across images and video**, feel free to reach out at **chankyo@umich.edu**!

**Experience:** Visual SLAM Researcher @ **Bear Robotics**; Generative Model AI Researcher @ Intellicon Metalab Inc.

**Education:** B.S. in Mechanical & Aerospace Engineering, Seoul National University (2022).

---
layout: page
title: "AnyWorld: A World Model That Builds Any World to Scale"
description: Camera-controlled world generation with persistent, exportable metric 3D memory.
status: Toyota Research Institute · under review at CVPR 2027
hero_video: assets/video/anyworld/forward_3up_scene012.mp4
hero_layout: wide
result: "8% median endpoint displacement error across six evaluation domains, vs 24–65% for compared baselines under the same sensor anchor; measured without alignment."
img: assets/img/projects/anyworld_thumb.jpg
importance: 1
category: worlds that remember
permalink: /projects/anyworld/
---

<p class="pj-meta">Chankyo Kim, Vitor Guizilini, Maani Ghaffari · Toyota Research Institute, 2026 · under review at CVPR 2027 · <a href="https://drive.google.com/file/d/1IUgG9KH6GNaDnTNCYpANMYp-98sluufa/view?usp=sharing">Read the paper</a></p>

<p class="pj-lede">AnyWorld generates video along camera trajectories specified in meters, maintaining a persistent 3D memory that directly exports as a scene asset without a separate reconstruction step. Across six evaluation domains, it achieves a median endpoint displacement error of <strong>8%, compared with 24–65%</strong> for the evaluated baselines under the same sensor anchor, without post-hoc alignment. The same memory supports scene revisits and conditioning on real images, connecting video generation with reusable 3D environments.</p>

<div class="pj-hero">
  <video src="{{ '/assets/video/anyworld/forward_3up_scene012.mp4' | relative_url }}" autoplay loop muted playsinline controls></video>
</div>
<p class="pj-cap">Qualitative rollout comparison on a held-out Waymo drive, using the same first frame and recorded camera trajectory. <strong>Left</strong> ground truth. <strong>Middle</strong> Lyra-2. <strong>Right</strong> AnyWorld. This video illustrates the driving setup; the metric results above summarize the paper's six-domain evaluation.</p>

<div class="pj-stats">
  <div class="pj-stat"><div class="n">8%</div><div class="l">median endpoint displacement error over six evaluation domains, without alignment; compared baselines: 24–65% with the same sensor anchor</div></div>
  <div class="pj-stat"><div class="n">6 domains</div><div class="l">one set of weights evaluated across driving, indoor scenes and games, including a driving camera rig absent from training</div></div>
  <div class="pj-stat"><div class="n">Direct export</div><div class="l">the memory used to condition generation decodes into a metric 3D Gaussian scene, with no separate reconstruction step</div></div>
</div>

<h2 class="pj-h">Metric camera control</h2>

A world model used for spatial reasoning or simulation needs camera commands to correspond to physical distances. We measure executed displacement directly against range-sensor references, without fitting the generated trajectory's scale to the command. This reveals a failure that aligned camera metrics can hide: a model can follow the right path while moving the wrong distance.

Controlled changes to the depth that initializes memory show that memory scale can strongly determine executed motion. AnyWorld addresses this with a shared metric convention for depth, poses and memory. The paper's model is trained on six datasets comprising 14,648 sequences and 7.0 million frames, spanning driving, indoor scans, games and a legged robot.

<h2 class="pj-h">Persistent memory for generation</h2>

AnyWorld stores observations as metric RGB-D keyframes and renders them as 3D Gaussians to condition subsequent generation. Accumulated memory brings previously observed structure back into view during revisits. Real photographs of the same scene, supplied with poses and depth, can also enter the memory as additional conditions without retraining.

<h2 class="pj-h">The memory is the asset</h2>

The memory used during generation decodes directly into a metric 3D Gaussian scene. In the paper's robot-lab geometry evaluation, the exported scene is placed in the robot coordinate frame using camera extrinsics alone, with 2.8% scale error and 3.1 cm geometry error. This measures geometric placement; physical-robot policy validation is planned in the related <a href="{{ '/projects/polaris-real2sim2real/' | relative_url }}">AnyWorld × PolaRiS project</a>.

<div class="pj-take">A shared metric scene representation connects camera control, persistent visual context and reusable 3D output. This makes world generation a foundation for spatial reasoning and for building environments in which robot policies can be evaluated.</div>

<details class="pj-more" markdown="1">
<summary>Evaluation scope and limitations</summary>

The 8% figure is the median across six domains of the reported endpoint displacement errors. It measures camera-motion scale, not overall reconstruction accuracy or image quality. The 24–65% comparison refers to Lyra 2.0, GEN3C and WorldStereo 2.0 evaluated with the same sensor anchor and without trajectory alignment.

Metric execution depends on the scale of the input memory. The paper separately examines sensor-free anchoring and reports its limitations, including game footage. Accurate displacement and scene placement do not by themselves establish correct contact dynamics or reliable robot behavior.

The paper reports the full protocols, domain-level results, ablations and the scope of exploratory analyses. Under review at CVPR 2027.

</details>

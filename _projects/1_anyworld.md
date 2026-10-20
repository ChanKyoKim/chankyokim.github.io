---
layout: page
title: "AnyWorld: A World Model That Builds Any World to Scale"
description: Generate video, revisit a scene, and export a world in metric 3D — with one persistent memory.
status: Toyota Research Institute · under review at CVPR 2027
hero_video: assets/video/anyworld/overview.mp4
hero_layout: wide
result: "8% median endpoint displacement error across six domains. Extra real views improve generation without retraining."
img: assets/img/projects/anyworld/overview.jpg
importance: 1
category: worlds that remember
permalink: /projects/anyworld/
---

<p class="pj-meta">Chankyo Kim, Vitor Guizilini, Maani Ghaffari · Toyota Research Institute · Under review at CVPR 2027</p>

<p class="pj-lede">Generate a world, move through it in meters, and return to what you have seen. AnyWorld adds feed-forward 3D Gaussian memory to a Wan-based video backbone, connecting camera-controlled generation with a persistent, exportable 3D scene.</p>

<div class="research-links">
  <a class="research-link-primary" href="https://drive.google.com/file/d/1IUgG9KH6GNaDnTNCYpANMYp-98sluufa/view?usp=sharing">Read the paper ↗</a>
  <a href="#extra-views">Explore the multi-view demos ↓</a>
  <a href="{{ '/blog/2026/anyworld/' | relative_url }}">How the world model works →</a>
</div>

{% include research_video.liquid
  id="anyworld-overview"
  title="One image. A persistent world."
  duration="90 seconds"
  src="/assets/video/anyworld/overview.mp4"
  poster="/assets/img/projects/anyworld/overview.jpg"
  caption="A walkthrough of metric camera control, scene memory, additional real views, and 3D export. The 3D previews use point renders of exported Gaussian fields; the robot footage is a simulation demonstration."
%}

<div class="pj-stats">
  <div class="pj-stat"><div class="n">8%</div><div class="l">median endpoint displacement error across six domains; compared baselines: 24–65% under the same sensor anchor, without alignment</div></div>
  <div class="pj-stat"><div class="n">6 domains</div><div class="l">one set of weights across driving, indoor scenes, and games, including an unseen driving camera rig</div></div>
  <div class="pj-stat"><div class="n">One memory</div><div class="l">metric keyframes support generation, real-view conditioning, and direct Gaussian scene export</div></div>
</div>

<nav class="research-jump" aria-label="AnyWorld demonstrations">
  <a href="#extra-views">Additional views</a><a href="#metric-control">Metric control</a><a href="#persistent-memory">Revisits</a><a href="#scene-export">3D export</a>
</nav>

<section class="research-section" id="extra-views">
  <p class="research-eyebrow">Condition on more of the world</p>
  <h2>One image starts the world. More views make it better informed.</h2>
  <p>Real photographs can enter the memory with their camera poses and depth, without retraining the model. These experiments test two sources of information: a later view along the route and the side cameras on the same vehicle.</p>
</section>

{% include research_video.liquid
  id="later-frame-demo"
  title="Add a view farther along the route"
  duration="16 seconds"
  src="/assets/video/anyworld/multiview-later-frame.mp4"
  poster="/assets/img/projects/anyworld/multiview-later-frame.jpg"
  caption="The same first frame, camera command, and seed, with a later real image added to memory. The comparison includes the recorded drive, first-frame-only generation, and controls using another scene or an incorrect pose. The inserted image comes from the same recording."
%}

{% include research_video.liquid
  id="side-camera-demo"
  title="Look left and right with additional camera views"
  duration="23 seconds"
  src="/assets/video/anyworld/multiview-side-cameras.mp4"
  poster="/assets/img/projects/anyworld/multiview-side-cameras.jpg"
  caption="Left and right camera images enrich memory before generation. Highlighted hold frames have matching recorded-camera references; the reference panel between them is a display aid, not continuous ground truth."
%}

<div class="research-table" markdown="1">

| Additional information      | Mean LPIPS, first frame only → extra views ↓ | Improved cases             |
| --------------------------- | -------------------------------------------- | -------------------------- |
| Later frame along the route | 0.543 → **0.484**                            | **33/34** scene–seed pairs |
| Left and right camera views | 0.559 → **0.339**                            | **28/30** scene–seed pairs |

</div>

<p class="pj-cap">Waymo evaluation with two generation seeds. Videos follow the experiment's coverage-based example-selection rule; the table summarizes all evaluated pairs. Photos, poses, and depth come from the same capture.</p>

<section class="research-section" id="metric-control">
  <p class="research-eyebrow">Connect a command to a physical distance</p>
  <h2>Camera motion should mean the same thing in every world.</h2>
  <p>A plausible trajectory can still cover the wrong distance. AnyWorld uses a shared metric convention for camera poses, depth, and memory, and evaluates executed motion against sensor references without fitting its scale after generation.</p>
</section>

{% include research_video.liquid
  id="metric-control-demo"
  title="The same camera command, across models"
  duration="24 seconds"
  src="/assets/video/anyworld/metric-execution.mp4"
  poster="/assets/img/projects/anyworld/metric-execution.jpg"
  caption="All methods start from the same image and receive the same camera path in meters. The distance bars show measured execution for this example. The 8% headline summarizes six domains, rather than this single clip."
%}

<section class="research-section" id="persistent-memory">
  <p class="research-eyebrow">Keep a world across time</p>
  <h2>Leave a place, then come back to it.</h2>
  <p>Accumulated keyframes bring previously observed structure back into view. Return-to-start trajectories compare the final generated view with the original image and isolate the effect of spatial retrieval.</p>
</section>

{% include research_video.liquid
  id="return-demo"
  title="A long excursion and a return to the starting view"
  duration="72 seconds"
  src="/assets/video/anyworld/leave-and-return.mp4"
  poster="/assets/img/projects/anyworld/leave-and-return.jpg"
  caption="Two loops compare AnyWorld with other models and memory ablations. The first follows a 243 m commanded loop, selected from locally available comparison runs. The second follows the paper's example-selection rule. These illustrate memory behavior, not unlimited scene persistence."
%}

<section class="research-section" id="scene-export">
  <p class="research-eyebrow">Take the world beyond video</p>
  <h2>The keyframes used for generation also become a 3D asset.</h2>
  <p>Stored metric RGB-D keyframes decode into a Gaussian scene without reconstructing the generated video afterward. They can also be fused into a surface mesh. The export preserves the camera coordinate frame, making scale and placement testable against real sensor measurements.</p>
</section>

{% include research_video.liquid
  id="mesh-demo"
  title="Exported geometry across driving, indoor, and robot scenes"
  duration="31 seconds"
  src="/assets/video/anyworld/metric-mesh.mp4"
  poster="/assets/img/projects/anyworld/metric-mesh.jpg"
  caption="Meshes fused from the generation memory's RGB-D keyframes. Color and geometry views expose both surfaces and missing coverage. Geometry export does not establish correct contact dynamics or successful physical-robot control."
%}

<p>In the paper's robot-lab evaluation, Gaussian assets achieve <strong>2.8% median scale error and 3.1 cm placement error</strong> using camera extrinsics without scale fitting. This evaluation is separate from the three mesh examples above. <a href="{{ '/projects/polaris-real2sim2real/' | relative_url }}">AnyWorld × PolaRiS</a> explores policy evaluation in generated backgrounds.</p>

<div class="research-next">
  <p class="research-eyebrow">Research note</p>
  <h2>Why metric memory changes world generation</h2>
  <p>The scale intervention, keyframe-to-Gaussian design, indoor experiments, and the connection to robot evaluation.</p>
  <a href="{{ '/blog/2026/anyworld/' | relative_url }}">Read the technical story →</a>
</div>

<details class="pj-more" markdown="1">
<summary>Evaluation scope</summary>

The 8% figure is the median of endpoint displacement errors across six domains. It measures camera-motion scale, not overall image quality or reconstruction accuracy. The 24–65% range refers to Lyra 2.0, GEN3C, and WorldStereo 2.0 with the same sensor anchor and without trajectory alignment.

The paper's model uses six training datasets, 14,648 sequences, and 7.0 million frames. Later retraining and asset-refinement experiments are separate ongoing work; these videos do not imply that those models have been adopted.

Metric execution still depends on the input scale. Exported assets can contain holes, low-opacity surfaces, and appearance errors. PolaRiS footage is simulation-only; physical-robot policy validation remains planned.

</details>

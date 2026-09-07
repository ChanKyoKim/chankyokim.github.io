---
layout: page
title: GINIO
description: A learned inertial measurement that obeys the geometry of its sensor — the mean transforms as a vector, the covariance as a tensor — under any IMU mounting, so the estimator downstream never sees a frame it was not trained for.
status: CoRL 2026
result: Remounted IMU on a real robot 8.15 m → 0.50 m ATE with no retraining · 2.0 m vs 76.4 m under arbitrary rotation on TLIO, with 11.6× fewer FLOPs than the equivariant baseline.
img: assets/img/projects/ginio_thumb.jpg
importance: 4
category: geometry that moves
permalink: /projects/ginio/
---

<p class="pj-meta">Chankyo Kim, Tzu-Yuan Lin, Minghan Zhu, Bo Liu, Maani Ghaffari · University of Michigan · <a href="https://openreview.net/forum?id=nl8iBTm3Mt">CoRL 2026</a> · Austin, November 2026</p>

<p class="pj-lede">Neural inertial odometry puts a network inside a filter: the network reads a window of IMU data and emits a motion estimate and its uncertainty, and the filter fuses them. The same physical motion looks different to a sensor that is rotated, remounted, or installed on another platform, yet the filter needs the learned measurement to mean the same thing. <strong>GINIO makes that a law rather than a hope</strong>: under any rotation of the IMU frame, the predicted mean transforms as a vector and the predicted covariance as a second-order tensor, by construction.</p>

<div class="pj-grid narrow">
  <img src="{{ '/assets/img/projects/ginio_thumb.jpg' | relative_url }}" alt="Gravity-aligned pipelines vs an SO(3)-equivariant interface">
</div>
<p class="pj-cap"><strong>Top</strong> the standard route: rotate IMU data into a gravity-aligned frame, which is only robust to rotation about gravity and inherits every error of the external attitude estimate. <strong>Bottom</strong> GINIO: an equivariant network reads the sensor frame directly, and the three mountings produce one consistent trajectory up to the known frame change.</p>

<div class="pj-stats">
  <div class="pj-stat"><div class="n">8.15 → 0.50 m</div><div class="l">ATE on a physically remounted IMU on a Fetch robot, with no retraining — the case the method exists for</div></div>
  <div class="pj-stat"><div class="n">2.0 vs 76.4 m</div><div class="l">ATE on TLIO under arbitrary SO(3) rotation, GINIO vs the canonicalizing equivariant baseline (EqNIO), at 11.6× fewer FLOPs</div></div>
  <div class="pj-stat"><div class="n">5.58 → 1.43 m</div><div class="l">on NanoBench aerial flights with an AirIO-style recurrent instantiation, without any external attitude input</div></div>
</div>

<h2 class="pj-h">What the interface guarantees</h2>

An IMU window is a sequence of specific-force and angular-velocity vectors in the sensor frame; remounting the sensor acts on every one of them by the same rotation. GINIO maps the window to a motion measurement and a covariance, and satisfies G(R·Z) = (R m, R Σ Rᵀ) exactly. Two ingredients make this cheap. The temporal layers are SO(3)-equivariant — scalar mixing over time and channels, rotation-invariant nonlinearities, cross-product interactions — so weights never act on the geometric dimension and the parameter count drops. The covariance comes from a spectral head: three equivariant vectors define a frame, three invariant scalars define the eigenvalues, so uncertainty rotates with the motion instead of being a fixed ellipsoid in a fixed frame.

<h2 class="pj-h">Why sensor-frame learning is now practical</h2>

Learning in the sensor frame is hard because gravity rotates within a window. Last-Frame Alignment expresses every sample in the window's final sensor frame — a deterministic preprocessing step that is provably equivalent to world-frame training for an equivariant predictor — while the connected estimator keeps tracking sensor-local nuisance state such as IMU bias. Geometry is enforced in the learned measurement; nuisance is left to the filter, where it belongs.

<h2 class="pj-h">Why it matters</h2>

<div class="pj-take">GINIO is a design principle, not a backbone trick: the same interface is instantiated on ResNet-style temporal networks, AirIO-style recurrent models and EqNIO-style canonicalized models, and improves each. It is the sensing counterpart of the representation work in <a href="{{ '/projects/reln/' | relative_url }}">Reductive Lie Neurons</a> and <a href="{{ '/projects/e3dgs/' | relative_url }}">E3DGS</a> — build the transformation law into the model, and remounting, re-platforming and viewpoint change stop being distribution shift.</div>

<details class="pj-more" markdown="1">
<summary>Details — instantiations, benchmarks, what is and is not equivariant</summary>

- **Instantiations.** Filter-connected NIO on TLIO/RIDI; AirIO-style recurrent prediction on NanoBench (real nano-quadrotor flights, aggressive maneuvers); EqNIO-style full-SO(3) canonicalization; ResNet-style temporal backbone (0.581 m ATE vs 0.645 m for ResNet1D).
- **Against canonicalization.** Gravity-aligned pipelines enforce only the gravity-stabilizer subgroup O_g(3) ≅ O(2) and couple the input distribution to an external attitude estimate; GINIO enforces the full SO(3) law on both mean and covariance without a privileged vertical axis.
- **Ablations.** Augmentation vs equivariance, diagonal vs spectral covariance (diagonal heads cannot satisfy the congruence law), capacity, and frame-estimation mismatch.
- **Physical remount.** The Fetch experiment changes only the IMU mounting between training and test; the model is not retrained. This is the setting in which augmentation-trained baselines fail and the interface holds.

</details>

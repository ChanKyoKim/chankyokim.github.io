---
layout: page
title: Reductive Lie Neurons
description: Equivariant neural networks for general linear symmetries on Lie algebras — twists, covariances and Gaussian shape matrices transform lawfully with the frame they are expressed in.
result: ReLN-Gaussian-MAE reaches 95.2% under arbitrary rotations on ShapeSplat where non-equivariant baselines fall to 18.3%.
status: ICML 2026
importance: 6
category: geometry that moves
permalink: /projects/reln/
---

<p class="pj-meta">
Chankyo Kim, Sicheng Zhao, Minghan Zhu, Tzu-Yuan Lin, Maani Ghaffari · ICML 2026 · <a href="https://arxiv.org/abs/2510.22984">arXiv 2510.22984</a> · <a href="https://reductive-lie-neuron.github.io/">project page</a>
</p>

<p class="pj-lede">Equivariant networks are usually built for compact groups such as rotations. Reductive Lie Neurons (ReLN) extend equivariance to <strong>general linear symmetries acting on Lie algebras</strong> — $GL(n,\mathbb{R})$ and its reductive subgroups — with layers that stay consistent under the adjoint action, so features that live on $\mathfrak{gl}(n)$ transform lawfully with the frame they are expressed in.</p>

<h2 class="pj-h">Why it matters</h2>

Many quantities in robotics and 3D vision are naturally Lie-algebraic — twists, covariances, Gaussian shape matrices, inertial measurements — and their natural symmetry is larger than rotation. Building the symmetry in yields robustness and data efficiency that augmentation cannot buy: our $GL(3)$-equivariant self-supervised backbone for 3D Gaussian splats, ReLN-Gaussian-MAE, reaches <strong>95.2% accuracy under arbitrary rotations</strong> on ShapeSplat where non-equivariant baselines fall to 18.3%.

<h2 class="pj-h">Where it leads</h2>

ReLN is the algebraic backbone behind [E3DGS](/projects/e3dgs/) (color as a geometric tensor in $\mathfrak{gl}(3)$) and behind [GINIO](/projects/ginio/) (CoRL 2026), an SO(3)-equivariant interface for neural inertial odometry that holds up when the sensor is physically remounted on a real robot.

<!-- TODO(chankyo): add a teaser figure at assets/img/projects/reln_teaser.png and set `img:` in the front matter -->

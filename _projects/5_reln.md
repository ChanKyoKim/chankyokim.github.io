---
layout: page
title: Reductive Lie Neurons
description: Equivariant neural networks for general linear symmetries on Lie algebras (ICML 2026).
importance: 5
category: geometry
permalink: /projects/reln/
---

<p class="text-muted">
Chankyo Kim, Sicheng Zhao, Minghan Zhu, Tzu-Yuan Lin, Maani Ghaffari · ICML 2026 · <a href="https://arxiv.org/abs/2510.22984">arXiv 2510.22984</a> · <a href="https://reductive-lie-neuron.github.io/">project page</a>
</p>

**One sentence.** Equivariant networks are usually built for compact groups such as rotations. Reductive Lie Neurons (ReLN) extend equivariance to **general linear symmetries acting on Lie algebras** — $GL(n,\mathbb{R})$ and its reductive subgroups — with layers that stay consistent under the adjoint action, so features that live on $\mathfrak{gl}(n)$ transform lawfully with the frame they are expressed in.

## Why it matters

Many quantities in robotics and 3D vision are naturally Lie-algebraic — twists, covariances, Gaussian shape matrices, inertial measurements — and their natural symmetry is larger than rotation. Building the symmetry in yields robustness and data efficiency that augmentation cannot buy: our $GL(3)$-equivariant self-supervised backbone for 3D Gaussian splats, **ReLN-Gaussian-MAE**, reaches 95.2% accuracy under arbitrary rotations on ShapeSplat where non-equivariant baselines fall to 18.3%.

## Where it leads

ReLN is the algebraic backbone behind [E3DGS](/projects/e3dgs/) (color as a geometric tensor in $\mathfrak{gl}(3)$) and behind equivariant neural inertial odometry (GINIO), deployed in real time on legged robots.

<!-- TODO(chankyo): add a teaser figure at assets/img/projects/reln_teaser.png and set `img:` in the front matter -->

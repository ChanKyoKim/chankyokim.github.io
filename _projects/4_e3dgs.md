---
layout: page
title: E3DGS
description: Color as a geometric tensor — geometry and appearance share one SE(3)-equivariant representation for 3DGS (ICLR 2027 submission).
importance: 4
category: geometry that moves
permalink: /projects/e3dgs/
---

<p class="pj-meta">
Chankyo Kim, Maani Ghaffari · University of Michigan, 2026 · <a href="https://arxiv.org/abs/2607.15536">arXiv 2607.15536</a> · in submission (ICLR 2027)
</p>

<p class="pj-lede">Equivariant processing of 3D Gaussian Splatting has always treated color as a separate signal. It is not. Spherical-harmonic color up to degree 2 is <strong>algebraically isomorphic to a rank-2 geometric tensor</strong>: the Wigner-$D$ rotation action on color reduces to matrix conjugation, so position, covariance and color can all be embedded in one $\mathfrak{gl}(3)$ space and processed $SE(3)$-equivariantly, without Clebsch–Gordan tensor products.</p>

<h2 class="pj-h">Why it matters</h2>

A scene representation is only as trustworthy as its behaviour under a change of viewpoint. Geometry in 3DGS transforms lawfully; appearance, stored as SH coefficients, is usually left to data augmentation. Treating color as geometry closes that gap: a network built on the Unified Matrix Embedding sees geometry and appearance as one object with a single, known transformation law.

<h2 class="pj-h">What we show</h2>

- The isomorphism: the degree-≤2 SH coefficient space is isomorphic to a rank-2 tensor space, and the Wigner-$D$ action becomes conjugation by the rotation matrix.
- The Unified Matrix Embedding: all Gaussian properties map into a common $\mathfrak{gl}(3)$ space, so a single equivariant backbone processes them together — the same Lie-algebraic machinery as [Reductive Lie Neurons](https://arxiv.org/abs/2510.22984) (ICML 2026).
- Robustness and data efficiency on object-level vision and on action-conditioned scene modelling under camera transformations, against equivariant and non-equivariant baselines.

<h2 class="pj-h">Where it leads</h2>

E3DGS is the geometry half of a longer line: a Gaussian world model whose dynamics are rigid-body pose updates on the splats themselves ([Pushing Gaussians](/projects/pushing-gaussians/)), and, at TRI, a persistent Gaussian memory for video world models ([AnyWorld](/projects/anyworld/)).

<!-- TODO(chankyo): add the paper's teaser figure at assets/img/projects/e3dgs_teaser.png and set `img:` in the front matter -->

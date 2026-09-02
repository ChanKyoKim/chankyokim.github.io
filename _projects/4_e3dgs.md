---
layout: page
title: E3DGS
description: Unified geometric–photometric equivariance for 3D Gaussian Splatting — low-degree spherical-harmonic color is algebraically a geometric tensor.
importance: 4
category: geometry
permalink: /projects/e3dgs/
---

<p class="text-muted">
Chankyo Kim, Maani Ghaffari · University of Michigan, 2026 · <a href="https://arxiv.org/abs/2607.15536">arXiv 2607.15536</a> · in submission (ICLR 2027)
</p>

**One sentence.** Rotation-equivariant processing of 3D Gaussian Splatting has always had to treat color as a separate signal. We prove it does not: photometry, for spherical harmonics up to degree 2, is **algebraically isomorphic to a rank-2 geometric tensor**, so the Wigner-$D$ rotation action on color reduces to matrix conjugation and every Gaussian attribute — position, covariance, and color — can be embedded in one $\mathfrak{gl}(3)$ space and processed $SE(3)$-equivariantly without Clebsch–Gordan tensor products.

## Why it matters

A scene representation is only as trustworthy as its behaviour under a change of viewpoint. Geometry in 3DGS transforms lawfully; appearance, stored as SH coefficients, is usually left to data augmentation. Treating color as geometry closes that gap: a network built on the **Unified Matrix Embedding** sees geometry and appearance as one object with a single, known transformation law.

## What we show

- **The isomorphism.** The degree-≤2 SH coefficient space is isomorphic to a rank-2 tensor space; the Wigner-$D$ action becomes conjugation by the rotation matrix.
- **Unified Matrix Embedding.** All Gaussian properties map into a common $\mathfrak{gl}(3)$ space, so a single equivariant backbone processes them together — the same Lie-algebraic machinery as [Reductive Lie Neurons](https://arxiv.org/abs/2510.22984) (ICML 2026).
- **Robustness and data efficiency** on object-level vision and on action-conditioned scene modelling under camera transformations, compared with existing equivariant and non-equivariant baselines.

## Where it leads

E3DGS is the geometry half of a longer line: a Gaussian world model whose dynamics are rigid-body pose updates on the splats themselves — see [Pushing Gaussians](/projects/pushing-gaussians/) — and, at TRI, a persistent Gaussian memory for video world models — see [AnyWorld](/projects/anyworld/).

<!-- TODO(chankyo): add the paper's teaser figure at assets/img/projects/e3dgs_teaser.png and set `img:` in the front matter -->

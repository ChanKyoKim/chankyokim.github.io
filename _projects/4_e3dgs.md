---
layout: page
title: E3DGS
description: What is a good latent for a 3D Gaussian? One compact gl(3) embedding carries position, covariance and color together, so a single SE(3)-equivariant network processes a splat — no Clebsch–Gordan tensor products.
result: Color up to SH degree 2 is a rank-2 tensor · one embedding, one backbone, one transformation law for geometry and appearance.
status: arXiv 2026 · in submission (ICLR 2027)
importance: 5
category: geometry that moves
permalink: /projects/e3dgs/
---

<p class="pj-meta">
Chankyo Kim, Maani Ghaffari · University of Michigan, 2026 · <a href="https://arxiv.org/abs/2607.15536">arXiv 2607.15536</a> · in submission (ICLR 2027)
</p>

<p class="pj-lede">3D Gaussian Splatting is a good scene representation and an awkward input to a neural network: each Gaussian is a bundle of quantities — position, covariance, spherical-harmonic color — that transform under different rules, and equivariant architectures have handled them with separate streams and Clebsch–Gordan tensor products. E3DGS asks what a good latent for a Gaussian looks like. The answer rests on one observation: spherical-harmonic color up to degree 2 is <strong>algebraically isomorphic to a rank-2 geometric tensor</strong>, so the Wigner-$D$ rotation action on color reduces to matrix conjugation. Position, covariance and color can then be embedded in one $\mathfrak{gl}(3)$ space and processed by a single $SE(3)$-equivariant network.</p>

<h2 class="pj-h">Why it matters</h2>

Two things follow. The architecture gets simpler and cheaper: one matrix-valued embedding per Gaussian, one backbone, no tensor-product layers — the Lie-algebraic machinery of [Reductive Lie Neurons](https://arxiv.org/abs/2510.22984) applied directly. And the representation becomes trustworthy under a change of viewpoint: geometry in 3DGS already transforms lawfully, while appearance, stored as SH coefficients, was left to data augmentation. Treating color as geometry closes that gap, so a network sees geometry and appearance as one object with a single, known transformation law.

<h2 class="pj-h">What we show</h2>

- The isomorphism: the degree-≤2 SH coefficient space is isomorphic to a rank-2 tensor space, and the Wigner-$D$ action becomes conjugation by the rotation matrix.
- The Unified Matrix Embedding: all Gaussian properties map into a common $\mathfrak{gl}(3)$ space, so a single equivariant backbone processes them together — the same Lie-algebraic machinery as [Reductive Lie Neurons](https://arxiv.org/abs/2510.22984) (ICML 2026).
- Self-supervised pre-training on 3D data: masked prediction over the splats in the unified embedding, with no labels — the representation is learned from the Gaussians themselves and inherits their transformation law.
- Robustness and data efficiency on object-level vision and on action-conditioned scene modelling under camera transformations, against equivariant and non-equivariant baselines.

<h2 class="pj-h">Where it leads</h2>

E3DGS is the geometry half of a longer line: a Gaussian world model whose dynamics are rigid-body pose updates on the splats themselves ([the Gaussian world model](/projects/gaussian-world-model/)), and, at TRI, a persistent Gaussian memory for video world models ([AnyWorld](/projects/anyworld/)).

<!-- TODO(chankyo): add the paper's teaser figure at assets/img/projects/e3dgs_teaser.png and set `img:` in the front matter -->

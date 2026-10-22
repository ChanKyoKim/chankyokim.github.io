---
layout: page
title: projects
permalink: /projects/
description: Multimodal reasoning, robot learning, and geometric representations — with demonstrations and measured outcomes.
nav: true
nav_order: 3
pillars:
  - category: trained in the loop
    label: Post-training with RL
    blurb: Learn from execution and improve the reasoning around it. Diffusion-policy RL and multimodal guidance connect post-training to closed-loop behavior.
  - category: geometry that moves
    label: Geometry for robots
    blurb: Representations and learned measurements that transform lawfully as the world does — and, on top of them, dynamics as rigid-body motion on the splats, planned through in closed loop.
---

<!-- pages/projects.md -->
<div class="projects">
{% for p in page.pillars %}
  {% assign slug = p.category | slugify %}
  {% assign categorized = site.projects | where: "category", p.category | sort: "importance" %}
  <section class="pj-section" id="{{ slug }}">
    <div class="pj-section-head">
      <div class="eyebrow">{{ p.label }}</div>
      <h2>{{ p.category | capitalize }}</h2>
      <p>{{ p.blurb }}</p>
    </div>
    {% for project in categorized %}
      {% if project.img %}
        <a class="pj-feature{% if project.hero_layout == 'wide' %} wide{% endif %}" href="{{ project.url | relative_url }}">
          <div class="media">
            <img src="{{ project.img | relative_url }}" alt="{{ project.title }}" loading="lazy">
          </div>
          <div class="body">
            {% if project.status %}<div class="status">{{ project.status }}</div>{% endif %}
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
            {% if project.result %}<p class="result">{{ project.result }}</p>{% endif %}
            <span class="more">Read the project →</span>
          </div>
        </a>
      {% else %}
        <a class="pj-feature text" href="{{ project.url | relative_url }}">
          <div class="body">
            {% if project.status %}<div class="status">{{ project.status }}</div>{% endif %}
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
            {% if project.result %}<p class="result">{{ project.result }}</p>{% endif %}
            <span class="more">Read the project →</span>
          </div>
        </a>
      {% endif %}
    {% endfor %}
  </section>
{% endfor %}
</div>

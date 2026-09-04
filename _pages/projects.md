---
layout: page
title: projects
permalink: /projects/
description: World models that remember, act, and hold up in the real world — three lines of work, one stack.
nav: true
nav_order: 3
pillars:
  - category: worlds that remember
    label: Foundation world models
    blurb: A video world model forgets what leaves its context window. Give it a persistent, renderable 3D memory and it keeps seeing what it has already seen — and the scene it builds can be handed to other systems.
  - category: trained in the loop
    label: Post-training with RL
    blurb: Imitation gives a policy the average of what it saw. Reinforcement learning in closed loop lets it improve on its own rollouts — and forces an honest accounting of how often it succeeds.
  - category: geometry that moves
    label: Geometry for manipulation
    blurb: Dynamics as rigid-body motion on the splats, planned through in closed loop, on representations that transform lawfully as the world does.
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
            {% if project.hero_video %}
              <video src="{{ project.hero_video | relative_url }}" autoplay loop muted playsinline poster="{{ project.img | relative_url }}"></video>
            {% else %}
              <img src="{{ project.img | relative_url }}" alt="{{ project.title }}">
            {% endif %}
          </div>
          <div class="body">
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
            {% if project.result %}<p class="result">{{ project.result }}</p>{% endif %}
            <span class="more">Read the project →</span>
          </div>
        </a>
      {% endif %}
    {% endfor %}
    {% assign textonly = categorized | where_exp: "item", "item.img == nil" %}
    {% if textonly.size > 0 %}
      <ul class="pj-list">
      {% for project in textonly %}
        <li><a href="{{ project.url | relative_url }}">{{ project.title }}</a><span class="sep">—</span>{{ project.description }}</li>
      {% endfor %}
      </ul>
    {% endif %}
  </section>
{% endfor %}
</div>

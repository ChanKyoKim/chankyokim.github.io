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
    blurb: A video world model forgets what leaves its context window. Give it a persistent, renderable 3D memory and it keeps seeing what it has already seen — and can hand that scene to other systems.
  - category: trained inside the model
    label: Post-training with RL
    blurb: A world model earns its keep when policies are trained and judged inside it. The verdict has to survive the trip back to the real robot.
  - category: geometry that moves
    label: Geometry for manipulation
    blurb: Dynamics as rigid-body motion on the splats, planned through in closed loop — resting on representations that transform lawfully as the world does.
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
      {% if forloop.first %}
        <a class="pj-feature{% if project.hero_layout == 'wide' %} wide{% endif %}" href="{{ project.url | relative_url }}">
          <div class="media">
            {% if project.hero_video %}
              <video src="{{ project.hero_video | relative_url }}" autoplay loop muted playsinline poster="{{ project.img | relative_url }}"></video>
            {% elsif project.img %}
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
    {% if categorized.size > 1 %}
      <ul class="pj-list">
      {% for project in categorized offset:1 %}
        <li><a href="{{ project.url | relative_url }}">{{ project.title }}</a><span class="sep">—</span>{{ project.description }}</li>
      {% endfor %}
      </ul>
    {% endif %}
  </section>
{% endfor %}
</div>

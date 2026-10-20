---
layout: page
title: notes
permalink: /blog/
description: Research notes on world models, spatial reasoning, and learning through execution.
nav: true
nav_order: 4
---

{% for post in site.posts %}

<article class="research-next">
  <p class="research-eyebrow">{{ post.date | date: "%B %Y" }}</p>
  <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
  <p>{{ post.description }}</p>
  <a href="{{ post.url | relative_url }}">Read the note →</a>
</article>
{% endfor %}

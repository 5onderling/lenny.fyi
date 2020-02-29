---
layout: views/base.njk
title: Blogroll
nav: true
---

<article>

# {{ title }}

Inspired by [Max Böck](https://mxb.dev/blogroll/).

Here I show off the blogs I read the most, and from them I learn the most. Currently, I'm discovering new interesting blogs, like on a daily basis, so this list is most probably going to grow.

</article>

<div class="cards" style="margin-top: 5rem;">
  {%- for blog in blogs | sort(false, false, 'name') %}
    <div class="card project blog">
      <img class="blog__avatar" src="https://avatars.io/twitter/{{ blog.twitter }}/medium" width="64" height="64" alt="a picture of {{ blog.name }}" />
      <h3>{{ blog.name }}</h3>
      <a href="{{ blog.url }}" class="project__link">{{ blog.url | replace("https://", "") }}</a>
      <p>{{ blog.text }}</p>
    </div>
  {%- endfor %}
</div>

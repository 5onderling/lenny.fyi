---
layout: views/base.njk
title: Blogroll
nav: true
order: 3
---

<article>

# {{ title }}

Inspired by [Max Böck](https://mxb.dev/blogroll/).

Here I show off the blogs I read the most, and from them I learn the most. Currently, I'm discovering new interesting blogs, like on a daily basis, so this list is most probably going to grow.

</article>

<div class="cards" style="margin-top: 5rem;">
  {%- for blog in blogs | sort(false, false, 'name') %}
    <div class="card">
      <img class="card__avatar" src="{{ blog.profileImageUrl }}" width="64" height="64" alt="a picture of {{ blog.name }}" />
      <h3>{{ blog.name }}</h3>
      <a href="{{ blog.url }}" class="card__link">{{ blog.url | replace("https://", "") | replace("www.", "") }}</a>
      <div class="card__text">
        <p>{{ blog.text }}</p>
      </div>
    </div>
  {%- endfor %}
</div>

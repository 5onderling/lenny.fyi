---
layout: views/base.njk
title: Blogroll
nav: true
order: 2
---

# {{ title }}

Inspired by [Max Böck](https://mxb.dev/blogroll/).

Here I show off the blogs I read the most, and from them I learn the most. Currently, I'm discovering new interesting blogs, like on a daily basis, so this list is most probably going to grow.

<ul class="page-list">
  {%- for blog in blogs | sort(false, false, 'name') %}
    <li class="page-list__item">
      <a href="{{ blog.url }}" class="page-list__link">{{ blog.icon | safe }} {{ blog.name }} ({{ blog.url | replace("https://", "") | replace("www.", "") }})</a>
    </li>
  {%- endfor %}
</ul>

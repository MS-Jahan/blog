---
title: Archive
layout: page
permalink: /archive/
---

<div class="archive-page" markdown="1">

## All Posts by Year

{% assign postsByYear = site.posts | group_by_exp:"post", "post.date | date: '%Y'" %}
{% for year in postsByYear %}

### {{ year.name }}
<span class="year-count">{{ year.items.size }} post{% if year.items.size != 1 %}s{% endif %}</span>

<div class="archive-list">
{% for post in year.items %}
<div class="archive-item">
  <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %-d" }}</time>
  <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
  {% if post.tags and post.tags.size > 0 %}
    <div class="archive-tags">
      {% for tag in post.tags limit:3 %}
        <span class="archive-tag">{{ tag }}</span>
      {% endfor %}
    </div>
  {% endif %}
</div>
{% endfor %}
</div>

{% endfor %}

</div>

<div class="archive-stats">
  <h3>Statistics</h3>
  <ul>
    <li><strong>Total Posts:</strong> {{ site.posts.size }}</li>
    <li><strong>First Post:</strong> {{ site.posts.last.date | date: "%B %-d, %Y" }}</li>
    <li><strong>Latest Post:</strong> {{ site.posts.first.date | date: "%B %-d, %Y" }}</li>
  </ul>
</div>

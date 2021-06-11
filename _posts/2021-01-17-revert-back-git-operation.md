---
layout: post
current: post
image: assets/images/git-revert-back.png
navigation: True
title: Revert Back To Previous Commit Without History 
date: 2020-01-17 17:19:00
tags: [git, tech, coding]
class: post-template
subclass: 'post'
---

I've faced this many times that I made a mistake (added credentials or something else to code) and I deleted the entire repository on Github. 

The two commands below can be used to solve this problem:

{% highlight bash %}
git reset --hard <commit_hash>
git push origin main --force
{% endhighlight %}

You can find the **commit_hash** in commit history of your repository.
---
layout: post
current: post
image: assets/images/github.jpeg
navigation: True
title: Git Clone & Push From Command Line
date: 2020-01-17 19:49:00
tags: [git, coding, tech]
class: post-template
subclass: 'post'
---

Why use a heavy electron app for nothing?

I've used Github Desktop before using the command line. Today I've tried using git from terminal and seems I've got this.

Here are the usual command one should care about mostly:

- Let's clone a repository first!
{% highlight bash %}
git clone https://github.com/user/repo
{% endhighlight %}

- Change directory to project folder
{% highlight bash %}
cd repo
{% endhighlight %}

- Make changes to files as usual.
- Add all the files to local git.
{% highlight bash %}
git add .
{% endhighlight %}

- Add your name and email.
{% highlight bash %}
git config user.email "useremail@example.com"
git config user.name "username"
{% endhighlight %}

- Add a commit message.
{% highlight bash %}
git commit -m "message"
{% endhighlight %}

- Push to Github.
{% highlight bash %}
git push
{% endhighlight %}

<a target="_blank" href="https://www.earthdatascience.org/workshops/intro-version-control-git/basic-git-commands/">This article</a> was so useful. Cover image is from [Wired](https://www.wired.com/story/microsoft-github-code-moderation/).


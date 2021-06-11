---
layout: post
current: post
image: assets/images/google-assistant.png
navigation: True
title: Google Assistant Python API Implementation
date: 2020-01-24 16:25:00
tags: [google, assistant, AI, fun project]
class: post-template
subclass: 'post'
---

Recently, I was working with a Facebook bot (as a hobby, actually) and thought what if I could add Google Assistant in that bot!

I was using Python. I went through Google's offical documentation. It was alright. But I was creating a project in [console.actions.google.com](https://console.actions.google.com/) and then using credentials for another project in [console.developers.google.com](https://console.developers.google.com/).

After a lot headache, I found a video on YouTube. It was the same thing. I tried watching second time, and then realized my problem. The problem was between 2:59 to 3:03 according to that video.

Here is the video:

<iframe width="560" height="315" src="https://www.youtube.com/embed/D6LRa0M4LBI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

The video here describes how to use Google Assistant with voice. In my bot system, I've added text input and output system. You can have some ideas [here](https://github.com/googlesamples/assistant-sdk-python/tree/master/google-assistant-sdk/googlesamples/assistant/grpc). Also, I've used [this file](https://github.com/googlesamples/assistant-sdk-python/blob/master/google-assistant-sdk/googlesamples/assistant/grpc/textinput.py) for text input and output.
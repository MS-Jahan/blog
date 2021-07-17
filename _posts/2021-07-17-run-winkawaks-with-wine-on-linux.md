---
layout: post
current: post
image: assets/images/winkawks.png
navigation: True
title: Run WinKawaks on Linux (NeoGeo, Capcom)
date: 2020-01-17 19:49:00
tags: [linux, gaming, arcade]
class: post-template
subclass: 'post'
---

I wanted to feel nostalgic by playing some childhood NeoGeo games on Linux. I downloaded [WinKawaks](http://www.winkawaks.org/) and tried running with wine `wine WinKawaks.exe`. But it didn't run and no output was on terminal.

It turned out that installing [Wine](https://www.winehq.org/) was not enough. I had to install [Winetricks](https://github.com/Winetricks/winetricks) and then install Visual C++ Runtime 2008 (vcrun2008). Then it was running perfectly!

By the way, I've tested this using `wine-staging 6.12`, but the stable version (which is just `wine`) should work fine.
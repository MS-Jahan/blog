---
layout: post
current: post
navigation: True
title: Show Battery Status on Linux
date: 2023-04-11 11:49:00
tags: [linux, bluetooth]
class: post-template
subclass: 'post'
---

I've searched how to do that and finally found it. [Source](https://stackoverflow.com/a/70460138/12804377) (seriously, check it out if you're using Arch)

On Arch Linux, it should be enough to run:
```
cp /usr/lib/systemd/system/bluetooth.service /etc/systemd/system/
sed -i -r 's/ExecStart=.+/& -E/' /etc/systemd/system/bluetooth.service
systemctl daemon-reload
systemctl restart bluetooth
```

And the headset battery level should appear. To get the battery level programatically, you can then use UPower's DBus API.


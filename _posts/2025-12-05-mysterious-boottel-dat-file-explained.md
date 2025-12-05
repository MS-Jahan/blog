---
layout: post
current: post
navigation: True
title: The Mysterious bootTel.dat File - Not a Virus, Just Windows Being Windows
date: 2025-12-05 16:00:00
tags: [windows, linux, filesystem, ntfs]
class: post-template
subclass: 'post'
---

Found a suspicious `bootTel.dat` file lurking in my drive root. Time to investigate.

## The Discovery

While browsing my NTFS drive on Linux, I spotted a hidden 112-byte file called `bootTel.dat`. Naturally, my first thought: *"Is this malware?"*

Spoiler: It's not. But the journey to find out was fun.

## The Investigation

Ran `xxd` on it and found some interesting bytes:

```
00000000: 7000 0000 3832 2e20 4555 ...  p...82. EU...
00000020: 6e00 7400 6600 7300 ...      n.t.f.s.
```

That `n.t.f.s.` in UTF-16LE encoding was a dead giveaway. This is Windows territory.

## What bootTel.dat Actually Is

After some research, turns out:

- **Created by:** `autochk.exe` - Windows' disk checking utility
- **Purpose:** Telemetry data from filesystem checks
- **When:** After improper shutdowns, power loss, or chkdsk operations

Basically, Windows writes this file to say *"Hey, I checked this drive for errors."* It's Windows' way of leaving a sticky note.

## Is It Safe to Delete?

Yes. Windows won't complain. Your drive won't explode. It's just metadata about a past disk check.

## Why Did It Appear?

If you see this file, your drive probably:
1. Got unplugged without proper ejection (oops)
2. Survived a power outage
3. Had Windows run a repair on it

Think of it as a receipt for a doctor's visit your drive never asked for.

## TL;DR

`bootTel.dat` = Windows' filesystem doctor's note. Not malware. Safe to delete. Move along, nothing to see here.

*The real mystery is why Windows doesn't clean up after itself.*

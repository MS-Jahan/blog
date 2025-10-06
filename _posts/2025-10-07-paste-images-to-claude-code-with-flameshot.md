---
layout: post
current: post
navigation: True
title: How to Paste Images to Claude Code with Flameshot on Linux
date: 2025-10-07 01:15:00
tags: [linux, flameshot, claude-code, xfce, screenshot]
class: post-template
subclass: 'post'
---

If you're using Flameshot for screenshots on Linux (especially with xfce4-terminal) and struggling to paste images directly into Claude Code, here's a simple fix that doesn't require switching to other screenshot tools.

## The Problem

When taking screenshots with Flameshot and trying to paste them into Claude Code using Ctrl+V, the image doesn't appear. This is because Flameshot copies the raw image data to the clipboard, but Claude Code expects a file path or a different format.

## The Solution

Instead of switching screenshot tools, you can configure Flameshot to automatically save images to a location and copy the file path to clipboard. This way, when you paste, Claude Code receives the file path and can load the image - similar to drag and drop.

### Steps to Fix

1. Open Flameshot configuration settings
2. Navigate to the **General** tab
3. **Check** the following two options:
   - ☑️ Save image after copy
   - ☑️ Copy file path after save
4. Set your **Save Path** (e.g., `/home/sjs/Pictures/Screenshots`)
5. Apply the changes

![Flameshot Configuration Settings](/assets/images/paste-images-to-claude-code-with-flameshot.png)

### How It Works

With these settings enabled, when you:
1. Take a screenshot with Flameshot
2. Click the copy button
3. The image gets saved to your configured location
4. The file path is copied to your clipboard
5. Press Ctrl+V in Claude Code
6. The image is pasted successfully

This behaves exactly like drag-and-drop, but with the convenience of keyboard shortcuts.

## Why This Works

By checking these options, Flameshot changes its behavior to save the file first and then copy the path rather than copying the raw image data. Claude Code can then read the file path from the clipboard and load the image, just as it would with a drag-and-drop operation.

No need to switch to other tools like [gshot-copy](https://github.com/thecodecentral/gshot-copy) - your existing Flameshot setup works perfectly!

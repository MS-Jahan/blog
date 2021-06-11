---
layout: post
current: post
image: assets/images/google-meet.png
navigation: True
title: Google Meet Auto Admit With And Without Extension
date: 2020-01-17 19:49:00
tags: [coding, tech]
class: post-template
subclass: 'post'
---
Google Meet doesn't have auto admit feature officially like Zoom. But there are workarounds.

## With Extension
There are some extensions in Chrome Web Store for this. [Here](https://chrome.google.com/webstore/detail/google-meet-auto-admit/himoglbojlbloilekjcohhfakhjcibnj?hl=en) is an extension for example.

## Without Extension
1. Open Google Meet and join a meeting.
2. Right click in browser window and click on <b>Inspect</b>, <b>Inspect Element</b> or something similar found in your browser.
3. A new window will pop up from the bottom of the screen. If you're using a Chromium-based browser (Chrome, Opera, Brave, Vivaldi etc), you'll find tabs like *Elements*, *Console*, *Sources* etc. Click on **Console** tab. You'll also find **Console** tab in Firefox.
4. Now paste this code inside **Console** tab and hit enter.

{% highlight javascript %}
function checkAdmit(){
    try {
        document.getElementsByClassName('CwaK9')[3].click();
    } catch {
        console.log("Tried");
    }
    var t = setTimeout(checkAdmit, 5000);
}

checkAdmit();
{% endhighlight %}

It'll be hard to copy-paste this code everytime. You can add an bookmark from bookmark manager and inside url field, type `javascript:` and then the full code.

From now on, you just have to click on the bookmark button you created after joining the meeting and the rest will do the code. Enjoy!
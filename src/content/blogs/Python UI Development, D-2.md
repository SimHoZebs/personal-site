---
published: 2019-12-28
---

## 2019/DEC/28th (Day 2)

I learned a bit of the widgets last night, and today I tried and see if I could separate the widget initialization in to its own method from `MainWindow.__init__()`. Long story short, it didn’t work. Not only did it not work, my whole UI didn’t launch at all, as if all the other widget I didn’t even touch also died somehow. I don’t know - I’ll think more about it at some point, but it doesn’t seem necessary anyway.

The tutorial isn’t as great as I thought it was. It’s on me for expecting tutorials to explain everything, but there were quite a bit where I had to figure by myself.
![image](https://64.media.tumblr.com/46bf30d3d898136b483c137495ea5f5c/73aa866950e5d4de-12/s540x810/b932c07c050ef5909073c063bec628b66fe7384d.png)

Here’s an example. The entire initialization process is commented out as if we should know what to write. The tutorial never taught us what to write for Dialogs.

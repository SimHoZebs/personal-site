---
published: 2020-08-03
tags: ["software dev log"]
---

It’s been a bit more than two weeks, but still this is a good time to write this. I don’t have much to say for most of the weeks, but I made some big progress in the last few days and I’m excited to share it.

Here are the topics of discussion for today’s post:

1. Bank Account Interest Calculator Development
2. Kivy Module Study

## 3. Bank Account Interest Calculator Development

_TL;DR: I give up._

I spent more time fixing the errors that appeared on the graph. There were only two which were fairly easy to figure out and fix. By JUL 20th, I was partially confident that the project was complete. On the next day, I tried adding another subject with 30 days for `payout_interval` and 2% `interest_rate`. And of course, I found another error, but this error was critical. So critical, I decided to end the project.

To quickly explain how the program decides what value the next day is – It figures out by comparing each subject’s `payout_interval`.

- For example, if I have subjects Alpha, Bravo, and Charlie – and their respective `payout_interval` as A, B, C – I first make sure `A >= B >= C`.
- This is because I check `if day + A > B * iteration[B]`.
- If false, it then checks `if day + A > C * iteration[C]`.
- If false again, then `day = day + A` must be true.
- However, `if day + A > C * iteration[C]` was true, `day = C*iteration[C]`, because if we instead `day + A` I’d go past Bravo’s payout interval.

The error lies right here; It is possible that `day + A > C_iteration[C] > B_iteration[B]`, but the code doesn’t check this. If I rewrite it to check, it’ll spend much of its time figuring out what the day should be instead of drawing the graph. At this point it may be faster to add days by the lowest common factors of the `payout_intervals` and update the graph accordingly. The whole project is meaningless. I’m done.

As a whole, this was a waste of time. Surely it would’ve been better if I spent time doing something else, but I can’t say I got nothing out of it.

## 2. Kivy Module Study

_TL;DR: Made big progress, can make pingpong.exe now. But I’m dropping it._

After giving up on the project and resting from the whole thing for a bit, I got back to studying the Kivy module. I decided to watch a [different tutorial](https://www.youtube.com/playlist?list=PLhTjy8cBISEpobkPwLm71p5YNBzPH9m9V) rather than [Kivy Tutorial by Tech with Tim](https://www.youtube.com/playlist?list=PLzMcBGfZo4-kSJVMyYeOQ8CXJ3z1k7gHn), because I wasn’t satisfied with the explanations, and the new tutorial had more episodes. Soon I realized he didn’t give much more explanations, and the latter was because each episode was about 5 minutes long. I might just be stupid, I don’t know. But this tutorial was much easier to understand because of the simplicity of the project (Ping Pong). It was [copied from the Kivy wiki](https://kivy.org/doc/stable/tutorials/pong.html) too, which I referred for a more detailed explanation.

The biggest issue I had with the study was understanding what goes in .kv, and what goes in .py. Now I know that .kv is kind of like a .html, and .py is like the .js for it. I don’t know why it was hard to see that in the previous tutorial; perhaps both of them helped in reaching this understanding. By this day, AUG 3rd, I finished the Ping Pong tutorial and learned how to turn it into an executable file through PyInstaller.

![image](https://i.gyazo.com/b1f4948bcb25f6f6c2a4b29521182515.png)
woops, I shipped it with the small dot I placed as a debugger to find the collision point of the ball.

Despite this progress, I decided to drop Kivy Study as well indefinitely. The reason comes from my story on how I decided to learn Kivy (That’d also start from how I started learning Python, but we’ll skip that bit). It’s been over a year since my first “Hello, World!” in Python (I attempted to learn other languages before), and I’ve insisted on utilizing it for something. The problem was that I didn’t have anything I wanted to do with it yet. I didn’t have a particularly strong interest in data analysis and AI development that it’s so well known for, nor was I sure that my hardware and I could handle it. I knew it’s also popular for web framework (Flask), web scraping (Requests), and just as a scripting tool, but nothing really caught my attention. This was an issue, because I knew the language, but didn’t have anything I want to do with it.

After a bit more thought, I believed whatever I do with Python, I’ll probably want an UI for it. And that’s why I’ve been studying Kivy.

It didn’t take very long for such simple and fragile reasoning to frustrate me in lack of motivation. Part of me felt that it wasn’t worth it. What do I really wanna do? Yes, most likely, if I want a job in programming I’d probably get one that utilizes Python. All the things that Python is popular for sounds quite interesting on the surface. I know I said none of them caught my attention, but the key difference is that job gives a goal to achieve with it, whereas right now, I don’t have anything I want to try with it personally. Maybe if I start learning them, I’ll have better ideas about how it can be used and come up with small projects to have fun with. But either way, continuing Kivy isn’t going to work out, or even if it does, I’m not really enjoying it at the moment. And whatever it is, enjoyment is usually the motivation for anything I do.

There’s more to say about this, but that’s all for explaining the end of this study. Perhaps I’ll come back to it at some point, but I believe it’s not something I should be focusing on right now. As for what I should focus on instead, is a serious question I need to answer as soon as possible.

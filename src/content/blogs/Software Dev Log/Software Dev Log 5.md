---
published: 2020-09-01
tags: ["software dev log"]
---

## 2020/AUG/18th - 2020/SEP/1st

Here I am on a streak of being on time. Studies are going smoother everyday, and I'm loving it.

## Table of Content

1. C#
2. Algorithms and Data Structures
3. Studying More efficiently

## 1. C\#

I've spent the 2 weeks mostly focusing on learning the basics of C# through [Mike Dane's tutorial](https://youtu.be/GhQdlIFylQ8), [Microsoft's C# documentation](https://docs.microsoft.com/en-us/dotnet/csharp/), and [Bob Tablor's tutorial](https://youtu.be/FPeGkedZykA?list=WL). Here are some notable things I learn from them.

### a. Making objects for classes

In Python, making an object for a class outside of the script is by importing the script that contains the class, and simple writing `var_name = Class`. In C#, scripts are imported automatically (I was a little confused about how that works and why it works like that, which I'll talk about in another point). An object is created by writing `Class varName = new Class();`. It seems that classes are treated like data types. This makes sense, since what constructors do is describe the object's properties.

### b. Constructors, Namespace, Static container

- Constructor isn't a new concept, but I found out that's what it's called. I always called it initialization, because it's called as `__init__()` in Python.
- Same goes for namespace - In Python, the script name is the namespace by default.
- I don't know if there's a static container equivalent in Python, but I like neat features like these that protect methods from being called from objects.

### c. C# and .NET Core

Beyond the language, I inevitably learned about the language development environment. I wouldn't say I know a lot, but I learned that C# is one of 3 languages supported by .NET Core, an open source, cross platform framework. This is probably very obvious to many people. Framework is a very new term to me, but I've come to understand that it's something that provides an environment where the developer can forget about all the annoying work, and have that work done automatically by the framework. As far as I'm aware, Python doesn't work under any framework, unless the Python interpreter itself can be called as such.

C# script works in a project folder created by .NET Core, which contains all the necessary libraries to run the code (except the standard library, I'm guessing). In order to import libraries out of the standard library, you have to install it to the project folder using a package manager called NuGet. This is different from Python, where the development environment exists completely elsewhere. On one hand, I like Python's approach because multiple projects can share the same environment, whereas in C# each project needs its own environment. On the other hand, C#'s approach seems like it'd be easier to share/distribute the project to a simpler user base since no other than .NET Core and the project needs to be installed. Python would require users to make the environment manually, in the specific version that the project was developed in. Of course, this issue can be avoided using other libraries (Ex. Applications made in Kivy).

The reason I got to learn all this was a very frustrating one. Before knowing all of the above, I simply opened a C# script in an empty folder through VSCode and expected everything to work like things did in Python. For Python, I'd type py scriptName.py to run the script, but I didn't know what to do for C#. (I thought it may be impossible, even, because it's a compiler language. I know that doesn't work as a reason, but it was at the moment for some reason).

I found the [Code Runner extension](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner) which runs C# in the .csx file format. It allowed me to run C# code like a scripting language, which was pretty interesting. But that introduced issues with Omnisense not working properly when .csx and .cs files were in the same folder, and I later found out I couldn't access System.Data.DataTable. It took me more than a day to figure out how everything is supposed to work, and it wouldn't have if I read this in the first place.

I am done with the basics. At least I think I am. I've only watched one full tutorial, and I'm aware there's so much more in the standard library. I've glossed through most of the C# docs tutorial, and I'm watching parts of the Bob Talor's tutorial where he goes over some concepts in more detail.

## 2. Algorithms and Data Structures

This topic was something I wanted to invest time in, and this week I came to decide to treat it as an independent subject and study it parallel with others. For practice, I'm solving problems in [CodeForces](https://codeforces.com/) and reading [The Algorithm Design Manual (amazon link)](https://www.amazon.com/exec/obidos/ASIN/1848000693/thealgorith01-20) for theory. I solved one with [very low difficulty](https://codeforces.com/contest/4/problem/A), and in the process of converting my solution to code for [the second problem](https://codeforces.com/contest/4/problem/B). I haven't even finished the first chapter, but it's already being helpful in coming up with an algorithm for the second question. Especially, the techniques in finding incorrect algorithms helped me to quickly find out that my algorithm wouldn't work or/and isn't efficient, and come up with a better one. I'm excited to find out what more I'll learn in the future.

## 3. Studying More Efficiently

Like I mentioned in the [last Dev Log](./Software%20Dev%20Log%204), I'm reading on computer systems for the most of the morning and afternoon. I wrote notes along with the reading to solidify my understanding and make a reference to more important and notable (ha) information. This is taking way more time than I expected, to a point that I'm not even done with the first chapter yet. I'm dropping the note taking, and switching the highlighting lines in the book and attaching sticky notes to pages that require more information for my understanding.

Productivity tools have been catching my interest lately, especially with my efforts to organize my studies and schedule more effectively. Previously, **Todoist** (mobile app) was the only tool I used, for just knowing what I should be doing the next day.

Now I use **Sectograph** (mobile app) for better visualization of my schedule. I tried to use **Trello** to draw a bigger picture of my studies, but it didn't quite visualize it well enough. **Notion** takes one step further and displays the extra information on the cards right on the board, without having to click on the cards to see them, such as the check boxes and links. I've been eyeing **Slack**, **Microsoft Teams**, and **Asana** too, but they are more of collaboration tools, which I don't need at the moment.

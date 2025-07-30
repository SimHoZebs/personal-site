---
published: 2020-08-18
tags: ["software dev log"]
---

## 2020/AUG/4th - 2020/AUG/18th

I'm on time again! Well, a day late, but better than taking a month.

I've spent the last two weeks mainly thinking about the direction and the steps I should be taking for this Software Dev Study.

1. Study Direction
2. Unity Engine Study

## 1. Study Direction

I don't know if I mentioned this before, but I'm self teaching everything I say in the logs. As in, I don't go to a school for software development/computer science. I'm actually a stem cell and regenerative biotechnology major. It just turns out that my interest and enjoyment in translating and understanding human-like interaction into code became a very serious hobby I'm exploring to find out whether I'd be interested in applying for a double major/minor it, or keeping it as a hobby. Because of this, I don't have a concrete study direction, and any direction is set through my own research and motivation.

[teachyoruselfcs.com](http://teachyoruselfcs.com/) is where I get the general study plan overview for Computer Science. I'm slowly reading the first chapter of Computer Systems: A Programmer's Perspective by Bryant O'Hallaron in my office whenever I have no work and am not writing this (I have a separate notebook for notes on this). My initial plan was to read about Distributed Systems next, but after rambling for the past few days on this post (which you don't get to see, since they'd be deleted on the final version of this post and show more organized, structured thought process I ended up with.), I might read on it after several other books. Current plan on future reads is on Algorithms and Data Structures > Math for CS > Databases > Languages and Compilers; Subjected to change at any point in time.

Studies off work is the most complicated one, because like I mentioned in the previous topic, I'm not completely sure about what I want to do. In this subject, I'll be listing all the careers/fields that handles programming to a significant degree, and say how I feel about it.

### A. Game Development

Thinking about it, this is how I started programming, and probably for many others. In Year 6, I tried to learn Macromedia Flash to make games. I barely understood what code I was copy-pasting, but I managed to make a local-multiplayer platformer, which my very naive and simplistic sister and brother really enjoyed. Then I tried Java to make Minecraft mods, but that didn't go well at all. I never found interest in game development since then, until my brother and I started learning programming. While I focused on Python, my brother studied Unity. The more I studied, the more I thought programmatically. My brother and I would share each other's thoughts on how we can approach our programming problems. He'd tell me about his thoughts on turning game elements to code, and I'd help thinking through it with him. Now, I play games while simultaneously thinking about how it's coded, and feel the urge to attempt a clone.

Enough with the background - what are the perks of learning game development? Well, translating game elements to code and vice versa seems challenging, and I love myself a challenge. I'm fascinated at the game design elements that don't directly contribute to gameplay, but become essential in making a good game. For example, smoothness and variety of animation, art style, and user-friendly interface - some subtle things that players would normally dismiss, but is critical to how enjoyable a game is. Mastering these techniques seem quite interesting and fun. Also, the idea of working with my brother.

Other than the reason I stuck with Python, the thing that deters me from jumping to game development is the low chance of making anything out of it in the future. It's so much less likely for me to create a game that's interesting enough with enough users making me enough money for a living, compared to getting a job in Python with a field that's only bound to grow. I guess I could join a game development company instead, which shouldn't trouble me from financially supporting myself as much (In this case, I will NOT join a big company like Blizzard, EA, Ubisoft. Not only is it harder than smaller companies, but I'll not enjoy such a restricted programming environment. Coffee Stain size is where I'd be comfortable). But now that I think about it, I guess I shouldn't think much about that far into the future. In the end, they'd all be experience towards becoming a better programmer in general.

### B. Mobile App Development

There's not many things that pull me to this field. I enjoy learning user-friendly interfaces and aesthetically pleasing designs, so there's some motivation in putting some practice. Especially with Flutter becoming very popular, I have some interest in trying it out. I can make clones of apps, and even improve some I'm annoyed with. Even though that sounds like a significant amount of motivation, it isn't. I'm willing to learn this some other time, and don't feel like taking it any further than a hobby.

### C. Website/Web App Development

I'm not that informed about this field, but I know it's extremely popular. Everyone wants a damn website nowadays, especially with the increasing number of startups. This is a field that I think is the easiest to enter and earn decently out of all the fields I've mentioned (via freelancing). User-friendly design and aesthetics are the most important skills in web development, and like I said before, I have interest in that. I'd need a better understanding of the internet, and many elements that make up online interaction. Those are areas I am very noob at, including the areas I'm not even aware of.

The biggest deterrent is the lack of problem solving. Of course, web app development would give that challenge, but my baseless instinct tells me that this field would be for website development for the vast majority of the time, which I believe is mainly a lot of work in 'design', rather than 'programming'.

### D. The Rest

By this I mean Data Analysis, AI/Deep Learning, Cybersecurity, Cloud Computing, Network, etc. Each field is very large and important, and bound to only get larger. They are highly focused on programmatic problem solving, and I'm a big fan of that. Like I said, Data Analysis or AI/Deep Learning is probably the field I'd get a job in, but I'm not that interested in studying it just yet.

After weeks of rewriting many paragraphs, this concludes that I should try game development. It was stupid of me to worry about diving too deep in to a field I'm not sure I'll succeed or end up in, because the whole point of Software Dev Study is to figure that out. There is no waste.

## 2. Unity Engine Study

I tried this engine out back in December, only to drop it in 2 days. I wasn't a fan of its 'code the engine, design through UI' approach, and wanted to just code instead. Working with Kivy gave me a better understanding of the benefits of an approach like this; distinctively splitting different elements of game development to make the process more flexible, readable, and approachable.

I started with a Unity2D course on Udemy (As for what I think about Udemy, I think it's great, but I'd always suggest trying YouTube tutorials first. If you are ever purchasing a course here, always do it on a discount) my brother purchased long ago. It's a great course that focuses a lot on explaining the code and features of Unity Engine. It also goes over some basics of game design, which are always welcoming.

Below are some notes I took while learning;

## C# Related Notes

- `var_type[] list_name {stuff, in, list}`;
  Makes an array of variable type of undefined size.

- `var varName = var_defining_parameter;`
  variables can be declared as var, if the variable type is known from assignment.

- variables without public/private declaration are automatically private.

Float, double, decimal.

## Unity Related Notes

- `[SerializeField] var_type varName;`
  creates a field in Unity engine that can be filled with variable type specified.

- `[CreateAssetMenu(menuName = "Foo")]`
  `public class Bar: ScriptableObject`

  Creates an asset type called "Foo" for 'Bar'.
  Classes inheriting MonoBehaviour cannot have CreateAssetMenu.
  Methods made under this class are methods that can be called on any asset of this type.

## Questions

Difference between public method(), private method(), and method()

Difference between MonoBehaviour and ScriptableObjects

---

I've followed through the Text101 and Number Wizard project fairly easily, but it made me realize I need to focus on learning C# first. Some new functions were easy to understand thanks to my prior understanding of Python, but it's still very different. For example, importing class from other scripts and using them was so confusing until recently. I'm currently taking a crash course, and hope to recreate many of the small projects I did in Python before jumping to Unity.

I'm glad I took the initiative to study a new language and a completely different field. It's exciting and feels like I'm gaining more knowledge in programming languages. For example, concepts such as data tables and namespaces are pretty new. In a way, C# feels like a lower level language than Python, considering its a statically typed language. I'll update you with my progress in the next 2 weeks.

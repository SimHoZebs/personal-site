## The Hunt

I applied online on October 19th, took the OA on December 18th, interviewed on February 7th and got the offer on the 13th.

This was the 4th application I submitted to Amazon throughout my college. In fact, I put another one on November, not expecting much to come out of it. It was just one of many applications I submitted over the Fall semester in hopes of landing something.

I didn't think much of it when I took the OA as well. I was pleasantly surprised to see a recruiter's name attached to the communication, but that didn't necessarily mean they weren't auto-generated, read-only emails like the rest. Tons of companies have sent out an OA only to never contact me again.

When I was offered to schedule an interview near the end of January, I freaked out. This was (and still is) the only interview I was having for a software engineering role that wasn't an in-campus position or via referral. I had solved less than 20 Leetcode questions in my entire life, let alone gone through a technical interview. I didn't know what STAR method was and never looked into Amazon's Leadership Principles.

![](../../../public/blogs/Pasted%20image%2020251003150243.png)

I spent the week or so before the interview with LeetCode, Gemini, and ChatGPT. I didn't have anyone to help me with mock interviews, but my family was there to hear my doom and gloom; about how I wasn’t going to make it and fail the biggest opportunity. I mean, how was I possibly going to pass the technical portion just having solved **35** LeetCode questions and near-zero experience with interviews? I soon reached a conclusion that, at the very least, I was going to gain a valuable experience and understand how Big Tech conducts interviews.

Then I had my interview. I ended the Chime call, shocked not how difficult it was, but how I absolutely nailed it. It couldn't have been smoother! Sure, my experiences aren't extraordinary, and I didn't noticed the typo with the variable until the interviewer mentioned it, but there was nothing that would fail me. Now I was worried that *if* I didn't get the offer, I would have no idea why.

I waited about 5 days, then sent them a "I have a competing offer, send one now" email, and got one within a few hours.

## The Work

I don't exactly know how much I can talk about my project without getting in trouble. Nothing I did *felt* confidential, but I don't want Amazon coming for my blog posts.

I wasn't presented with a solution to implement. Rather, I was told that the no-code ticketing system the internal teams were using was not designed to scale and that they wanted something better. That's it. Because of this ambiguity, I spent **A LOT** of time figuring out:
- what the problems actually were 
- what problems I could actually solve within my internship
- how to solve them
- what tools exist to implement those solutions
- and how to use them. 

This was quite a unique experience - instead of being told what to do with instructions down to the details, I felt fully responsible for how my project was going to look like. I felt ownership, especially since my team didn't really know what the project was supposed to be until I shaped it into something tangible. It felt weird setting up meetings and leading them as a mere intern, and that feeling honestly never went away. However, the support from my team made it always so worth it.

My team was incredibly helpful throughout the planning, of course. They made sure to understand my pitch as well as I did so they could provide meaningful insights and criticisms. And oh, did they have a lot of questions for me to answer. As my iterated my design document, I was told that I eventually had to figure out when to put my foot down and go with the plan, even if there are hanging comments. Not because I was slow, but because a perfect plan doesn't exist - and if it did, it was certainly not worth the time figuring one out, compared to just implementing something decent. This is where I felt that the purpose of my plan wasn't necessarily to get approval, but as somewhat of a structured announcement as to what I'll be doing. Again, it was up to me when and how the project will be built.

Now for some technical aspect 

here's definitely a silent pressure to prove that you are useful to the manager, and for the manager to show their team shouldn't be the next to be cut down.

Refer to the big OOPs video here

First time programming professionally in Java.

I was surprised by an interesting technical decision within my organization even before my internship officially began: the only approved main database is DynamoDB. Well, technically we _can_ use relational alternatives, but only after an approval of our principal engineers.

This was unexpected, as I always heard that PostgreSQL is the only database any software needs. Schools don't teach them as much. All these database startups like Turso, PlanetScale, Neon, CockroachDB - are all SQL. The reason must be their enterprise-level reliability, scalability, and popularity, no? No one is starting the next MongoDB.

And personally, I hate the lack of schema validation on non-relational databases. I'm forced to filter queried data on the application layer, and foreign key relations between tables are simply intuitive.

Enjoyed a side quest of studying different data stores and database

m happy that I worked in an environment that I had never even imagined before. This was my first time working with Java professionally, let alone with AWS services. I learned strategies and patterns like dependency injection, singleton, and strategy pattern to help build scalable, flexible software that's easy for everyone to maintain. I finally learned what AWS Lambda looks like, and touched many other services like S3, CloudFormation, CloudWatch, DynamoDB, Route53, etc.

I learned to include maintainability and observability in my work not just for myself, but my whole team. There was a lot to take away from the emphasis on metrics and error handling. Learning the ways this organization handled software development and the custom tools built around the processes were fascinating. I'm glad I worked on a project with real impact to users with the product deployed within the 12 weeks. I genuinely feel like I leveled up as a software engineer.

of money you can make at Big Tech really opens your eyes too. I felt comfortable choosing to Another thing I learned is that I should definitely never settle for a specific team. The internship wasn't long enough to learn everything that my team and organization has to offer, but I could see how the work could become boring at some point. Teams are soft-locked into solving their assigned theme of problems. If the problem space you want to work on is irrelevant to your team, you either don't work on it or move to the appropriate team. Your team's tech stack is fixed and consistent for the sake of maximizing on the compounding technical expertise and minimizing maintenance complexities, but that simply means the team's skill set is kept limited. It's challenging to suggest building a service using Go instead of Java, or even Kotlin, or hell, Java 21 instead of 17, without sufficiently persuading people several levels above your pay grade. If I want to keep things exciting for myself, I shouldn't expect the a single team to be the answer to all.
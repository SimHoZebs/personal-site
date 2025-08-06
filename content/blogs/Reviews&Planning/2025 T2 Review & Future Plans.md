2025 T2 is May 1st to August 31st. For this year, major plans and its retrospectives occur every _third_.

## SDE Internship @ AWS

I have a lot of thoughts on the experience. A lot to appreciate and feel grateful, but a handful to complain about as well.

I'm happy that I worked in an environment that I had never even imagined before. This was my first time working with Java professionally, let alone with AWS services. I learned strategies and patterns like dependency injection, singleton, and strategy pattern to help build scalable, flexible software that's easy for everyone to maintain. I finally learned what AWS Lambda looks like, and touched many other services like S3, CloudFormation, CloudWatch, DynamoDB, Route53, etc.

I learned to include maintainability and observability in my work not just for myself, but my whole team. There was a lot to take away from the emphasis on metrics and error handling. Learning the ways this organization handled software development and the custom tools built around the processes were fascinating. I'm glad I worked on a project with real impact to users with the product deployed within the 12 weeks. I genuinely feel like I leveled up as a software engineer.

But just as I felt in [my first internship](../My%20Experience%20as%20a%20SWE%20Intern%20at%20SRAM.md), I still find frontend web development more fun than anything. There's just something very exciting about working with browsers and the web's rapidly evolving ecosystem. I'm still skeptical of object oriented programming; I believe functional programming patterns can at least serve the same purpose.

Another thing I learned is that I should definitely never settle for a specific team. The internship wasn't long enough to learn everything that my team and organization has to offer, but I could see how the work could become boring at some point. Teams are soft-locked into solving their assigned theme of problems. If the problem space you want to work on is irrelevant to your team, you either don't work on it or move to the appropriate team. Your team's tech stack is fixed and consistent for the sake of maximizing on the compounding technical expertise and minimizing maintenance complexities, but that simply means the team's skill set is kept limited. It's challenging to suggest building a service using Go instead of Java, or even Kotlin, or hell, Java 21 instead of 17, without sufficiently persuading people several levels above your pay grade. If I want to keep things exciting for myself, I shouldn't expect the a single team to be the answer to all.

Read [My Experience as a SDE Intern at AWS](../_draft/My%20Experience%20as%20a%20SDE%20Intern%20at%20AWS.md) for more. Oh, and yes, my manager has shared that he's inclined to hire me for a full time position.

## Senior Design

Continuing from [last semester](2025%20T1%20Review.md#School), my team and I completed the largest project I've worked on outside of internships. I built a Flask server with various endpoints to handle several automations that's helpful for the process of converting geoJSONs to IMDF files, and a React frontend to interact with the features intuitively. We roughly estimate that my contribution automates ~30% of the conversion workflow, saving at most around the same amount of time per floorplan. My work is a solid foundation for our project sponsor to streamline the conversion processes even further.

It's hard not to start with complaints about this project instead of the wins. I invested effort solely for the sake of my graduation. I had little to no interest in the mission nor the problem we were solving. And doing this over my final, most important internship was the worst decision I made throughout my undergrad years. I invested time in this project that I could've spent exploring the city and its nature, and networking with other interns, and working on projects that I'm actually excited for - and just anything else that I _wanted_ to do.

It would've been more enjoyable if it wasn't for the poor team dynamic. I wholely depended on another team member to piece together remaining piece of the project - the mobile application to visualize IMDF files for indoor navigation - while the two other members cluelessly dumped LLM-generated code into the codebase. In fact, one member proudly shared that they did not enjoy software engineering. I feel like we ended up serving him a graduation degree that he didn't deserve.

Add GitHub contribution metric here

With that said, I still learned a few things from the project. The progressive growth of the codebase naturally taught me to architect components more consistent to the SOLID principles. Not that I learned it for the first time, but the experience helped me be even better at identifying the _splitting points_, if that makes sense. I definitely felt like I was effectively utilizing my learnings from the internships. There were several instances where I thought, "the codebase I'm working with in AWS does this part much better... I should apply that pattern here."

## AI

Not only was this the largest personal project, but also the largest AI-driven project. I have mixed feelings about it. It's so easy to make it do the work for me, but so hard to make sure that it's exactly what I would've done. It's so easy to look at the code and be like, "Yep, that looks correct", only to later find logic that you _know_ you wouldn't have put if you had wrote it yourself. It's so hard to tell whether I'm making it do the boring part or if I'm accidentally stunting my growth as a software developer. There's a reason why people say you learn better if you write notes instead of highlighting sentences on a textbook - am I really understanding and remembering my codebase as well as I would've if I had written it all by hand? I'll have to continue figuring out the correct approach to

I didn't 'vibe code' it, given I reviewed the generated code, but not all of them were reviewed thoroughly. I would catch out anything that obviously stood out, like unnecessary state management complexities, room for abstraction, and outright wrong implementations, but whatever seemed good was passed with a thumbs up. I asked it to perform its own analysis of potential performance & architectural improvements, and it would do quite well. When it came to debugging, I provided logs and my intuition/experience as context for the LLM to fix the issue itself. I rarely walked through lines of code to squash bugs myself.

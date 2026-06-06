---
published: 2026-05-26
title: Will AI Know Pain?
edited: 2026-06-05
---
A few years ago, I was building a web app using TypeScript and Next.js. The choice wasn't based on some thoughtful architectural decision - I was still learning web development, and all this noise about this full-stack serverless framework just sounded like a convenient way to avoid learning backend development.

The REST API started simple. I built basic CRUD operations that my frontend could call using Axios. Again, I didn't know much about what made it so popular, but I learned that I could use TypeScript to type the response instead of getting `any` in all responses.

Then, the app grew in complexity. A field that used to be a string became a number. One endpoint needed an ID; another needed the same object without it. I had to manually reconcile my types to keep the contract between the frontend and the backend from drifting.

**I felt pain.**

I eventually built a wrapper around the API definitions and the client calls. The backend became the source of truth for what each endpoint accepted and returned. The frontend no longer made direct Axios calls, but instead used endpoint-specific functions written with the shared utilities owned by the backend. It wasn't elegant and still had issues, but it eased the pain I felt.

Then I learned about tRPC through a newsletter, scrapped everything I made, and used that instead. It was better than what I could've ever built, and erased that particular pain almost completely.

In contrast, an AI coding agent wouldn't have complained. It would've happily reconciled the types between the frontend and the backend every single time the contract changed. In fact, it wouldn't have cared to code the whole thing in JavaScript in the first place. It is very much capable of generating my wrapper - much faster and better than what I had. Hell, it could probably rewrite tRPC and strip it down to my preference. But it would never do any of that on its own, because AI doesn't understand pain. It must be asked to simulate what it's like to feel it.

Does pain matter? Not all the time. We don't need pain to tell us what hurts build time, latency, bundle size, an algorithm's space and time complexity, cloud cost, etc. Even UI/UX can be inferred through usage analytics and A/B testing.

But pain is often what tells us the difference between a good UI and a bad one before the data exists. It tells us whether time complexity matters more than space in this particular case, and what "more maintainable" actually means for our team's workflow. We feel pain before associating it with a metric, because software engineering is an art handled by biological beings embedded in social, economic, physical and emotional realities, shaped by their survival instincts, resource constraints, fear, fatigue, confidence, and desire. Metrics are simply quantified representation of feeling and experiencing that reality.

So if an AI is to truly learn what pain means well enough to generate innovative software engineering behavior, it must be shaped by the conditions that produced its training data in the first place.

I'm not saying that it's impossible. I'm also not saying they have to actually live like a human being; whatever that means. What I am saying is that, for an AI system to do more than code generation and fully automate the software engineering process, it needs to be architected around something much more than just training on the artifacts of pain.

Not every pain is derived from individual experience; some pain is shared and learned. I understand the benefits of auto-scaling serverless functions, not because I actually struggled handling an influx of users on my bare metal backend, but because I can connect the dots from my minimal experience to the rich, painful experience of other developers who came before me. I get to avoid potential frustrations and struggles because other people shared their scars and my capacity to understand them.

That ecosystem works because humans aren't identical. No two developers share the same background and interpretation of reality. They might reach the same conclusion and implementation most of the time, but it's THE seed to the learnings and diversity of approaches we have today. Software engineering, too, evolves through natural selection.

To me, that sounds like the recursive self improvement the AI industry keeps reaching for. For AI to continue pushing software engineering forward, it would need some mechanism for preserving that ecosystem, or somehow make it obsolete through some better mechanism we do not yet have.

This isn't to say meaningful invention can't occur in an isolation. A frustrated engineer can invent something alone. But it's the population of software engineers that determine whether its meaningful to software engineering itself. Without diverse experiences absorbing it, processing it, arguing and building on top of it, the invention is nothing more than a representation of entropy.

I know I make it sound like software engineering revolves around actively inventing something novel when that's clearly not true. Most of us are just building another AI wrapper, some Node.js runtime handling basic CRUD operations against a relational database, or another React dashboard. AI is very capable of handling a lot of that work even today, because much of it is simply solving problems that already have answers.

If that's all of what software engineering is to you, then yes, software engineering was fully automated yesterday. But software engineering isn't just putting ingredients together to make a meal. It also knowing when you need to invent a knife, and when someone introduces a cutting board, understanding why that matters. AI can absolutely learn to mimic that one day. But certainly not in the next 6 months.

Sorry, Dario Amodei.

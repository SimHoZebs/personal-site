---
published: 2026-05-26
title: Will AI Know Pain?
edited: 2026-05-28
---
A few years ago, I was building a web app using TypeScript and Next.js. The choice wasn't based on some thoughtful architectural decision - I was still learning web development, and all this noise about this full-stack serverless framework just sounded like a convenient way to avoid learning backend development.

The REST API started simple. I built basic CRUD operations that my frontend could call using Axios. Again, I didn't know much about what made it so popular, but I learned that I could use TypeScript to type the response instead of getting `any` in all responses.

Then, the app grew in complexity. A field that used to be a string became a number. One endpoint needed an ID; another needed the same object without it. I had to manually reconcile my types to keep the contract between the frontend and the backend from drifting.

**I felt pain.**

I eventually built a wrapper around the API definitions and the client calls. The backend became the source of truth for what each endpoint accepted and returned. The frontend no longer made direct Axios calls, but instead used endpoint-specific functions written with the shared utilities owned by the backend. It wasn't elegant and still had issues, but it eased the pain I felt.

Then I learned about tRPC through a newsletter, scrapped everything I made, and used that instead. It was better than what I could've ever built, and erased that particular pain almost completely.

In contrast, an AI coding agent wouldn't have flagged this unless I prompted it to. It wouldn't have even generated my wrapper. It would've happily reconciled the types between the frontend and the backend every single time the contract changed. In fact, it wouldn't have cared to code the whole thing in JavaScript in the first place.

AI doesn't care about what monospace font is used. It doesn't need syntax highlighting to visually differentiate a variable from a function. It can detect duplicate functions when asked, but doesn't cringe over making them. It struggles over long context retrieval, but doesn't stop itself to think, *"Maybe I should split this 1000+ lines of code into multiple files."* It can perform a proper refactor when asked, but it never feels the pain on its own - it must be asked to simulate it.

Does it always need to? Not really. We don't need pain to tell us what hurts build time, latency, bundle size, an algorithm's space and time complexity, cloud cost, etc. Even UI/UX can be inferred through usage analytics and A/B testing.

But pain is often what tell us the difference between a good UI and a bad one before the data exists. It tells us whether time complexity matters more than space in this particular case, and what "more maintainable" actually means for our team's workflow. We feel pain before associating it with a metric; before we can even put it in words. Sure, perhaps these feelings are merely a step away from becoming some quantifiable data. But are past patterns of pain sufficient to define the pain of tomorrow?

I'm not arguing that pain can't be reduced to pattern recognition. I *am* arguing that pain can't simply be absorbed from training text alone. Neither through audio or video - because they are merely representations of pain, not a replica.

Software engineering doesn't occur in a vacuum. It's handled by biological beings embedded in social, economic, physical and emotional realities. Our survival instincts, resource constraints, fear, fatigue, confidence, and desire all shape what **pain** means in software engineering. No matter how well a blog post, codebase, or a post mortem is written, none will ever capture the experience of the engineer as well as having lived it. So if an AI is to truly learn what pain means to generate innovative software engineering behavior, it must also be shaped by the conditions that generated their training data in the first place.

Does AI *really* need to experience pain the way we humans do to invoke *sufficient* innovation? Even if you agree with me so far, what says we need perfect understanding of pain to do great software engineering?

I'd like to present another angle of software engineering: its social ecosystem.

Not every pain is derived from individual experience; some pain is shared and learned. I understand the benefits of auto-scaling serverless functions, not because I actually struggled handling an influx of users on my bare metal backend, but because I can connect the dots from my minimal experience to the rich, painful experience of other developers who came before me. I get to avoid potential frustrations and struggles because other people shared their scars and my capacity to understand them.

That ecosystem matters because humans aren't identical. Two developers can experience the same tool, framework, or outage and still argue about what was done right and what went wrong. Software engineering evolves through those disagreements. We can't simply expect innovation through isolated moments of individual pain.

If AI is to fully automate software engineering, we can't simply rely on the best model to rule it all. It would need some mechanism for preserving that diversity of pain, or somehow  make that diversity obsolete through some better mechanism we do not yet have.

I know I make it sound like software engineering revolves around actively inventing something novel when that's clearly not true. Most of us are just building another AI wrapper, some Node.js runtime handling basic CRUD operations against a relational database, or another React dashboard. AI is very capable of handling a lot of that work even today, because much of it is simply solving problems that already have answers.

If that's all of what software engineering is to you, then yes, software engineering was fully automated yesterday. But software engineering isn't just putting ingredients together to make a meal. It also knowing when you need to invent a knife, and when someone introduces a cutting board, you understand why that matters. AI can absolutely learn to mimic that one day. But certainly not in the next 6 months.

Sorry, Dario Amodei.

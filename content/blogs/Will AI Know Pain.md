---
published: 2026-05-26
title: Will AI Know Pain?
---

A few years ago, I was building a web app using TypeScript and Next.js. The choice wasn't based on some thoughtful architectural decision - I was still learning web development, and all this noise about full-stack serverless framework just sounded like a convenient way to avoid learning backend development.

The REST API started simple. I built basic CRUD operations that my frontend could call using Axios. Again, I didn't know much about what made it so popular, but I learned that I could use TypeScript to type the response instead of getting `any` in all responses.

Then, the app grew in complexity. A field that used to be a string became a number. One endpoint needed an ID; another needed the same object without it. I had to manually reconcile my types to keep the contract between the frontend and the backend from drifting. **I felt pain.**

I eventually built a wrapper around the API definitions and the client calls. The backend became the source of truth for what each endpoint accepted and returned. The frontend no longer made direct Axios calls, but instead used endpoint-specific functions written with the shared utilities owned by the backend. It wasn't elegant and still had issues, but it eased the pain I felt.

Then I learned about tRPC through a newsletter, scrapped everything I made, and used that instead. It was better than what I could've ever built, and erased my pain completely.

In contrast, an AI coding agent wouldn't have flagged this unless I prompted it to. It wouldn't even generate my wrapper. It would happily reconcile the types between the frontend and the backend every single time the contract changed. In fact, it wouldn't have cared to write it in JavaScript instead.

AI isn't designed to feel pain. It doesn't care about what monospace font is used. It doesn't need syntax highlighting to visually differentiate a variable from a function. It can detect duplicate functions when asked, but doesn't cringe over making them. It struggles over long context retrieval, but doesn't stop itself to think, *"Maybe I should split this 1000+ lines of code into multiple files."* It doesn't feel pain on its own - it must be asked to simulate it.

Does it always need to? Not really. We don't need pain to tell us what hurts build time, latency, bundle size, algorithm's space and time complexity, cloud cost, etc. Even UI/UX can be inferred through usage analytics and A/B testing. But pain is often what tell us the difference between a good UI and a bad one before the data exists. It tells us whether time complexity matters more than space in this particular case, and what "more maintainable" actually means for our team's workflow. We feel pain before even associating it with a metric; even before being able to put it in words. Sure, perhaps these feelings are merely a step away from being some quantifiable data point. But do current AI systems care to emulate it in the first place?

Not every pain is derived from personal experience; some pain is shared and learned. I understand the benefits of auto-scaling serverless functions, not because I actually struggled handling an influx of users on my bare metal backend, but because I read about the painful experiences many developers who came before me. Most of software engineering progress comes from people sharing scars like this. Why one developer loves a language, why another hates Java, why React is supposedly the only framework worth learning, and why this week’s obscure framework is allegedly the future. The constant controversies, failures, and arguments people have can be tiring, but is what defines software engineering of today. How will AI emulate such an ecosystem?

What even drives us to innovate in the first place? We didn't invent software engineering for the sake of it. It's a way we represent the solutions to the problems we experienced yesterday, today, and expect to experience tomorrow. Those experiences are much more complex than what the best LLM can absorb from training text alone. For an AI to truly originate innovation, it can not merely imitate the language we use after we've already solved the problem. It must experience the constraints of the living.

I don't claim to be an expert on anything. Maybe language alone can imitate innovation sufficiently enough to make meaningful software engineering progress. But what's clear is that software engineering isn't just putting ingredients together to make a meal. It also requires knowing when you need to get a better knife and invent one when there isn't.

That capacity isn't present in current models or any coding agents at the moment, and certainly not in the next 6 months. Sorry, Dario Amodei.

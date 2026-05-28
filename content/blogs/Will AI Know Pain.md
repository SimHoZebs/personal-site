---
published: 2026-05-26
title: Will AI Know Pain?
---

A few years ago, I was building a web app using TypeScript and Next.js. The choice wasn't based on some thoughtful architectural decision - I was still learning web development, and all this noise about this full-stack serverless framework just sounded like a convenient way to avoid learning backend development.

The REST API started simple. I built basic CRUD operations that my frontend could call using Axios. Again, I didn't know much about what made it so popular, but I learned that I could use TypeScript to type the response instead of getting `any` in all responses.

Then, the app grew in complexity. A field that used to be a string became a number. One endpoint needed an ID; another needed the same object without it. I had to manually reconcile my types to keep the contract between the frontend and the backend from drifting. **I felt pain.**

I eventually built a wrapper around the API definitions and the client calls. The backend became the source of truth for what each endpoint accepted and returned. The frontend no longer made direct Axios calls, but instead used endpoint-specific functions written with the shared utilities owned by the backend. It wasn't elegant and still had issues, but it eased the pain I felt.

Then I learned about tRPC through a newsletter, scrapped everything I made, and used that instead. It was better than what I could've ever built, and erased that particular pain almost completely.

In contrast, an AI coding agent wouldn't have flagged this unless I prompted it to. It wouldn't have even generate my wrapper. It would've happily reconcile the types between the frontend and the backend every single time the contract changed. In fact, it wouldn't have cared to code the whole thing in JavaScript in the first place.

AI doesn't care about what monospace font is used. It doesn't need syntax highlighting to visually differentiate a variable from a function. It can detect duplicate functions when asked, but doesn't cringe over making them. It struggles over long context retrieval, but doesn't stop itself to think, *"Maybe I should split this 1000+ lines of code into multiple files."* It can perform a proper refactor when asked, but it never feels the pain on its own - it must be asked to simulate it.

Does it always need to? Not really. We don't need pain to tell us what hurts build time, latency, bundle size, an algorithm's space and time complexity, cloud cost, etc. Even UI/UX can be inferred through usage analytics and A/B testing. But pain is often what tell us the difference between a good UI and a bad one before the data exists. It tells us whether time complexity matters more than space in this particular case, and what "more maintainable" actually means for our team's workflow. We feel pain before associating it with a metric; before we can even put it in words. Sure, perhaps these feelings are merely a step away from becoming some quantifiable data. But are past patterns of pain sufficient to define the pain of tomorrow?

I'm not arguing that pain can't be reduced to pattern recognition. I *am* arguing that pain is derived from something much more complex than what even the best LLM can absorb from training text alone. Think about it - we didn't invent software engineering for the sake of it. It's just one of many ways we represent the solutions to the pain we experienced yesterday, today, and expect to experience tomorrow. Experiences which cannot be reduced to text.

Language is not a replica of experience. Neither are video or audio. They all heavily depend on the receiver having some shared frame of reference be interpret them meaningfully. We interpret "I was starving" not just from the word definitions, but also through our subjective experience associated with it. For an AI to truly originate innovation, it cannot merely imitate the language we use after we've already solved the problem. It must experience the constraints of living.

Not every pain is derived from individual experience; some pain is shared and learned. I understand the benefits of auto-scaling serverless functions, not because I actually struggled handling an influx of users on my bare metal backend, but because I read about the painful experiences of many developers who came before me. Most of software engineering progress comes from people sharing scars like this. Why one developer loves a language, why another hates Java, why React is supposedly the only framework worth learning, and why this week’s obscure framework is allegedly the future. The constant controversies, failures, and arguments people have can be tiring, but they are what define software engineering of today. AI has to somehow make this ecosystem obsolete or emulate it - how will it achieve any of that?

I don't claim to be an expert on anything. Maybe language alone can imitate innovation sufficiently enough to make meaningful software engineering progress. But what's clear is that software engineering isn't just putting ingredients together to make a meal. It also requires knowing when you need to get a better knife and invent one when there isn't.

That capacity isn't present in current models or any coding agents at the moment, and certainly not in the next 6 months. Sorry, Dario Amodei.

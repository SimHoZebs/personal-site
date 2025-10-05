I spent the last weekend mentoring at KnightHacks, a 36 hour hackathon hosted at the University of Central Florida by its largest software development club, KnightHacks.

For many hackers, a hackathon is their first event ever building a project as a group. For some, the first time they wrote code for anything other than class assignments. Those 36 sleepless hours can be one of the most memorable, meaningful event for one's software development career, which was why I spent the last weekend mentoring at KnightHacks.

Here are some thoughts I have for all those who are building something for the first time.

Aspiring web developers: You should always start with JavaScript, HTML and CSS, with maybe a library and an AI API or two since everyone's doing it. Learning DOM manipulation, async functions, and basic state management is going to be challenging on its own. Hell, if you are feeling really ambitious, try learning React on the way, but don't tell others I didn't warn you against it. 

**And for the love of god, don't use T3 Stack for your first hackathon project.**

That's right. A handful of students had come over to me confused why they were having errors using Next.js because they had no understanding of what server side rendering is. Some were trying to access mutation calls that didn't even exist because what the hell is tRPC, let alone a REST API? the hell they are supposed to do with the tRPC routes they created

I found a surprising a number of them opting to use technologies way too complicated for what they need to get done  Here are some of the things I had to say:
- Don't try to locally run Llama-405b, let alone download it on a school network speed. Just chuck $5 in OpenAI and use GPT4o-mini.
- You are either using React or Streamlit. It doesn't make sense to use both.
- Don't use tRPC for your API. just build a REST API.
- Don't use Drizzle, and especially don't use them to build SQL queries if you never learned SQL before. Just use SessionStorage/LocalStorage or MongoDB.
- Don't use Next.js - and especially don't use app router - if this is your first time working with React.
- You don't need a log in. You especially don't want OAuth.
I don't have anything against these technologies, of course. I love fooling around with ollama, and use   

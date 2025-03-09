This Summer, I had an internship with SRAM, a high-end bike component manufacturing company.

Contrary to what that sounds like, they do surprising amount of software-related work due to the electrical nature of their components. I didn't know what the term 'derailleur' was before I joined, and was surprised to learn that such parts - and many others - can not only be wireless, but is in fact preferred so by top athletes and bike assemblies.

I want to share all the great experiences I had working there, along with all the honest frustrations I had as well.

## Python Programming

I can confidently say that working with Python is the worst developer experience I ever had.

First off, I _despise_ dynamically typed languages. Yes, even though I love working with web technologies and the JavaScript ecosystem, I hate the language. TypeScript makes the experience a little more bearable and there's a lot of effort within the ecosystem to make type safe libraries.

But God, **Python**. It has type hinting, but you have to explicitly type SO much of them it's a hassle. So many libraries don't support them and have methods that return `Any` even though they actually return a specific type according to their own docs! It was so annoying having to refer to the documentation of every library I used to understand what data type I'm going to work with and what properties and methods are available for an object.

Speaking of objects, I couldn't find an easy way to print them out. Python doesn't really have `JSON.stringify()`, so I had to use \[this] instead. But that wouldn't work for printing HTML - I had to use another function for that. I had to try four different functions every time I needed to print out to stdout, and even then, the best thing I could do half the time was annoying guess work.

And then there is the whole virtual environment bullshit. Don't ever `pip install` or you pollute your global environment! Use `venv` to resolve that. Oh, you want to share packages and manage dependencies? Don't use `venv` on its own then. If you want to figure that out, try `Pipenv`, which uses it's own format (`Pipfile`) for some reason instead of a standardized configuration file (`pyproject.toml`)! Did you know that `Pipenv` can't automatically resolve dependency conflicts if you are syncing packages that are under different categories at the same time? Maybe you'll want to use `Poetry` instead. Just remember to always change your work environment and use `poetry add`, except for all the edge cases you'll never remember!

Okay. That was a lot of negativity, but it wasn't all bad. I'm not a backend guy, but I was pleasantly surprised with was the DX of Django. The project structure was intuitive and well thought out, while supporting features that I expect 3 or 4 libraries in JS ecosystem to handle. The surrounding ecosystem is super rich, making adding features like SSO pretty simple.

## Devops

When non-tech people ask me what Devops is like, I give a concert as an analogy. There are people who perform, and people who set up the performance. Devops provides the stadium and makes sure they get their supplies.

It's not a good analogy, but the point I highlight out of my bias is that it's work nobody notices until you go missing. It's important, but invisible to many. Building test infrastructure is important for large software, but annoying to build. It's like don't feel like I'm doing much but it takes so much time to get them working. It's not very fun.

I don't think backend and devops is something I'd enjoy doing, but I also haven't done enough to know for sure. I wish I got to interact with the database more - then I'd have a better understanding. While I contributed to the project in a meaningful way, the things I learned didn't feel that meaningful and just felt like I was scratching the surface of what the software was. I'm hoping to get the co-op offer in time and work with it much closer to understand the work. However, Jake believes the project might be too mature to get meaningful experience in backend development. What will I be really learning from the co-op, then?

Tools I was offered to work with was very limiting

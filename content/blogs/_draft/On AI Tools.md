Little background: 
- I have a huge preference for CLI tools. 
- I avoid paid versions where I can because my income is limited.
- I have Gihutb Copilot Pro from my student benefits. 

I've had best success with Claude Code for CLI, Cline using Claude Sonnet 4 on VSCode, and Cursor Agents (model agnostic) for asynchronous agents. 

Gemini has consistently been absolute dog shit. 

Most dev tools have clear boundaries for when and where they should be used. We know we can't The insanity with AI tools is that for the first time, I am using a solution that sometimes works and sometimes doesn't with no clear boundaries. 
## Why? 

As with any AI interaction, I value LLMs and system prompts that don't make stupid guesses to identify problems and solutions. Making up irrelevant problems, syntax, methods are one thing, but illogical problem solving steps really destroy my soul and makes me think that maybe I would've solved this faster on my own through Google searches and reading documentations. 

Speaking of Google - Gemini 2.5 Pro has been exceptionally terrible in every tool I've used it in. There's been a handful of instances I noticed it:
1. Apply solution A for problem X then find problem Y arise
2. Apply solution B to solve problem Y and find problem X arise again
3. Apply solution A exactly, leading it to be stuck in a loop


## What I've not tried

CLI: OpenAI Codex, Cursor CLI, Crush, any "AI terminals" (e.g. warp)
IDE/: Cursor IDE, Windsurf, Avante.nvimCursor CLI, Crush, Windsurf, Avante.nvim. 
## CLI

Claude Code: the only one that's been consistently accurate and smart. Its actually solved problems I would've had hard time figuring out. I don't use it often only because I have to pay for the tokens. Might get a Claude pro subscription at this rate. 

https://github.com/sst/opencode/issues/239

sst/OpenCode: This is what I use most of the time with GitHub Copilot tokens. Unfortunately, it's only been marginally better than Gemini CLI. 

Gemini CLI sucks so bad I find myself fixing its issues more than the problems I needed to fix in the first place. I only use it because it helps me identify the root cause half the time, but I'm reaching a point where I'd rather debug issues myself because I'm so frustrated dealing with so many dumb guesses and decisions it makes. 

Crush looks promising and exciting, just 

## AI-powered IDE

I'm a *neovim user btw*, so I typically stay away from GUI IDEs, but AI has changed that for quite some time. When Copilot Chat came along, CopilotChat.nvim filled my gap pretty quick, but once codebase traversal became the norm (called 'Agent mode') throughout various IDE extensions, I found myself using the command line less and less. 

Cline extension is the best I've used. Using Claude 4 Sonnet for Planning and Gemini 2.5 Flash for Acting. Gemini 2.5 Pro and Flash are garbage for planning and debugging. Avante.nvim is pretty good too. Github Copilot, Q Chat are only good for small, straight forward tasks. Need to experiment with Kiro more. Never paid for Cursor, WindSurf. 

## Background/Async Agents

These are tools designed tackle a significant amount of dev work with the least amount of supervision. 

Cursor background agents are good. 

Jule is absolute garbage. It consistently fails at completing tasks. Refuses to do additional tasks. How is it coming out of closed beta at the current state? 

## Prototype builders

Not interested in: lovable, bolt, v0, Github Spark, Replit Agent


I'm thinking that there is a way to improve agents from making sure that they do their job and one of that is using tools, I mean obviously we have MCP that's supposed to help with that, but something that I haven't seen in a lot of these. Agentic Ides is that they would have tasks be generated, but there is no enforcement of checking whether all the to-do lists have been completed except Jule. I think  Jule actually does it. And considering that I'm trying to build a kind of audio journaling app, something that I can do is within the instructions that I have it refined. I can kind of give it programmatic steps that it needs to follow and kind of automatically prompted to continue doing its task if it tries to consider itself done.

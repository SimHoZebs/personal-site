---
title: LazyFood
summary: Logging nutrients is annoying. Just show me the food
---
![](https://youtu.be/z-aMN7k4vfw)
## Inspiration

Many of us would like to keep better track of our own diet - being able to see a summary of what you've consumed helps us stay healthier - whether you are just trying to prevent diseases like diabetes and heart disease, or trying to build your physique.

One issue that many of us experience when attempting to keep track of our diets is that we are unsure of what we are consuming. Often times, we make homemade foods that are difficult to keep track of nutritional value. Other times, we eat weirdly sized portions of food, or might have even forgot specific details. We often don't know what values to enter when we try to log our food - eventually leading to the discontinued use of diet logging apps.

## What it does

LazyFood allows you to log your food without having to think much about it. Simply text, type, or even take a picture of your meal from your phone, and LazyFood will use information available online to determine an accurate estimate about the nutritional value of your food. Google's ADK is used to allow agents to search the internet for matching items - whether it is a home-made meal made of many ingredients or a burger from your favorite restaurant. To ensure you get the most accurate estimates, LazyFood can also ask a short set of brief, multiple choice questions to help clarify important factors about your meal (such as if a food was fried or baked, used whole wheat bread or white, etc.). Additionally, if you have regular patterns in your diet - such as always eating baked chips as opposed to fried - LazyFood allows you to save these patterns as memories to always be taken into account when you log a meal.

## How we built it
- Database - PostgreSQL
- Frontend - React, TypeScript, CSS
- Backend - Django, Django Rest Framework (DRF)
- Agents - Google ADK (Agent Development Kit)
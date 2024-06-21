/* 
AI agent steps:
1. Prompt user to log in to sainsburys
2. Read recipe and extract ingredients - takes recipe from website, extracts ingredients, simple structured data (use interface like in ss)
3. Send browser request to search for each ingredient in sainsburys 
4. Select particular ingredient and add ingredient to basket
5. After all ingredients added, redirect to checkout page for user to checkout

EXTRA STUFF
Option to save recipes for later
Extract recipe itself, re-write in more simple format and save on UI

browser request --> sainsburys --> JSON from sainsbury's server (search results)

info send to server = payload tab
info server sends back in response tab
*/
# warcomfeed.link

 ## Overview
 https://www.warhammer-community.com/ does not provide an RSS feed since their most recent design refresh. This is a major oversight and hurts their reach. I know that personally, I used to visit the site most days because a news article would appear in my feed reader and I'd pop on over to read it. Now I visit at best once a week.

 This project provides the missing WarCom feed. The feed is generated using the same API which powers their search and latest news page. All feed items go directly to the relevant news article.

 ## Technical Details
 - This site is a static website built using the Eleventy static site generator
 - At build time, a request is made to the WarCom API, using the Eleventy-Fetch plugin. See `./src/_data/warcom.js` for more details.
 - Once the data is fetched (falling back to the last cached version), templates are compiled with the relevant data
   - The templating language used is Nunjucks
   - `./src/_layouts/` contains page templates
   - `./src/_includes/` contains "partials" used within templates
   - `./src/pages/` contains either Markdown or Nunjuck pages defining the content
/**
 * warcom.js
 * This file contains the data and functions for the Warcom feed.
 * 
 * At a high level, a request to https://www.warhammer-community.com/api/search/news/, with 
 * the JSON payload:
 * ```json
 * {"sortBy":"date_desc","category":"","collections":["articles"],"game_systems":[],
 * "index":"news","locale":"en-gb","page":0,"perPage":16,"topics":[]}
 * ```
 * Will generate a response containing the latest news articles from the Warhammer Community 
 * website.
 * 
 * Sample response:
 * 
 * ```json
 * {
 *     "news": [
 *         {
 *             "title": "Perturabo joins the Horus Heresy figure range from JOYTOY",
 *             "site": "en-gb",
 *             "slug": "perturabo-joins-the-horus-heresy-figure-range-from-joytoy",
 *             "excerpt": "The lord of the Iron Warriors enters the fray.",
 *             "image": {
 *                 "path": "joytoy_perturabo-aug08-1-feature-elt8pzg0mf.jpg",
 *                 "alt": null,
 *                 "width": 1455,
 *                 "height": 900,
 *                 "focus": "50% 50%"
 *             },
 *             "collection": "articles",
 *             "game_system": {
 *                 "light": {
 *                     "path": "gs-icon-dark-thehorusheresy.svg",
 *                     "alt": null,
 *                     "width": "400",
 *                     "height": "400",
 *                     "focus": "50% 50%"
 *                 },
 *                 "dark": {
 *                     "path": "gs-icon-light-thehorusheresy.svg",
 *                     "alt": null,
 *                     "width": "400",
 *                     "height": "400",
 *                     "focus": "50% 50%"
 *                 }
 *             },
 *             "topics": [
 *                 {
 *                     "title": "Warhammer: The Horus Heresy",
 *                     "slug": "warhammer-the-horus-heresy"
 *                 }
 *             ],
 *             "date": "06 Aug 25",
 *             "hide_date": false,
 *             "hide_read_time": false,
 *             "interaction_time": "1 min",
 *             "uri": "/articles/aw06vhor/perturabo-joins-the-horus-heresy-figure-range-from-joytoy",
 *             "id": "646f9d2e-5c7c-4dc9-a293-40cd329d093b",
 *             "uuid": "aw06vhor"
 *         }
 *     ]
 * }
 * ```
 */

import EleventyFetch from "@11ty/eleventy-fetch";

export default async function() {
    const url = "https://www.warhammer-community.com/api/search/news/";
    
    const payload = {
        sortBy: "date_desc",
        category: "",
        collections: ["articles"],
        game_systems: [],
        index: "news",
        locale: "en-gb",
        page: 0,
        perPage: 16,
        topics: []
    };

    try {
        const response = await EleventyFetch(url, {
            duration: "1h",
            type: "json",
            fetchOptions: {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            }
        });

        return response.news || [];
    } catch (error) {
        console.error("Error fetching Warcom data:", error);
        return [];
    }
}

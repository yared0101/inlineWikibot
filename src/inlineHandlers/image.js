const axios = require("axios");
module.exports = (bot) => {
    bot.inlineQuery(/p\s.+/, async (ctx) => {
        let input = ctx.inlineQuery.query.split(" ");
        input.shift();
        const query = input.join(" ");
        const res = await axios.get(
            `https://pixabay.com/api/?key=${process.env.PIXABAYAPI}&q=${query}`
        );
        const data = res.data.hits;
        const results = data.map((item, index) => {
            return {
                type: "photo",
                id: String(index),
                photo_url: item.webformatURL,
                thumb_url: item.previewURL,
                photo_width: 300,
                photo_height: 200,
                caption: `[source](${item.webformatURL})\n[Large Image](${item.largeImageURL})`,
                parse_mode: "Markdown",
            };
        });
        ctx.answerInlineQuery(results);
    });
};

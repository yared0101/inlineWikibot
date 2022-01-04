const axios = require("axios");
module.exports = (bot) => {
    bot.inlineQuery(/w\s.+/, async (ctx) => {
        let input = ctx.inlineQuery.query.split(" ");
        input.shift();
        const query = input.join(" ");
        try {
            var res = await axios.get(
                `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${query}&limit=2`
            );
        } catch (e) {
            console.log(e);
            return;
        }
        const data = res.data;
        const allTitles = data[1];
        const allLinks = data[3];
        if (allTitles == undefined) {
            return;
        }
        const results = data.map((item, index) => {
            return {
                type: "article",
                id: String(index),
                title: String(item),
                input_message_content: {
                    message_text: `${item}\n${allLinks[index]}`,
                },
                description: allLinks[index],
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: `share ${item}`,
                                switch_inline_query: `${item}`,
                            },
                        ],
                    ],
                },
            };
        });
        ctx.answerInlineQuery(results);
    });
};

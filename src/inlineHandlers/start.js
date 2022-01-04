const config = require("../../config");
module.exports = (bot) => {
    bot.inlineQuery(["start", "help"], (ctx) => {
        let message = config.helpMessage;
        let results = [
            {
                type: "article",
                id: 1,
                title: "Help Reference",
                input_message_content: { message_text: message },
                description: "sends help message on how to use the bot",
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: "search image",
                                switch_inline_query_current_chat: "p",
                            },
                        ],
                        [
                            {
                                text: "search wiki",
                                switch_inline_query_current_chat: "w",
                            },
                        ],
                    ],
                },
            },
        ];
        ctx.answerInlineQuery(results);
    });
};

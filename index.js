require("dotenv").config();
const { Telegraf } = require("telegraf");
const bot = new Telegraf(process.env.TOKEN);

const startCommand = require("./src/commands/start");
startCommand(bot);
const imageHandler = require("./src/inlineHandlers/image");
imageHandler(bot);
const wikiHandler = require("./src/inlineHandlers/wiki");
wikiHandler(bot);
const startHandler = require("./src/inlineHandlers/start");
startHandler(bot);

bot.launch();

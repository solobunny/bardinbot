require("dotenv").config();
const micro = require("micro");
const HelperBot = require("@danreeves/helper-bot");
const DontReplyToSelf = require("@danreeves/helper-bot/middleware/dont-reply-to-self");
const Responder = require("@danreeves/helper-bot/middleware/responder");

const RoleReactions = require("./role-reactions");

const helper = new HelperBot(process.env.DISCORD_BOT_TOKEN);

helper
  .use(new DontReplyToSelf())
  .use(
    new Responder({
      command: /know what i think/gi,
      response: "do I know what an elf thinks? No one does!",
    }),
  )
  .use(
    new RoleReactions({
      channels: ["673040355041476621"],
      messages: ["678761819547893762"],
      mapping: {
        "678780524399034370": "VT2",
        "678780728405655562": "DRG",
        "678782811066466384": "RoR",
        "678783520201637907": "Conan",
        "678784015720775710": "Minecraft",
      },
    }),
  )
  .start();

const server = micro(async () => {
  return `Bot Bardin is online. Uptime: ${helper.bot.uptime}`;
});

server.listen(process.env.PORT);

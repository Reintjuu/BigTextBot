var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var client = new Discord.Client({
    token: auth.token,
    autorun: true
});
client.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(client.username + ' - (' + client.id + ')');
});
client.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        if (message.match(/[A-z0-9]/g)) {
            client.sendMessage({
                to: channelID,
                message: message.substring(1)
                    .replace(/[A-z0-9]/g, toEmojiText)
            });
        }
    }
});

function toEmojiText(match, offset, string) {
    // If it's a number.
    if (match.match(/[0-9]/g)) {
        var numbers = [':zero:', ':one:', ':two:', ':three:', ':four:', ':five:', ':six:', ':seven:', ':eight:', ':nine:'];
        return numbers[match];
    }

    return ':regional_indicator_' + match.toLowerCase() + ':';
}
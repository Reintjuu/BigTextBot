/////////////////////////////////////////
//             Big Text Bot            //
/////////////////////////////////////////
var Discord = require('discord.io');
var logger = require('winston');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var client = new Discord.Client({
    token: process.env.token,
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


/////////////////////////////////////////
//  Site to keep dynos awake on Heroku //
/////////////////////////////////////////
const express = require('express');
const app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 5000;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the `public` directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', (request, response) => {
    // ejs render automatically looks in the views folder
    response.render('index');
});

app.listen(port, () => {
    // will echo 'Our app is running on http://localhost:5000 when run locally'
    console.log('Our app is running on http://localhost:' + port);
});

// pings server every 15 minutes to prevent dynos from sleeping
setInterval(() => {
    http.get('https://big-text-bot.herokuapp.com');
}, 900000);
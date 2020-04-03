var SlackBot = require('slackbots');
var request = require("request");

// create a bot
var bot = new SlackBot({
    token: 'xoxb-810463486212-1030424444835-ZV3CYxsu1K9A3vlgLvc3bCJi', // Add a bot https://my.slack.com/services/new/bot and put the token 
    name: 'topcoderbot'
});

const getRandomJoke = (callback, user) => {
    return request("https://icanhazdadjoke.com/slack", (error, response) => {
      if (error) {
        console.log("Error: ", error)
      } else {
        let jokeJSON = JSON.parse(response.body)
        let joke = jokeJSON.attachments[0].text
        return callback(joke, user)
      }
    })
  };

  const postMessage = (message, user) => {
    bot.postMessage(user, message, { as_user: true })
  };

bot.on('start', function() {
    // more information about additional params https://api.slack.com/methods/chat.postMessage
    var params = {
        icon_emoji: ':cat:'
    };
    
    // define channel, where bot exist. You can adjust it there https://my.slack.com/services 
    bot.postMessageToChannel('general', 'meow!', params);
    
    // define existing username instead of 'user_name'
    bot.postMessageToUser('nahidshahin', 'meow!', params); 
    
    // If you add a 'slackbot' property, 
    // you will post to another user's slackbot channel instead of a direct message
    bot.postMessageToUser('nahidshahin', 'meow!', { 'slackbot': true, icon_emoji: ':cat:' }); 
    
    // define private group instead of 'private_group', where bot exist
    bot.postMessageToGroup('private_group', 'meow!', params); 

    bot.on("message", msg => {
        console.log(' ---------- got ', msg);
        switch (msg.type) {
        case "message":
          if (msg.channel[0] === "D" && msg.bot_id === undefined) {
            //bot.postMessage(msg.user, "hi", { as_user: true })
            getRandomJoke(postMessage, msg.user);
          }
          break
        }
      })
});

﻿const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');

var userCooldowns = {};

client.on('ready',() => {
    console.log('Online');
    setInterval(function(){ for (userx in userCooldowns){if(userCooldowns[userx] > 0){userCooldowns[userx]-= 1;} }; }, 3000);
})

client.on('message', message => {
  if(message.content === '!test'){
    message.channel.sendMessage('✓');
  }

  if(message.content === '!quack'){
    if(message.member.voiceChannel && (userCooldowns[message.member.author] == undefined || userCooldowns[message.member.author] == 0)){
      userCooldowns[message.member.author] = 5;
      message.member.voiceChannel.join()
      .then(connection => {
        const dispatcher = connection.playFile('C:/Users/Ryan/Documents/Quack-Sound-Effect.mp3');
        message.channel.sendMessage(':duck:');
        dispatcher.on('end', () =>  {
          message.member.voiceChannel.leave()
        })
      })
      .catch(console.log);
    }
    else{
      if (message.member.voiceChannel && (userCooldowns[message.member.username] != undefined || userCooldowns[message.member.username] > 0)){
          message.reply('Cooldown remaining: ' + userCooldowns[message.member.author]);
      }
      else{
          message.reply('You need to join a channel first!');
      }
    }
  }
  if(message.content === ':duck:'){
    if (message.member.bot == true){
       message.delete(3).catch(console.error);
    }
  }
});

client.login(settings.token);

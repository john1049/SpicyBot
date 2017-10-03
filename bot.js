const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');

client.on('ready',() => {
    console.log('Online');
})

client.on('message', message => {
  if(message.content === '!test'){
    message.channel.sendMessage('✓');
  }

  if(message.content === '!quack'){
    if(message.member.voiceChannel){
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
      message.reply('You need to join a channel first!')
    }
  }
});

client.login(settings.token);

const Discord = require('discord.js');
const fs = require('fs');

var counter = 0;
var pool, clients, config;

const init = function()
{
    config = JSON.parse(fs.readFileSync('./Config.json','utf8'));
    clients = [];
    pool = [];
    for(let i = 0; i < config.tokens.length; i++)
    {
        let client = new Discord.Client();
        client.login(config.tokens[i]);
        client.on('message', message => 
        { 
            doBot(message);
        });
        client.on('ready', () => 
        {
            console.log(`Logged in as ${client.user.tag}!`);
        });
        clients.push(client);
    }
}
const giftCode = function () 
{
    let code = "";
    let letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (var i = 0; i < 16; i++)
    {
        code = code + letters.charAt(Math.floor(Math.random() * letters.length));
    }
    if(pool.includes(code))
    {
        return giftCode();
    }
    else
    {
        return code;
    }
}
const doBot = function (message)
{
    if (message.channel.id === config.channel && message.content === '$nitro') 
    {
        try 
        {
            setInterval(() => 
            {
		message.author.send('https://discord.gift/' + giftCode()).then((msg) => 
                {
                    let code = msg.content.replace('https://discord.gift/', '');
                    pool.push(code);
                    counter++;
                    console.log(counter);
                });
            }, 1);
        }
        catch (error) 
        {
            console.log(error)
        }
    }
}

init();
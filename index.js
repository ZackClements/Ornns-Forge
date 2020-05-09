//Discord Bot
const Discord = require('discord.js');
const bot = new Discord.Client();
const token = 'NzA1MjIxMTQ5MTkzMTQyMjcz.Xqoj0Q.7EpgINgGEnCZ6Taxwm1Li08x8cM';
//const test = require('./Test/test.js'); UNCOMMENT WHEN ALL CONSOLE.LOG IS REMOVED FROM TEST.JS
//const champion = require('./champions/champion.json');
const championName = require('./champions/championName.js');


//League API
let LeagueAPI = require('leagueapiwrapper');
leagueAPIKey = "RGAPI-fc367ca4-0398-4ef4-8991-b72148520030";
LeagueAPI = new LeagueAPI(leagueAPIKey, Region.NA);

bot.on('ready',() =>{
    console.log('Bot is online');
})
bot.on('message', msg =>{
    var content = msg.content.split("! ");
    if(content[0] === "!Ornn!"){

        msg.channel.send({files: ['./images/Ornn.jpg']});
        msg.channel.send("Name's Ornn. No further pleasantries needed.");
    }
    if(content[0] === "summoner"){
        var summonerName = content[1];
        LeagueAPI.getSummonerByName(summonerName)
            .then(function(accountObject){
                msg.channel.send("Here is " + summonerName + "'s basic information: ")
                msg.channel.send("Summoner Level " + accountObject['summonerLevel']);
                LeagueAPI.getLeagueRanking(accountObject).then(function(res){
                    var rank = String(res[0]['tier']);
                    var str = rank.toLowerCase();
                    msg.channel.send("Rank: " + str + " " + res[0]['rank']);
                    //Shoutout to Sperlmutter for helping me out!
                })
                return LeagueAPI.getChampionMastery(accountObject)
                .then(function(championMasteryList)
                    {
                        var champId = championMasteryList[0]['championId'];
                        msg.channel.send(championName.getChampName(champId));
                    })
            })

            .catch(console.log);

    }
})
bot.login(token);


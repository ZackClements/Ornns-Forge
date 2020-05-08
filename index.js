//Discord Bot
const Discord = require('discord.js');
const bot = new Discord.Client();
const token = 'NzA1MjIxMTQ5MTkzMTQyMjcz.Xqoj0Q.7EpgINgGEnCZ6Taxwm1Li08x8cM';
//const test = require('./Test/test.js'); UNCOMMENT WHEN ALL CONSOLE.LOG IS REMOVED FROM TEST.JS
const champion = require('./champions/champion.json');


//League API
let LeagueAPI = require('leagueapiwrapper');
leagueAPIKey = "RGAPI-a74bf676-7717-4511-9787-20ea2d140d70";
LeagueAPI = new LeagueAPI(leagueAPIKey, Region.NA);

bot.on('ready',() =>{
    console.log('Bot is online');
})
bot.on('message', msg =>{
    var content = msg.content.split(".");
    if(content[0] === "!Ornn!"){
        msg.channel.send("Name's Ornn. No further pleasantries needed.");
    }
    if(content[0] === "summoner"){
        var summonerName = content[1];
        LeagueAPI.getSummonerByName(summonerName)
            .then(function(accountObject){
                msg.channel.send("Here is " + summonerName + "'s basic information: ")
                msg.channel.send("Summoner Level " + accountObject['summonerLevel']);
                LeagueAPI.getLeagueRanking(accountObject).then(function(res){
                    var rank = new String(res[0]['tier']);
                    var str = rank.toLowerCase();
                    msg.channel.send("Rank: " + str + " " + res[0]['rank']);
                    //Shoutout to Sperlmutter for helping me out!
                })
            })
            .catch(console.log);
        LeagueAPI.getSummonerByName(summonerName)
            .then(function(accountObject) {
            // Gets match list for the account
            return LeagueAPI.getMatchList(accountObject);
            })
            .then(function(activeGames) { 
                var i;
                for (i = 0; i < 5; i++){
                    var matchID = activeGames['matches'][i]['gameId'];
                    //console.log(matchID);
                    LeagueAPI.getMatch(matchID) .then(function (res){
                        var z;
                        for(z = 0; z < 10; z++){
                            if(res['participantIdentities'][z]['player']['summonerName'] == summonerName){
                                msg.channel.send("Participant #" + (z+1) + " " + res['participantIdentities'][z]['player']['summonerName']);
                            }
                            //console.log("Participant #" + (z+1) + " " + res['participantIdentities'][z]['player']['summonerName']);
                        }
                    }) .catch(console.log);
                }
            })
            .catch(console.log);
    }
})
bot.login(token);


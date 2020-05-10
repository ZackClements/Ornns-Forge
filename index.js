//Discord Bot
const Discord = require('discord.js');
const bot = new Discord.Client();
const token = 'NzA1MjIxMTQ5MTkzMTQyMjcz.Xqoj0Q.7EpgINgGEnCZ6Taxwm1Li08x8cM';
//const test = require('./Test/test.js'); UNCOMMENT WHEN ALL CONSOLE.LOG IS REMOVED FROM TEST.JS
//const champion = require('./champions/champion.json'); IF PULLING FROM JSON UNCOMMENT
const championName = require('./champions/championName.js');

//League API
let LeagueAPI = require('leagueapiwrapper');
leagueAPIKey = "RGAPI-0458aa9b-0d48-4d43-b1d9-12a76b683b41";
LeagueAPI = new LeagueAPI(leagueAPIKey, Region.NA);

bot.on('ready',() =>{
    console.log('Bot is online');
})
bot.on('message', msg =>{
    const content = msg.content.split("! ");
    if(content[0] === "!Ornn!"){

        msg.channel.send({files: ['./images/Ornn.jpg']});
        msg.channel.send("Name's Ornn. No further pleasantries needed. ");
    }
    if(content[0] === "summoner"){ //summoner! command
        const summonerName = content[1];
        LeagueAPI.getSummonerByName(summonerName) //Using someones username as a parameter, outputs basic account info
            .then(function(accountObject){
                msg.channel.send("Here is " + "**" + summonerName + "**" + "'s basic information: ")
                msg.channel.send("Summoner Level: " + accountObject['summonerLevel']);
                LeagueAPI.getLeagueRanking(accountObject) //Uses summoner ID (found above) to ouput basic rank info
                    .then(function(res){
                        const rank = String(res[0]['tier']).toLowerCase(); //Turns TIER into tier.
                        const capitalizeString = rank.charAt(0).toUpperCase() + rank.slice(1); //Turns tier into Tier
                        msg.channel.send("Rank: " + capitalizeString + " " + res[0]['rank']);
                        //Shout out to Sperlmutter for helping me out!
                    })
                return LeagueAPI.getChampionMastery(accountObject) //Uses summonerID (found above) to return champion mastery data
                .then(function(championMasteryList){
                        msg.channel.send("Top 3 champions:");
                        for (let i = 0; i < 3; i++){
                            const champId = championMasteryList[i]['championId'];
                            const champLevel = championMasteryList[i]['championLevel'];
                            const championPoints = championMasteryList[i]['championPoints'];
                            msg.channel.send("**" + championName.getChampName(champId) + "**" + ", Mastery level: " + champLevel + " : " + championPoints + " points");
                        }
                    })
            })
            .catch(console.log);
    }
})
bot.login(token);


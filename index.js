//Discord Bot
const Discord = require('discord.js');
const bot = new Discord.Client();
const token = 'XXXXXXXXXXX';
const championName = require('./functions/champName.js');


//League API
let LeagueAPI = require('leagueapiwrapper');
leagueAPIKey = "XXXXXXXXXXXXXXXXX";
LeagueAPI = new LeagueAPI(leagueAPIKey, Region.NA);

//Confirms bot is online
bot.on('ready',() =>{
    console.log('Bot is online');
})

bot.on('message', msg =>{
    const content = msg.content.split("! "); //Separates commands from arguments

    //Base command
    if(content[0] === "!Ornn!"){

        msg.channel.send({files: ['./images/Ornn.jpg']});
        msg.channel.send("Name's Ornn. No further pleasantries needed. ");
    }

    //Summoner command, input username outputs summoner level, rank (lp), and top 3 highest mastery champions
    if(content[0] === "summoner"){
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
                        msg.channel.send("Top 3 functions:");

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


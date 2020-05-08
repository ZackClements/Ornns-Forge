
//League API
let LeagueAPI = require('leagueapiwrapper');
leagueAPIKey = "RGAPI-a74bf676-7717-4511-9787-20ea2d140d70";
LeagueAPI = new LeagueAPI(leagueAPIKey, Region.NA);
var summoner = 'Knighteray'

/*LeagueAPI.getSummonerByName('LeagueOfDrMundo')
	.then(function(accountObject) {
		console.log(accountObject);
	})
	.catch(console.log);
*/

LeagueAPI.getSummonerByName(summoner)
	.then(function(accountObj) {
		// Returns a list of every single champion played by the account, along with mastery details
		return LeagueAPI.getChampionMastery(accountObj);
	})
	.then(function(championMasteryList)
	{
		console.log(championMasteryList[0]);
	})
	.catch(console.log);


//This fucking monstronsity returns the players match history
/*LeagueAPI.getSummonerByName(summoner)
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
					if(res['participantIdentities'][z]['player']['summonerName'] == 'CCE Logic'){
						console.log("Participant #" + (z+1) + " " + res['participantIdentities'][z]['player']['summonerName']);
					}
					//console.log("Participant #" + (z+1) + " " + res['participantIdentities'][z]['player']['summonerName']);
				}
			}) .catch(console.log);
		}
	})
	.catch(console.log);
*/
/* Use this to get rank information (rank, lp, wins/losses, etc..)
LeagueAPI.getSummonerByName(summoner).then(function (accountObject) {
  LeagueAPI.getLeagueRanking(accountObject).then(function (res) {
    console.log(res[0]['wins']);
  }).catch(function (err) {
    console.log(err);
  });
});
  */


  /*LeagueAPI.getSummonerByName(summoner)
    .then(function(accountObject){
        bot.on("message", msg =>{
            if(msg.content === ("!summoner")) {
                msg.author.send("Level: " + accountObject['summonerLevel']);
            }
        })
    })
*/
/*
bot.on("message", msg =>{
    if(msg.content === ("Ornn! " + summoner)) {
        msg.reply(accountObject['name']);
    }
})

*/
module.exports = { 
	testFunction: function() {
		return console.log(1+1);
	}
}
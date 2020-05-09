//League API
let LeagueAPI = require('leagueapiwrapper');
leagueAPIKey = "RGAPI-fc367ca4-0398-4ef4-8991-b72148520030";
LeagueAPI = new LeagueAPI(leagueAPIKey, Region.NA);

//let champName = require('./champions/championName.js');


/* Mastery data
LeagueAPI.getSummonerByName(summoner)
	.then(function(accountObj) {
		// Returns a list of every single champion played by the account, along with mastery details
		return LeagueAPI.getChampionMastery(accountObj);
	})
	.then(function(championMasteryList)
	{
		var champId = championMasteryList[0]['championId'];
		console.log(champName.getChampName(champId));
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
/* Outputs the users participant # for their last 5 games played
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
                            if(res['participantIdentities'][z]['player']['summonerName'] === summonerName){
                                msg.channel.send("Participant #" + (z+1) + " " + res['participantIdentities'][z]['player']['summonerName']);
                            }
                            //console.log("Participant #" + (z+1) + " " + res['participantIdentities'][z]['player']['summonerName']);
                        }
                    }) .catch(console.log);
                }
            })
            .catch(console.log);
 */
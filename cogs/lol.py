from riotwatcher import LolWatcher, ApiError
import config

lol = LolWatcher(config.TOKENS['RIOT'])
region = 'na1'


def get_summoner_level(summoner):
    """Returns summoner level
            :param string summoner: summoner name
            :rtype: string
    """
    return lol.summoner.by_name(region=region, summoner_name=summoner)['summonerLevel']


def get_summoner_role(summoner):
    """Returns the summoners most played role in last 10 games
            :param string summoner: summoner name
            :rtype: string
    """
    account_id = lol.summoner.by_name(region=region, summoner_name=summoner)['accountId']

    # Last 10 games played
    match_list = lol.match.matchlist_by_account(region=region, encrypted_account_id=account_id, end_index=10)
    roles = {}

    for x in range(10):
        roles[f'Game {x}'] = match_list['matches'][x]['lane']

    track = {}
    for key, value in roles.items():
        if value not in track:
            track[value] = 0
        else:
            track[value] += 1

    return max(track, key=track.get)


def get_summoner_winrate(summoner):
    """Returns the summoners win rate out of their last 10 games
            :param string summoner: summoner name
            :rtype: double
    """
    win_count = 0
    account_id = lol.summoner.by_name(region=region, summoner_name=summoner)['accountId']

    # Last 10 games played
    match_list_object = lol.match.matchlist_by_account(region=region, encrypted_account_id=account_id, end_index=10)

    for x in range(10):
        game_id = match_list_object['matches'][x]['gameId']
        match = lol.match.by_id(region=region, match_id=game_id)
        for y in range(10):
            if match['participantIdentities'][y]['player']['summonerName'] == summoner:
                if match['participants'][y]['stats']['win']:
                    win_count = win_count + 1
    return win_count * 10


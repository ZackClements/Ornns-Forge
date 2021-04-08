from cogs import lol
import discord
from discord.ext import commands


class LolCog(commands.Cog):

    def __init__(self, bot):
        self.bot = bot

    @commands.command()
    async def summoner(self, ctx, summoner):
        """Returns basic information for the summoner name entered"""
        summoner_level = lol.get_summoner_level(summoner)
        summoner_lane = lol.get_summoner_role(summoner)
        summoner_winrate = lol.get_summoner_winrate(summoner)
        embed = discord.Embed(
            description='Data from Riot Games',
            color=discord.Color.dark_red(),
            title=f'Stats for {summoner}'
        )
        embed.set_author(name='League of Legends',
                         icon_url='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth'
                                  '%3Fid%3DOIP.2e_J4w78XP0maa_sq4mOkgAAAA%26pid%3DApi&f=1')
        embed.add_field(name='Summoner Level', value=summoner_level)
        embed.add_field(name='Lane', value=summoner_lane.capitalize(), inline=False)
        embed.add_field(name='Win %', value=summoner_winrate)

        await ctx.send(embed=embed)


def setup(bot):
    bot.add_cog(LolCog(bot))

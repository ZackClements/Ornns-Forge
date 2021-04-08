import discord
from discord.ext import commands
import config

prefix = "!"

intitial_extensions = ['cogs.lol_cog']

bot = commands.Bot(command_prefix=prefix, description='Bot for LoL and LoR')

if __name__ == '__main__':
    for extension in intitial_extensions:
        bot.load_extension(extension)


@bot.event
async def on_ready():
    print('Connected')


bot.run(config.TOKENS['DISCORD'], bot=True, reconnect=True)

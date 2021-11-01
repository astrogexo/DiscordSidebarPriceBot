/** ------------------------------------------------------------------------------------------------
 *
 *                         _(`-')    (`-').-> _  (`-')<-.(`-')
 *                        ( (OO ).-> ( OO)_   \-.(OO ) __( OO)
 *                        \    .'_ (_)--\_)  _.'    \'-'---.\
 *                         '`'-..__)/    _ / (_...--''| .-. (/
 *                         |  |  ' |\_..`--. |  |_.' || '-' `.)
 *                         |  |  / :.-._)   \|  .___.'| /`'.  |
 *                         |  '-'  /\       /|  |     | '--'  /
 *                         `------'  `-----' `--'     `------'
 *
 *      Program:  DiscordSidebarPriceclient (DSPB)
 *       Author:  Piper
 *                  Discord:  cucurbit
 *                   Reddit:  piper_cucu
 *                  Twitter:  @PiperCucu
 *                   GitHub:  pipercucu
 *
 *  Description:  Discord client for pulling cryptocurrency price data at intervals and displaying it in the users sidebar
 *
 *                                ♡ Made with love in Alabama, USA
 * -------------------------------------------------------------------------------------------------
 */

'use strict'

const Discord = require('discord.js')
const rp = require('request-promise')
const Beans = require('./Beans')
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] })

let TICKER = process.env.TOKEN_SYMBOL
let UPDATE_RATE = process.env.UPDATE_RATE // Price update interval in milliseconds
let guildMeCache = []
let UPDATE_INTERVAL

// Ready up activities
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
    client.user.setActivity(`😀`)
    client.guilds.cache.each(guild => guildMeCache.push(guild.me))

    // Get update interval from args, default to 1 minute if unpopulated
    if (typeof UPDATE_RATE == 'undefined') {
        UPDATE_INTERVAL = 10000 // Default price update rate is once every 10 seconds
    } else {
        UPDATE_INTERVAL = parseInt(UPDATE_RATE)
    }

    getPrice()
    setInterval(getPrice, UPDATE_INTERVAL)
})

async function getPrice() {
    let currPrice = await Beans.getPrice('SolarBeam')
    showPrice(currPrice) // Update discord client display
}

function showPrice(currPrice) {
    let showPriceType = '$'

    guildMeCache.forEach(guildMe => 
        guildMe.setNickname(`${TICKER} : ${showPriceType}${currPrice}`),
        client.user.setActivity('SolarBeam')
        )

    console.log(`${TICKER} $${currPrice} `)
}

// New server join event that causes the guild cache to refresh
client.on('guildCreate', guild => {
    client.guilds.cache.each(guild => guildMeCache.push(guild.me))
    console.log(`New server has added the client! Name: ${guild.name}`)
})

client.login(process.env.BOT_TOKEN)

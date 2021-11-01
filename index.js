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
 *      Program:  DiscordSidebarPriceBot (DSPB)
 *       Author:  Piper
 *                  Discord:  cucurbit
 *                   Reddit:  piper_cucu
 *                  Twitter:  @PiperCucu
 *                   GitHub:  pipercucu
 *
 *  Description:  Discord bot for pulling cryptocurrency price data at intervals and displaying it in the users sidebar
 * 
 *                                ♡ Made with love in Alabama, USA
 * ------------------------------------------------------------------------------------------------- 
 */

 'use strict'

 const auth = require('./auth.json');
 const Discord = require('discord.js');
 const rp = require('request-promise');
 const Beans = require('./Beans')
 const bot = new Discord.Client();
 
 let TICKER = process.env.TOKEN_SYMBOL
 let UPDATE_RATE = process.env.UPDATE_RATE;  // Price update interval in milliseconds
 let guildMeCache = [];
 let UPDATE_INTERVAL;
 
 // Ready up activities
 bot.on('ready', () => {
         console.log(`Logged in as ${bot.user.tag}!`);
         bot.user.setActivity(`😀`);
         bot.guilds.cache.each(guild => guildMeCache.push(guild.me));
 
         // Get update interval from args, default to 1 minute if unpopulated
         if (typeof UPDATE_RATE == 'undefined') {
             UPDATE_INTERVAL = 10000; // Default price update rate is once every 10 seconds
         }
         else {
             UPDATE_INTERVAL = parseInt(UPDATE_RATE);
         }
 
         getPrice();
         setInterval(getPrice, UPDATE_INTERVAL);
     }
 );
 
 async function getPrice(): Promise<void> {   
 
     let currPrice = await Beans.getPrice();
     showPrice(currPrice); // Update discord bot display
 }
 
 function showPrice(currPrice) {
 
     let showPriceType = '$';  
 
     guildMeCache.forEach(guildMe => 
         guildMe.setNickname(`${TICKER} : ${showPriceType}${currPrice}`));
 
     console.log(`${TICKER} $${currPrice} `);
 
 }
 
 
 // New server join event that causes the guild cache to refresh
 bot.on('guildCreate', guild => {
         bot.guilds.cache.each(guild => guildMeCache.push(guild.me));
         console.log(`New server has added the bot! Name: ${guild.name}`);
     }
 );
 
 bot.login(process.env.BOT_KEY);
 
 
 
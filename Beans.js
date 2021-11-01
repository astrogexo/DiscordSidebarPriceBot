const provider = require('./provider')
const { ethers } = require('ethers')
const PairABI = require('./Pair.abi.json')
const Movr = require('./Movr')
const { SolarBeam } = require('./Movr')



async function getPrice(dex) {

    let MOVR_BEANS_LP = '0x12d4c0301bd491657fcd4d895b51bce36c30589b' // SolarBeam
    let reverse = false; 
    let BeansAmount;
    let MovrAmount;

    switch(dex) {
        case 'MoonSwap' :
            MOVR_BEANS_LP = `0x20472b3cca87f1e8aed70e1cf3ac31e97ed13a1e`
            break;
        case 'FreeRiver' :
            MOVR_BEANS_LP = `0x120dac3c005aaeb5dc83a6a5379dd7d3f13bc4d1`    
            break;    
        case 'Sushi' :
            MOVR_BEANS_LP = `0x2b5e714d52860500e6502b29b5df5fb41cb51012`    
            reverse = true; 
            break; 
        default :   
        // DEFAULT: Use the SolarBeam LP defined above
    }

    const MovrBeansPair = new ethers.Contract(MOVR_BEANS_LP, PairABI, provider.movr)
    if (reverse) {
        [BeansAmount, MovrAmount] = await MovrBeansPair.getReserves()
    }
    else {
        [MovrAmount, BeansAmount] = await MovrBeansPair.getReserves()
    }

    const MovrPrice = await Movr.getPrice()
    return (MovrAmount * MovrPrice) / BeansAmount
}

const Beans = {
    getPrice,
}

module.exports = Beans

const provider = require('./provider')
const { ethers } = require('ethers')
const PairABI = require('./Pair.abi.json')
const Movr = require('./Movr')


// SolarBeam
const MOVR_BEANS_LP = '0x12d4c0301bd491657fcd4d895b51bce36c30589b'

async function getPrice() {
    const MovrBeansPair = new ethers.Contract(MOVR_BEANS_LP, PairABI, provider.movr)
    const [MovrAmount, BeansAmount] = await MovrBeansPair.getReserves()
    const MovrPrice = await Movr.getPrice()
    return (MovrAmount * MovrPrice) / BeansAmount
}

const Beans = {
    getPrice,
}

module.exports = Beans

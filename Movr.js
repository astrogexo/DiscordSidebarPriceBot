const provider = require('./provider')
const { ethers } = require('ethers')
const PairABI = require('./Pair.abi.json')

// solarbeam
const MOVR_USDC = '0xe537f70a8b62204832B8Ba91940B77d3f79AEb81'

async function getPrice() {
    const UsdcPair = new ethers.Contract(MOVR_USDC, PairABI, provider.movr)
    const [reserve0, reserve1] = await UsdcPair.getReserves()
    return (reserve1 * 1e12) / reserve0
}

const Movr = {
    getPrice,
}

module.exports = Movr

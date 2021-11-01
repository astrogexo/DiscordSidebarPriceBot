
const { ethers } = require('ethers')

// RPCs for different chains

// // Avalanche Mainnet (AVAX)
// const avax = new ethers.providers.JsonRpcProvider(process.env.AVAX_RPC)

// // Binance Mainnet (BSC)
// const bsc = new ethers.providers.JsonRpcProvider(process.env.BSC_RPC)

// // Ethereum Mainnet (ETH)
// const eth = new ethers.providers.JsonRpcProvider(process.env.MAINNET_RPC)

// // Fantom Opera (FTM)
// const ftm = new ethers.providers.JsonRpcProvider(process.env.FTM_RPC) 

// Moonriver Mainnet (MOVR)
const movr = new ethers.providers.JsonRpcProvider(process.env.MOVR_RPC)

// // Polygon Mainnet (MATIC)
// const matic = new ethers.providers.JsonRpcProvider(process.env.MATIC_RPC)

module.exports = {
    movr,
}

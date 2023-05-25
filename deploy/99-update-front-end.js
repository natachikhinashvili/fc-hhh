const { ethers, network } = require("hardhat")
const fs = require("fs")

const FRONT_END_ADDRESSES_FILE = "../lottery-smartcontract-nextjs/constants/contractAddresses.json"
const FRONT_END_ABI_FILE = "../lottery-smartcontract-nextjs/constants/abi.json"

module.exports = async function (){
    if(process.env.UPDATE_FRONT_END){
        console.log("Updating front end")
        updateContractAddresses()
        updateAbi()
    }
}

async function updateAbi(){
    const raffle = await ethers.getContract("Raffle")
    fs.writeFileSync(FRONT_END_ABI_FILE, raffle.interface.format(ethers.utils.FormatTypes.json))
}

async function updateContractAddresses(){
    const raffle = await ethers.getContract("Raffle")
    const chainId = network.config.chainId.toString()
    const currentAddresses = JSON.parse(fs.readFileSync(FRONT_END_ADDRESSES_FILE, "utf8"))
    if (chainId in contractAddresses) {
        if(contractAddresses[chainId].includes(raffle.address)){
            contractAddresses[chainId].push(raffle.address)
        }
    } {
        currentAddresses[chainId] = [raffle.address]
    }
    fs.writeFileSync(FRONT_END_ADDRESSES_FILE, JSON.stringify(currentAddresses))
}

module.exports.tags = ["all", "frontend"]
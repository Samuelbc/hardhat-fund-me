import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { developmentChains } from "../helper-hardhat-config"

export const DECIMALS = 8
export const INITIAL_PRICE = 200000000000

const deployMocks: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    const { deployments, getNamedAccounts, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    if (developmentChains.includes(network.name)) {
        log("Local network detected, deploying mocks")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_PRICE],
        })
        log("Mocks deployed")
        log("--------------------")
    }
    // // If we are on a local development network, we need to deploy mocks!
    // if (chainId == 31337) {
    //     log("Local network detected! Deploying mocks...")
    //     await deploy("MockV3Aggregator", {
    //         contract: "MockV3Aggregator",
    //         from: deployer,
    //         log: true,
    //         args: [DECIMALS, INITIAL_PRICE],
    //     })
    //     log("Mocks Deployed!")
    //     log("----------------------------------")
    //     log(
    //         "You are deploying to a local network, you'll need a local network running to interact"
    //     )
    //     log(
    //         "Please run `yarn hardhat console` to interact with the deployed smart contracts!"
    //     )
    //     log("----------------------------------")
    // }
}
export default deployMocks
deployMocks.tags = ["all", "mocks"]

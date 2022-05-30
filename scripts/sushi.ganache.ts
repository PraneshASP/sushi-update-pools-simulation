import * as assert from "assert";

const chalk: any = require("chalk");
import * as ethers from "ethers";
import Ganache from "ganache";

const url = process.env.ETH_RPC_URL || "mainnet";
const deleteCache =
  process.env.CLEAR_CACHE && Number(process.env.CLEAR_CACHE) === 1;
const blockGasLimit = ethers.BigNumber.from(
  process.env.GAS_LIMIT
).toHexString();
const blockNumber = Number(process.env.FORK_BLOCK);
const defaultBalance = "0xffffffffffffffffffffff";
const sushiAddress = "0xef0881ec094552b2e128cf945ef17a6752b4ec5d";
const sushiAbi = ["function massUpdatePools(uint256[]) external"];

async function main(): Promise<void> {
  /*
   * setup
   */

  console.log(chalk.bold("Setting up Ganache..."));
  console.time("setup-ganache");
  console.group();

  const { ganache, provider } = await prepareGanache({
    url,
    blockNumber,
    blockGasLimit,
    defaultBalance,
    deleteCache,
  });

  const sushi = new ethers.Contract(sushiAddress, sushiAbi, provider);

  const owner = provider.getSigner();

  console.groupEnd();
  console.timeEnd("setup-ganache");
  console.log("");

  /*
   * simulation
   */

  console.log(chalk.bold("Simulating massUpdatePools()..."));
  console.time("simulate-update-pools");
  console.group();
  const tx = await sushi
    .connect(owner)
    .massUpdatePools(Array.from(Array(50).keys()), { gasLimit: blockGasLimit });

  const receipt = await provider.waitForTransaction(tx.hash);
  assert.ok(
    receipt.status,
    `transaction failed. receipt: ${JSON.stringify(receipt)}`
  );
  console.groupEnd();
  console.timeEnd("simulate-update-pools");
  console.log("");

  // @ts-ignore looks like ganche has a bad typing
  await ganache.disconnect();
}

interface PrepareGanacheOptions {
  url: string;
  blockNumber: "latest" | number;
  blockGasLimit: string;
  defaultBalance: string;
  deleteCache: boolean;
}

async function prepareGanache({
  url,
  blockNumber,
  blockGasLimit,
  defaultBalance,
  deleteCache,
}: PrepareGanacheOptions): Promise<{
  ganache: ReturnType<typeof Ganache.provider>;
  provider: ethers.providers.JsonRpcProvider;
}> {
  const ganache = Ganache.provider({
    fork: {
      url,
      blockNumber,
      deleteCache,
    },
    miner: { blockGasLimit },
    wallet: {
      // ganache expects value in ETH
      defaultBalance: ethers.utils.formatEther(defaultBalance),
    },
    logging: {
      quiet: false,
    },
    legacyInstamine: true,
  });

  const provider = new ethers.providers.Web3Provider(ganache);

  return { ganache, provider };
}

main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });

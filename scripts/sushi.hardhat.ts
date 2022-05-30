import * as assert from "assert";

const chalk: any = require("chalk");
import { ethers, network } from "hardhat";
import "@nomiclabs/hardhat-ethers";

async function main(): Promise<void> {
  console.log(chalk.bold("Setting up Hardhat..."));
  console.time("setup-hardhat");
  console.group();

  // Impersonate owner
  const abi = [
    "function massUpdatePools(uint256[]) external",
    "function owner() external view returns (address)",
  ];
  const sushi = new ethers.Contract(
    "0xef0881ec094552b2e128cf945ef17a6752b4ec5d",
    abi,
    ethers.provider
  );
  const ownerAddr = await sushi.owner({
    blockTag: Number(process.env.FORK_BLOCK),
    gasLimit: process.env.GAS_LIMIT,
  });
  await network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [ownerAddr],
  });
  const owner = await ethers.getSigner(ownerAddr);

  // Fund owner (it's a contract)
  await network.provider.send("hardhat_setBalance", [
    owner.address,
    "0xffffffffffffffffffff",
  ]);

  console.groupEnd();
  console.timeEnd("setup-hardhat");
  console.log("");

  // Execute transaction
  console.log(chalk.bold("Simulating massUpdatePools()..."));
  console.time("simulate-update-pools");
  console.group();
  const tx = await sushi
    .connect(owner)
    .massUpdatePools(Array.from(Array(50).keys()), {
      gasLimit: process.env.GAS_LIMIT,
    });
  const receipt = await ethers.provider.getTransactionReceipt(tx.hash);
  assert.ok(
    receipt.status,
    `transaction failed. receipt: ${JSON.stringify(receipt)}`
  );
  console.log("Gas used:", receipt.gasUsed.toString());
  console.groupEnd();
  console.timeEnd("simulate-update-pools");
  console.log("");
}

main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });

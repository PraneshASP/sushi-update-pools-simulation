# Sushi MassUpdatePools Benchmarks

This repository benchmarks performance of various Ethereum development
frameworks by simulating a call to Sushi's (MasterChefV2) `massUpdatePools()` method. This method
uses about ~1M gas for updating the first 50 pools/farms.

## Benchmarks

Benchmarks were run at mainnet block 14,864,453.

Notes on benchmarks:

- "Local RPC" benchmarks using local node (mainnet fork).
- "Cached" benchmarks use RPC responses that the framework caches locally instead of making HTTP requests.
- Benchmarks were performed on Ubuntu 20 with a 11th Gen Intel® Core™ i7-11370H @ 3.30GHz × 8 Processor

| Framework | Version                                                   |
| --------- | --------------------------------------------------------- |
| Ganache   | 7.0.3                                                     |
| Hardhat   | 2.9.2                                                     |
| Foundry   | forge 0.2.0 (7aa9f1a 2022-03-29T00:03:57.475393587+00:00) |

| Framework | Local RPC | Cached |
| --------- | --------- | ------ |
| Ganache   | 2m4.615s  | 11.88s |
| Hardhat   | 1m20.069s | 4.47s  |
| Foundry   | 1m17.525s | 1.53s  |

Gas usage:

| Framework | Gas Used  |
| --------- | --------- |
| Ganache   | 1,013,536 |
| Hardhat   | 1,013,536 |
| Foundry   | 1,016,027 |

## Usage

1. Run `cp .env.example .env`, and in the resulting `.env` file enter a URL to an Ethereum archive node in the `ETH_RPC_URL` environment variable. ([Alchemy](https://www.alchemy.com/) provides free archive node data).

2. Run `yarn` to install dependencies for Ganache and Hardhat

3. Install Foundry's forge using the installation instructions[here](https://github.com/gakonst/foundry/)

4. Run `forge install` to install dependencies for Foundry

5. Run any command in the `Makefile` to benchmark that tool. For example, use `make benchmark-hardhat` to run the simulation against Hardhat. Alternatively, run `make benchmark-all` to run all tools

## Tips

- Set `export CLEAR_CACHE=1` in your `.env` file to clear the Ganache and Hardhat caches
- Consider running the benchmarks via Docker. See the comment header in [the Dockerfile](./Dockerfile) for details.

## Acknowledgement

- This simulation is inspired by Matt's [Convex System Shutdown simulation](https://github.com/mds1/convex-shutdown-simulation)

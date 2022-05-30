// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.6;

import "ds-test/test.sol";

interface Hevm {
    function store(
        address c,
        bytes32 loc,
        bytes32 val
    ) external;
}

interface ISushi {
    function owner() external view returns (address);

    function massUpdatePools(uint256[] memory) external;
}

contract sushiTest is DSTest {
    Hevm constant hevm = Hevm(HEVM_ADDRESS);
    ISushi constant sushi = ISushi(0xEF0881eC094552b2e128Cf945EF17a6752B4Ec5d);

    function setUp() public {
        hevm.store(
            address(sushi),
            bytes32(uint256(4)),
            bytes32(uint256(uint160(address(this))))
        );
        assertEq(sushi.owner(), address(this));
    }

    function testMassUpdatePools() public {
        uint256[] memory pId = new uint256[](50);
        pId[0] = 0;
        pId[1] = 1;
        pId[2] = 2;
        pId[3] = 3;
        pId[4] = 4;
        pId[5] = 5;
        pId[6] = 6;
        pId[7] = 7;
        pId[8] = 8;
        pId[9] = 9;
        pId[10] = 10;
        pId[11] = 11;
        pId[12] = 12;
        pId[13] = 13;
        pId[14] = 14;
        pId[15] = 15;
        pId[16] = 16;
        pId[17] = 17;
        pId[18] = 18;
        pId[19] = 19;
        pId[20] = 20;
        pId[21] = 21;
        pId[22] = 22;
        pId[23] = 23;
        pId[24] = 24;
        pId[25] = 25;
        pId[26] = 26;
        pId[27] = 27;
        pId[28] = 28;
        pId[29] = 29;
        pId[30] = 30;
        pId[31] = 31;
        pId[32] = 32;
        pId[33] = 33;
        pId[34] = 34;
        pId[35] = 35;
        pId[36] = 36;
        pId[37] = 37;
        pId[38] = 38;
        pId[39] = 39;
        pId[40] = 40;
        pId[41] = 41;
        pId[42] = 42;
        pId[43] = 43;
        pId[44] = 44;
        pId[45] = 45;
        pId[46] = 46;
        pId[47] = 47;
        pId[48] = 48;
        pId[49] = 49;

        sushi.massUpdatePools(pId);
    }
}

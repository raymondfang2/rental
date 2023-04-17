// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("MyToken", "RAY") {
        _mint(msg.sender, 1000 * 10 ** decimals());  //Default decimals=18 like ETH
    }
}

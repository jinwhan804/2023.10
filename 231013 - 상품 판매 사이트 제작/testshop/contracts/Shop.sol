// SPDX-License-Identifier: MIT
pragma solidity^0.8.19;

import "./ERC20.sol";

contract Shop is ERC20{
    constructor() ERC20("Shop","KTK",100000){}

    struct Items {
        string url;
        string name;
    }

    uint256 private tokenPrice = 100 ether;

    mapping(address => Items[]) public inventory;

    function getItems() public view returns(Items[] memory){
        return inventory[msg.sender];
    }
    
    function buyItem(string memory _url, string memory _name, uint _price) public {
        require(balances[msg.sender] >= _price * tokenPrice);
        balances[msg.sender] -= _price * tokenPrice;
        totalSupply += _price * tokenPrice;

        inventory[msg.sender].push(Items(_url,_name));
    }
}
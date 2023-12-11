// SPDX-License-Identifier: MIT
pragma solidity^0.8.19;

import "./IERC20.sol";

contract ERC20 is IERC20{
    string public name;

    string public symbol;

    uint8 public decimals = 18;

    uint public override totalSupply;

    address private owner;

    mapping(address => uint) public balances;

    mapping(address => mapping (address=>uint)) public override allowance;

    receive() external payable{
        uint amount = msg.value * 200;

        require(balances[owner] >= amount);
        balances[owner] -= amount;
        balances[msg.sender] += amount;

        if(msg.sender == owner){
            mint(amount);
        }
    }

    function mint(uint amount) internal{
        balances[msg.sender] += amount;
        totalSupply += amount;
    }

    constructor(string memory _name, string memory _symbol, uint256 _amount){
        owner = msg.sender;
        name = _name;
        symbol = _symbol;
        mint(_amount * (10 ** uint256(decimals)));
    }

    function balanceOf(address account) external view override returns(uint){
        return balances[account];
    }

    function transfer(address to, uint amount) external override returns(bool){
        balances[msg.sender] -= amount;
        balances[to] += amount;
        return true;
    }

    function approve(address spender, uint amount) external override returns(bool){
        allowance[msg.sender][spender] = amount;
        return true;
    }

    function transferFrom(address spender, address to, uint amount) external override returns(bool){
        require(allowance[spender][msg.sender] >= amount);
        allowance[spender][msg.sender] -= amount;
        balances[spender] -= amount;
        balances[to] += amount;
    }
}
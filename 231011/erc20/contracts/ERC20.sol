// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./IERC20.sol";

contract ERC20 is IERC20{
    // 토큰 이름
    string public name;

    // 토큰 단위
    string public symbol;

    // 토큰의 소수점 자리 (기본 18자리)
    uint8 public decimals = 18;

    // 토큰의 현재 총 발행량
    uint public override totalSupply;

    address private owner;

    mapping(address => uint) public balances;
    // 아래 형태로 데이터 받음
    // {
    //     "0x23f5801351321" : 1000
    // }

    mapping(address => mapping(address => uint)) public override allowance;
    // 아래 형태로 데이터 받음
    // {
    //     "0x23f580135125132321" : {
    //         "0x5468321685843" : 500
    //     }
    // }

    // 익명 함수 receive : CA에 이더를 받으면 자동으로 실행되는 메소드
    receive() external payable{
        // 이더를 받았을 때 실행되는 동작

        // 배포자가 토큰의 발행량을 관리하고 다른 이용자가 토큰은 얻고싶어 할 때 
        // 배포자가 정한 비율에 따라 토큰을 가져갈 수 있게
        uint amount = msg.value * 200;

        require(balances[owner] >= amount);
        balances[owner] -= amount;
        balances[msg.sender] += amount;

        if(msg.sender == owner){
            mint(amount);
        }
    } 

    // 컨트랙트 생성자
    constructor(string memory _name, string memory _symbol, uint256 _amount){
        owner = msg.sender;
        name = _name;
        symbol = _symbol;
        mint(_amount * (10 ** uint256(decimals)));
    }

    function mint(uint amount) internal {
        balances[msg.sender] += amount;
        totalSupply += amount;
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

    function transferFrom(address sender, address to, uint amount) external override returns(bool){
        require(allowance[sender][msg.sender] >= amount);
        allowance[sender][msg.sender] -= amount;
        balances[sender] -= amount;
        balances[to] += amount;
    }

    function burn(uint amount) external {
        balances[msg.sender] -= amount;
        totalSupply -= amount;
    }
}
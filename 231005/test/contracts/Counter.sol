// SPDX-Liscense-Identifier: MIT

pragma solidity ^0.8.13;

contract Counter{
    uint256 value;

    constructor(){}

    function increment () public{
        value += 1;
    }

    function decrement () public{
        require(value != 0, "value 0 error");
        // 조건문이 통과되지 않으면 가스비 지불하지 않고 에러 구문 표시
        value -= 1;
    }

    function getValue() public view returns (uint256){
        return value;
    }
}
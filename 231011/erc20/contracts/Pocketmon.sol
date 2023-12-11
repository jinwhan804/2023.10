// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./ERC20.sol";

contract Pocketmon is ERC20{
    constructor() ERC20("Pocketmon","PTK", 10000){}

    // 포켓몬 객체 생성. 하나의 객체가 하나의 포켓몬 데이터

    struct Pockets{
        string url;
        string name;
    }

    // 구매자 주소
    struct Users{
        address account;
    }

    // ERC20 토큰 지불로 포켓몬 구매
    uint256 private tokenPrice = 1000 ether;

    // 배열로 포켓몬 이름 선언 (이후 랜덤으로 포켓몬 얻도록)
    string[] pocketmonName = ["Pikachu","Kobuk","Charmander"];

    // 포켓몬 이미지
    string[] pocketmonUrl = [
        "https://mblogthumb-phinf.pstatic.net/20160817_259/retspe_14714118890125sC2j_PNG/%C7%C7%C4%AB%C3%F2_%281%29.png?type=w800",
        "https://t1.daumcdn.net/brunch/service/user/cnoC/image/ZjbqVcRtpcjbcd56WU175Iku0ZA.JPEG",
        "https://i.namu.wiki/i/wkwHbl319sCFlTR6pt9P4AnhauWeYt9a28QtGf50DbR2hAUrZ7hcabdwI3KvPSHJd6JoLJ9PZMONNXcdE0sOqg.webp"
    ];

    mapping(address => Pockets[]) public pocketmons;

    // 한 번이라도 포켓몬을 구매한 사람들의 주소를 가지고 있는 객체
    Users[] public users;

    // 보유 중인 포켓몬 조회
    function getPocketmon() public view returns(Pockets[] memory){
        return pocketmons[msg.sender];
    }

    function getPocketmonUsers() public view returns(Users[] memory){
        return users;
    }

    function buyPocketmon() public{
        require(balances[msg.sender] >= tokenPrice);
        balances[msg.sender] -= tokenPrice;
        totalSupply -= tokenPrice;

        uint random = uint(
            keccak256(
                abi.encodePacked(block.timestamp,block.coinbase,block.number)
            )
        );

        random = uint(random % 3);
        // Pockets 구조체 형태로 객체를 만들어서 배열에 푸쉬
        pocketmons[msg.sender].push(Pockets(pocketmonUrl[random],pocketmonName[random]));

        // 유저가 한 번이라고 구매한 적이 있는지 확인
        bool isUser = false;
        for(uint256 i = 0; i < users.length; i++){
            if(users[i].account == msg.sender){
                isUser = true;
                break;
            }
        }

        if(!isUser){
            users.push(Users(msg.sender));
        }
    }
}
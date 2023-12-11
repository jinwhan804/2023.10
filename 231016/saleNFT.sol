// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./myNFT.sol";

contract SaleNFT {
    // 누군가 판매등록을 한 NFT들이 보여야 하고 판매금액을 다루는 컨트랙트

    // 상호작용할 CA 필요
    MyNFT public _nft;
    // 상호작용할 CA를 담을 상태 변수

    constructor(address _nftCA){
        _nft = MyNFT(_nftCA);
        // 상호작용할 CA 인스턴스 생성
    }

    function _saleNFTmint(string memory url) public{
        // CA에서 CA로 메세지 전송 메서드 실행
        _nft.minting(url);
    }

    // 판매에 대한 내용의 함수 작성
    // saleNFT에서 myNFT로 메세지를 보내서 NFT 권한을 위임받는 함수 작성
    function setApprovalForAll() public {
        // 판매 컨트랙트가 컨트랙트를 실행시킨 사람에게 권한을 위임받는 것
        _nft.setAppAll(msg.sender, address(this), true);
    }

    // 실행시킨 사람이 판매 컨트랙트에 NFT 권한을 위임했는지 확인하는 함수
    function salesNFT() public view returns(bool){
        return _nft.isApprovedForAll(msg.sender, address(this));
    }

    // 판매 내용, 등록자 등을 담을 상태 변수, 판매 가격, 판매 시기 등을 설정

    // 구매자가 구매신청을 하면 CA에 이더를 보낸다.
    // 판매자가 이를 확인하고 확인버튼을 누르면 CA로부터 이더르 받고 소유권을 구매자에 넘긴다.
}
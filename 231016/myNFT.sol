// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721{
    constructor() ERC721("Koo", "KTK"){}

    // token의 해시 주소를 추가해주기 위해 생성하는 tokenId에 대응하는 URI를 연결해준다.
    mapping(uint256 tokenId => string tokenURI) _tokenURIs;

    function minting(uint256 _tokenId, string memory _tokenURI) public {
        _tokenURIs[_tokenId] = _tokenURI;
        _mint(msg.sender, _tokenId);
    }

    function tokenURI(uint256 _tokenId) public view override returns(string memory){
        return _tokenURIs[_tokenId];
    }
 // https://moccasin-odd-penguin-381.mypinata.cloud/ipfs/QmZBS8Sg7mB6Yw6qTS2EZafDgnzaWU8xMKbZVegvb9JLbF
    function _baseURI() internal view override returns(string memory){
        return"https://moccasin-odd-penguin-381.mypinata.cloud/ipfs/";
    }

    // NFT 관련 함수 작성
    // 판매 권한을 줄 수 있는 함수도 작성
    function setAppAll(address owner, address operator, bool approved) public {
        _setApprovalForAll(owner, operator, approved);
    }

    // NFT 소유권 및 권한 설정, 민팅 등을 이 곳에 정리
}
# ERC721 - NFT

# NFT 대체 불가능 토큰 - Non-Fungible Token
- 고유의 값을 가지고 있다.
- 디지털 자산의 소유권을 보장한다.
- 토큰의 내용이 대체 불가능한 것이 아니라 토큰 자체가 고유의 값을 가지고 있어서 대체 불가능이라 표현한다.
- NFT를 생성했을 때 내용이 같아도 각각 고유성을 가지고 있어서 대체 불가능하다.

# NFT
```javascript
const nft = {
    tokenId : "0x5811654856465446831235", // 토큰의 고유값. 고유 식별자
    url : "https://nfturl.com/data.json", // NFT에 담길 내용의 객체 경로
}
```

# NFT url 내용
```json
{
    "name" : "NFT 이름",
    "description" : "NFT 설명",
    "image" : "NFT 이미지 경로",
    "attributes" : [
        // 원하는 추가 속성 설정
    ]
}
```

- url의 객체 내용을 DB에 저장해도 NFT 민팅이 가능하지만 이 경우 탈 중앙화라고 하기 어렵기 때문에
- 분산 파일 시스템인 IPFS에 객체 내용을 저장하여 url을 전달해서 NFT를 조회하면 분산 파일 시스템에 저장된 객체의 내용으로 NFT를 보여주는 것.
- IPFS에 파일을 업로드 하면 분산 네트워크, 중앙화 서버 없이 여러 노드들이 분산 네트워크에 파일을 저장한다.(안정성)
- 무결성 및 보안 유지가 가능하다.
- 업로드 하면 파일의 경로를 고유한 주소를 가진다.(해시 기반)
- NFT에 담을 객체 내용을 IPFS저장소에 저장하고 url값을 NFT객체에 담아놓는다.
- 분산 파일 시스템 데이터를 저장하는 프로토콜. P2P 네트워크

```sh
npm i @openzeppelin/contracts
```

# pinata
- IPFS Provider로 사용
- pinata로 IPFS에 직접 파일을 업로드 하고 업로드한 파일의 해시 주소를 받는다.
- 이 해시 주소로 IPFS에 업로드된 파일을 다운로드하거나 확인할 수 있다.

```sh
remixd -s . --remix-ide https://remix.ethereum.org/
```
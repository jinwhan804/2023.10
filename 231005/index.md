# 컨트랙트 복습

Available Accounts
==================
(0) 0xB85dF9e72a66E75D07150Df17EDC9c80EBE1735a (100 ETH)
(1) 0x1b3cc222b229e382A55a58275087e8271f45f878 (100 ETH)
(2) 0xE69282bbd181ec99312292B0fC09F91B946C2098 (100 ETH)
(3) 0x2e861715aFCab5a59FaE853BAdcE20847b40b356 (100 ETH)
(4) 0x55d7A5C5523905B18144e490aDA83e23DB4B1AFF (100 ETH)
(5) 0x0f4c8418ad645eb7041F643998628e11116EBBbe (100 ETH)
(6) 0x3Abc915D8B2CCCc03397eA875Ba06512DE0Dd92b (100 ETH)
(7) 0xd338f7B32736b6Ce0a25Ca05d5C60371191C828B (100 ETH)
(8) 0xf92E2F871b98e098F738fe82c0dd0dc95b0cf25A (100 ETH)
(9) 0x7A42222B7aC473DDc947476209Ab99A83d6ac004 (100 ETH)

Private Keys
==================
(0) 0x4e78730c320519467ccf4ea911959c22c1c2238bdd6c424f34f4876717e0c994
(1) 0xc8bcd17dc8812317a29211e35a912a8c002bc7e5bd489a39786c652b7e19a559
(2) 0x0f6180a482635ee479a1f171e959446735c539353d29d5a86d552ef4a1e6a63a
(3) 0xa68ff79b9bfaff21af7ff67ebb1496dad54928fcd811e66d4666da33720b87ed
(4) 0x365e24438de3ca683b6a4790981d2707a3fec4646ff11b2da172672a898f701a
(5) 0x415deec65ea9f4f16c58fc2b92909b238356f3577053db24fe692ce5f54028c0
(6) 0xb096dbc7dddf50f46a6acdb8cf4c42dbccc2a9cd0b4561d3d1fafc7af16796d4
(7) 0xff506f52fc9c63bb5689a2ea168ac3540ab26ce978c03f2a980bde1f3363fc6b
(8) 0xf69b813142f6560ed5cda4f278c6700250e10d06319c817ae7b06001ac518148
(9) 0x4ff1e51ee4f638f0b35e7a7f20987775cedc71eb64854c5346234c7f26a28e18

- contracts 폴더에 sol 파일 생성과 코드 작성을 진행하고 컴파일을 한 후

- migrations 폴더에 빌드 배포 내용 코드 파일 추가

- 파일명 : [번호]_[내용]_[파일명].js

- truffle-config 파일에 지정한 네트워크로 배포 진행

- CA : 0x5B5810964B017Ad10753387d3D3D9bA824937504

- CA를 잃어버린 경우 : 
- truffle console을 열어서 조회 가능
```sh
npx truffle console
# 배포한 컨트랙트의 이름을 검색하면 나온다.
Counter.address 
# Counter 컨트랙트의 마지막 배포 CA가 나온다.
```

# 솔리디티 계약 작성

## 숫자야구 게임

- CA : 0xA274a07084EB61D0D610Fa7ef17C0EC62756568e
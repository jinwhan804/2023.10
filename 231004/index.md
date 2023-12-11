# 솔리디티

1. 절차적 프로그래밍 언어
2. 컴파일 언어

# SPDX License Identifier
- 스마트 컨트랙트 신뢰성
- 저작권 문제를 방지하기 위해 코드 최상단에 주석으로 표시, 작성한다.

# Progma
- 컴파일러의 기능을 사용하기 위해 작성하는 구문
- 솔리디티 버전 작성하여 명시

# Contract
- 객체 지향 언어의 Class와 유사
- Contract의 내부에 상태 변수 보관
- 상태 변수를 조회 또는 변경을 하기 위한 함수도 포함하고 있다.

# 솔리디티 코드 작성 시

## import
- 외부 파일의 코드를 가져올 수 있다. (모듈화)
- export할 필요는 없다. (선언한 Contract 바로 사용 가능)
```javascript
import '파일 경로';
import {"Contract 이름"} from "파일 경로";
```

# 상태 변수
- Contract 내부에 선언한 변수
- Contract의 storage에 저장된다.

1. Storage : 블록체인에 기록되는 영구적인 값이 유지되는 공간
2. Memory : 프로그램이 동작하는 동안에만 값을 기억, 종료되면 해제시키는 데이터 공간 (function 등)

# 데이터의 타입

```javascript
contract Counter{
    // 상태 변수 선언 : [타입] [변수명]
    
    // bool : 기본 값 true
    bool _bool;

    // uint256 : 자연수 타입, 뒤에 붙는 숫자는 메모리 영역의 크기
    uint256 _uint;

    // int : 정수 타입, uint와 마찬가지로 뒤의 숫자는 메모리 영역의 크기
    int256 _int;

    // int, uint의 데이터 범위를 지정할 수 있는 이유 : 작업 시 효율적으로 데이터 공간을 사용하기 위해 8~256 bit까지 지원
    // int = -128 ~ 127, uint = 0 ~ 255

    // enum : 가독성을 높이기 위해 사용하는 자료형
    enum Status {
        Pending, // 0
        Accapted, // 1
        Rejected // 2
    }

    // enum의 초기 값은 0
    Status public status;

    // enum의 상태 조회
    function get() public view returns(Status){
        return status;
    }

    // enum의 상태 변경
    function set(Status _status) public {
        status = _status;
    }

    // string : 문자열 자료형
    string Str = "문자열 상태 변수";

    // address : 주소형 - 지갑의 주소, 크기 20 byte의 자료형 컨트랙트 주소를 저장할 때 사용하는 변수
    address sender = 0x0000000000000000000000000000000000050000;
    // balance property가 있어 주소의 이더 잔액 확인이 가능하다.
    // 메서드 transfer, send 메서드 사용해서 이더 전송 가능
    // sender.balance : 해당 주소의 이더 자액 확인 가능
    // sender.transfer("보낼 금액"), sender.send("보낼 금액") : 금액 전송 가능

    // 배열 타입
    // 배열의 크기를 실행 중 변경 가능
    string[] strArr = ["1","2","3"];

    // 배열 크기 지정
    // 배열의 크기가 선언 시 지정된다.
    string[2] strArr2 = ["1","2"];

    // 구조체 struct
    // 구조를 정의
    struct Struct {
        string name;
        uint number;
    }

    // 매핑 key-value 키와 값을 저장할 때 사용하는 데이터 타입
    mapping (address => uint256) tokens;
    tokens {
        address : 10000
    }
    // address가 key, uint256이 value

    mapping (string => mapping(address => uint256)) token2;
    // string이 key, mapping(address => uint256)이 value
    // address가 key, uint256이 value
    token2{
        string : {
            address : 10000
            address2 : 10000
        }
        string2 : {
            address : 10000
            address2 : 10000
        }
    }

    // 글로벌 변수
    function a(address payable _to) public payable {
        // payable : 이더리움을 받을지 보낼지, 결제를 할건지 설정한다는 처리문
        
        // 이더리움 블록체인 정보 : block
        block.coinbase; // 현재 블록을 채굴한 account 주소
        block.difficulty; // 현재 블록의 난이도
        block.gaslimit; // 현재 블록이 사용 가능한 최대 가스값
        block.number; // 블록의 높이
        block.timestamp; // 블록의 생성 시간

        // msg 컨트랙트에서 message call 했을 때 컨트랙트에 전달된 메세지 정보를 가지고 있는 객체
        msg.sender; // 컨트랙트를 호출한 account 주소
        msg.value; // 메세지로 전달받은 이더리움. wei단위로 담겨 있음
        msg.data; // 컨트랙트 call로 실행할 때 보낸 데이터 내용
        msg.sig; // 전달받은 데이터의 첫 4 byte === 어떤 메소드를 실행시켰는지 확인

        // address
        _to.balance; // 계정의 잔고
        uint amount = 10 ** 18;
        _to.transfer(amount); // 해당 주소에 이더 전송
        _to.send(amount); // 해당 주소에 이더 전송
    }

    // 함수의 구조
    function name(uint a) public view returns (uint) {

    }
    // 함수의 접근자 타입
    // public : 외부에서 호출 가능. 외부 컨트랙트, 계정에서 호출 가능
    // private : 현재 컨트랙트에서만 호출 가능
    // Internal : 내부 함수는 컨트랙트에서 접근 가능. 상속 받아서 사용할 경우는 사용 가능 (단순 외부 컨트랙트에서는 사용 불가)
    // External : public과 거의 동일한 타입

    // 접근 지정자 : 상태 변수 변경 선언. 솔리디티 언어의 특징
    // view : 상태 변수 읽기 전용. 상태 변수 변경 불가.
    // pure : 상태 변수 읽기, 변경 안됨. 오직 매개 변수로만 함수 동작을 실행할 때 사용
    // payable : 결제 처리가 가능한 상태로 선언. 이더 전송 시에 선언해주지 않으면 전송이 거부된다.

    // 조건문 작성
    // require : 주어진 조건을 검사해서 만족하면 구문 통과, 아니면 이전 상태로 되돌림. 이전 상태로 되돌아가면 gas 반환됨
    // if문과 유사하게 동작
    require(조건문);
    조건문 통과 시 동작할 구문

    // 컨트랙트 배포자가 계약 파기를 원할 경우
    // sender가 배포자의 주소를 받을 변수라 가정
    address payable sender;

    require(msg.sender == sender);
    // selfdestruct(지갑 주소) : 현재 계약을 파기하고 전달 받은 매개 변수(주소)로 CA의 잔액 전송
    selfdestruct(sender);
    // selfdestruct(CA 주소) : 계약 파기 후 전달된 CA에 잔액을 전송
}
```

# Truffle
- Dapps 개발을 도와주는 프레임 워크
- 스마트 컨트랙트 컴파일, 배포 및 테스트 기능을 쉽게 할 수 있게 해준다.

- 리액트 설치
```sh
npx create-react-app test
npm i truffle
npx truffle init
```

1. contracts : 솔리디티 코드를 작성한 sol 파일들을 담을 폴더. 컴파일을 진행하면 이 폴더에 있는 sol파일을 읽어서 컴파일 진행. 
build 폴더가 생기고 컴파일된 내용이 json 파일로 생성된다.
2. migrations : 컨트랙트 배포를 진행할 js 코드 작성. 이더리움 네트워크에 배포하는 내용을 작성할 js를 이 폴더에 저장.
3. test : 테스트 파일을 작성할 폴더

- truffle-config.js 파일 수정
- 환경 세팅

```json
module.exports = {
  networks: {
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 8545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },    
  },

  compilers: {
    solc: {
      version: "0.8.13"
    }
  },
};
```

# 컴파일

- 솔리디티 코드 작성. contracts 폴더에 sol 파일 생성

- 컴파일 명령어
```sh
npx truffle compile
```

- build 폴더 생김. 컴파일된 내용이 생성된 json 파일에 작성되어 있다.

# 배포

- ganache-cli
```sh
npm i ganache-cli
npx ganache-cli
```

- migrations 폴더 안에 배포 코드 작성
- 파일 명 규칙
- [번호(순서)]_[내용]_[컨트랙트 이름].js
- 1_deploy_Counter.js로 파일 생성

- 배포 명령어
```sh
npx truffle migrate
```

- 배포된 CA : 0x28801f4bb332C9587af74C13939780c1b487cD0e

- CA로 요청을 보내서 call send 원격 프로시저 실행 가능

- truffle 콘솔에서 확인할 경우
```sh
npx truffle console
```

- 코드를 콘솔창에 직접 작성해서 call send를 테스트할 수 있다.
```javascript
// Counter라는 컨트랙트가 배포된 마지막 컨트랙트를 접근
// 접근하는 동안 비동기
// instance 배포된 Counter 컨트랙트에 접근해서 인스턴스를 매개 변수로 받는다.
// counter 변수 선언 후 instance를 담아준다.
Counter.deployed().then((instance)=>(counter = instance));
// counter에 배포된 컨트랙트의 인스턴스가 들어가고 여기에는 call과 send 메소드가 포함되어 있다.
counter.getValue();
// call 요청
// BN 객체는 매우 큰 숫자를 명시. 블록체인과 같은 분산 원장 기술에서 자주 사용된다.
// words: [ 0, <1 empty item> ]
// 아이템 하나 존재. 값은 0
counter.setValue(20);
// send 요청
// 가스비 발생
// 이 후 call 요청을 해보면 words: [ 20, <1 empty item> ]로 값이 20으로 변경
```

# 테스트 코드 작성
```sh
npx truffle test
```

- 새로운 컴파일 CA : 0x34Df69dC1E63835B8e6262221160DBd611dd81B8


Available Accounts
==================
(0) 0x3c5f4d8E38a5E50bA769352Bb81b8fFe93C83b63 (100 ETH)
(1) 0x3e68fe586f7A8a12Bb32cb2F1012c2B52Eab303D (100 ETH)
(2) 0x2A54B3D029561C2B1cE693f77dE46df2DeD9cA8c (100 ETH)
(3) 0x5846921E444C06CB90D25Eb71D156c5EEC3FFB38 (100 ETH)
(4) 0xD429883Da850af887AC8F134D72E557EBa47e77f (100 ETH)
(5) 0x3619908E16AA5fA662BFcCe16284C9354A6166B0 (100 ETH)
(6) 0x703A56ead476263318eF66f7c747FCf17ea7F6ec (100 ETH)
(7) 0x629B59f6E088e15d8D6c0AFBcb9ddE5696102e33 (100 ETH)
(8) 0xaFB9598C47E82C7228daB19821722cE91E1A901B (100 ETH)
(9) 0x314Ca7f155c051B1430D78256c892345075f32b6 (100 ETH)

Private Keys
==================
(0) 0xdd57b79d5f675bdc6fddbd0bac2222103cbd15301aa70e8d20a145b38cbf1408
(1) 0x6d8ce6c5783f9eb2c6192061d8ff730c72e8c433618159d34f734383fcd681bb
(2) 0x39c5bb9fe5a1873fae03ff77de3b7235c4916953a68dfec16eaa7b82481653a7
(3) 0x7d559347bd2c11eaaed31270c2b5ad2e35824aed34009129820513caa6a8eec2
(4) 0x779d0b92d562f78c878a367ce83d276882b90a9a8b9eda559c8a1c74d64bb63d
(5) 0x37c6af0b02058057866fcb4cab86b6398baa49c60e1cebb76990e2e59ec8f6db
(6) 0x831ab89d1cb043c797802e97daa3b0800fd3d4653e9828f61114b29002457c0c
(7) 0x4d720d5d1c659b6abe38d068d7dcb9b3782fd6ee075fbccd728ac3795167a242
(8) 0xcc091c4d7f4fdff369db2d1a2d0e8b00e7f4dd94075f05f8672d3d00bde28658
(9) 0xa5c73d6634e8533fb3fd430526a0b5658d816a736798daf3b37f83260d423b6f

- ganache 재 오픈 후 CA = 0x5F0b69fbcC3a7547CD72D28a45dA1E24A1a9b2d2
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Baseball{
    // 컨트랙트 배포자만 컨트롤할 수 있는 함수 필요

    // 숫자야구 기본 : 컴퓨터가 랜덤으로 3자리 숫자를 설정
    // 플레이어가 해당 숫자를 맞추는 게임
    // 입력한 값이 맞지 않으면 플레이어가 이더를 CA에 보내고 최종적으로 맞춘 사람에게 모인 이더가 전달되게 한다.
    // 정해진 횟수 내로 맞추지 못할 경우 컨트랙트 배포자가 이더를 가져간다.

    // 컨트랙트 배포자 주소
    address private owner;

    // 게임 진행 횟수
    // constant = 상수로 설정
    uint256 private constant GAME_COUNT = 5;

    // 게임 참가비
    uint256 private ticket = 5 ether;

    // 정답을 담아둘 변수
    uint256 private random;

    // 게임 진행 상황
    uint256 private progress;

    // 모인 총 상금
    uint256 private reward;

    // 게임의 현 상태
    enum GameStatus{
        Playing,
        GameOver
    }

    // 최초 상태. 값 = 0
    GameStatus gameStatus;

    // 컨트랙트 생성자
    constructor(){
        owner = msg.sender;

        // keccak256 : 솔리디티에서 랜덤값을 생성할 때 사용. 매개 변수를 해쉬값으로 변경해준다. SHA-3 사용
        // abi.encodePacked : 매개 변수로 전달된 내용들을 가지고 바이트 배열로 만들어준다.
        random = uint256(
            keccak256(
                abi.encodePacked(
                    block.timestamp,
                    block.difficulty,
                    block.coinbase,
                    block.number
                )
            )
        );

        // 100 ~ 999 안의 값만 나오도록 설정
        random = (random % 900) + 100;
    }

    // 유저의 답안을 받아 비교를 통해 답이 맞는지 확인하는 함수
    function gameStart(uint256 _value) public payable {
        require(progress < GAME_COUNT, "Game Over");
        require(msg.value == ticket, "ticket amount error (need 5 ethers)");
        require(
            (_value >= 100) && (_value < 1000), 
            "_value error (99 < _value < 1000)"
        );
        progress += 1;

        if(_value == random){
            require(reward <= address(this).balance);
            payable(msg.sender).transfer(address(this).balance);
            reward = 0;
            gameStatus = GameStatus.GameOver;
        }else{
            reward += msg.value;
        }
    }

    function getReward() public view returns(uint256){
        return reward;
    }

    function getProgress() public view returns(uint256){
        return progress;
    }

    function getTicketPrice() public view returns (uint256){
        return ticket;
    }

    function getOwner() public view returns (address){
        return owner;
    }

    function gameRestart () public payable{
        if(progress == GAME_COUNT){
            require(reward <= address(this).balance);
            payable(owner).transfer(address(this).balance);
        }
        
        gameStatus = GameStatus.Playing;
        random = 0;
        progress = 0;
        reward = 0;
    }

    // 어드민 모드, 정답 확인 함수
    function getRandom() public view returns(uint256){
        return random;
    }

    // 게임 중인지 확인하는 함수
    function getPlaying() public view returns(uint256){
        uint256 Playing = 0;

        if((gameStatus != GameStatus.Playing) || (progress == GAME_COUNT)){
            Playing = 1;
        }
        return Playing;
    }
}
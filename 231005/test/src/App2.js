import { useEffect, useState } from "react";
import useWeb3 from "./hooks/web3.hook";
import abi from './abi/Baseball.json';

const App = ()=>{
    const {user,web3} = useWeb3();

    // 1판 당 필요 금액
    const [ticket,setTicket] = useState("0");
    
    // 플레이어가 입력할 답안
    const [value,setValue] = useState('');
    
    // 게임 보상
    const [reward,setReward] = useState('0');
    
    // 게임 진행도
    const [progress,setProgress] = useState('0');

    // 정답 (컨트랙트 배포자만 확인 가능)
    const [random,setRandom] = useState('000');
    
    // 게임 진행 여부(진행중 또는 종료)
    const [message,setMessage] = useState('');

    // 게임 배포자 계정
    const [owner,setOwner] = useState('');

    const [baseballContract,setBaseballContract] = useState(null);

    useEffect(()=>{
        if(web3 !== null){
            if(baseballContract === null){
                const Baseball = new web3.eth.Contract(abi,"0x8732F7752A12248cf41a397350b3BeC5418644Df",{data : ''})
                setBaseballContract(Baseball);
            }
        }
    },[web3]);

    const getTicket = async()=>{
        if(baseballContract === null)return;
        const result = web3.utils.toBigInt(await baseballContract.methods.getTicketPrice().call()).toString(10);
        setTicket(await web3.utils.fromWei(result,"ether"));
    };

    const getReward = async()=>{
        if(baseballContract === null)return;
        const result = web3.utils.toBigInt(await baseballContract.methods.getReward().call()).toString(10);
        setReward(await web3.utils.fromWei(result,"ether"));
    };

    const getPlaying = async()=>{
        const playing = web3.utils.toBigInt(await baseballContract.methods.getPlaying().call()).toString(10);
        setMessage(playing);
    };

    const getProgress = async()=>{
        const progress = web3.utils.toBigInt(await baseballContract.methods.getProgress().call()).toString(10);
        setProgress(progress);
    };

    const getRandom = async()=>{
        const random = web3.utils.toBigInt(await baseballContract.methods.getRandom().call()).toString(10);
        setRandom(random);
    };

    const getOwner = async()=>{
        const owner = await baseballContract.methods.getOwner().call();
        setOwner(owner);
    }

    const gameStart = async()=>{
        if(value.length < 3){
            alert("숫자 3자리 입력해주세요.")
            return;
        }
        
        await baseballContract.methods.gameStart(Number(value)).send({
            from : user.account,
            value : web3.utils.toWei('5','ether'),
        });

        render();
    }

    const gameRestart = async()=>{
        await baseballContract.methods.gameRestart().send({
            from : owner,
            value : reward
        });        

        render();
    }

    const render = ()=>{
        getTicket();
        getReward();
        getPlaying();
        getProgress();
        getOwner();
    }

    useEffect(()=>{
        if(baseballContract !== null){
            render();
        }
    },[baseballContract])

    if(user.account === null) return "지갑 연결 필요";
    
    return(
        <>
            <div>account : {user.account}</div>
            <div>티켓 가격 : {ticket}</div>
            <div>현재 게임 진행도 : {progress} / 5</div>
            <div>총 상금 : {reward}</div>
            <div>게임 진행 : {message == 0 ? "게임 중" : "게임 종료"}</div>
            <input onChange={(e)=>setValue(e.target.value)}></input>
            <div>정답 : {random}</div>
            {message == 0 && progress < 5 ? <button onClick={gameStart}>게임 시작</button> : <button onClick={gameRestart}>재시작</button>}
            <button onClick={getRandom}>어드민</button>
        </>
    )
}

export default App;
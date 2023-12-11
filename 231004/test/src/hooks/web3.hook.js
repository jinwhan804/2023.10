import { useState, useEffect } from "react";
import Web3 from 'web3';

// 커스텀 훅 작성 시 어두에 use가 있어야 한다.
const useWeb3 = () =>{
    // 현재 접속한 메타마스크 지갑 정보를 담을 변수
    const [user, setUser] = useState({
        account : "",
        balance : ""
    });

    // 네트워크와 연결한 web3 인스턴스를 담을 변수
    const [web3,setWeb3] = useState(null);

    useEffect(()=>{
        // ethereum 객체 존재 여부 확인
        if(window.ethereum){
            // 로그인
            window.ethereum.request({
                method : "eth_requestAccounts"
                // 응답 받은 데이터 배열의 첫 번째 값 필요
            }).then( async([data])=>{
                // Web3 인스턴스 생성
                const web3Provider = new Web3(window.ethereum);
                setWeb3(web3Provider);
                setUser({
                    account : data,
                    balance : web3Provider.utils.toWei(await web3Provider.eth.getBalance(data),"ether")
                })
            })
        }else{
            alert("메타 마스크 설치하세요");
        }
    },[]);

    return {
        user,
        web3
    }
}

export default useWeb3;
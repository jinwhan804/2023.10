import { useEffect, useState } from "react";
import useWeb3 from "./hooks/web3.hook";
import abi from './abi/Counter.json';
const App = () =>{
  const {user,web3} = useWeb3();
  const [count, setCount] = useState(0);
  
  // CA에 상태 변수를 조회하는 함수
  const getCount = ()=>{
    if(web3 === null) return;

    const getValueData = abi.find((data)=> data?.name === "getValue");

    const data = web3.eth.abi.encodeFunctionCall(getValueData,[]);

    web3.eth.call({
      to : "0xceec31604e57E982a69E0E68Da9c856547361789",
      data
    }).then((data)=>{
      const result = web3.utils.toBigInt(data).toString(10);
      setCount(result);
    })
  }

  // 값을 블록체인 네트워크에 요청해서 상태 변수를 변경하는 함수
  const increment = async()=>{
    const incrementData = abi.find((data)=> data.name === "increment");
    const data = web3.eth.abi.encodeFunctionCall(incrementData, []);
    
    const from = user.account;
    const _data = await web3.eth.sendTransaction({
      from : from,
      to : "0xceec31604e57E982a69E0E68Da9c856547361789",
      data,
    })

    console.log(_data);
    getCount();
  }

  const decrement = async()=>{
    const decrementData = abi.find((data)=> data.name === "decrement");
    const data = web3.eth.abi.encodeFunctionCall(decrementData, []);

    const from = user.account;
    const _data = await web3.eth.sendTransaction({
      from : from,
      to : "0xceec31604e57E982a69E0E68Da9c856547361789",
      data,
    })

    console.log(_data);
    getCount();    
  }

  useEffect(()=>{
    if(web3 !== null) getCount();
  },[web3]);

  if(user.account === '') return "지갑 로그인 하세요";

  return(
    <>
    <div>
      <h2>카운트 : {count}</h2>
      <button onClick={increment}>증가</button>
      <button onClick={decrement}>감소</button>
    </div>
    </>
  )
}

export default App;
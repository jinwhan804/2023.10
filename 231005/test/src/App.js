import { useEffect, useState } from "react";
import useWeb3 from "./hooks/web3.hook";
import abi from './abi/Counter.json';

const App = () =>{
  const{user,web3} = useWeb3();
  const [count,setCount] = useState(100);
  const [countContract,setCountContract] = useState(null);

  useEffect(()=>{
    if(web3 !== null){
      if(countContract === null){
        // web3.eth.Contract : 네트워크에 배포되어 있는 컨트랙트를 조회하고 인스턴스로 생성해준다.
        // 메소드를 통해 네트워크에 상호작용할 수 있다.
        // 첫 번째 매개 변수는 abi, 두 번째는 CA, 세 번째는 options
        // {data : ""}를 넣지 않으면 터지기 때문에 넣어준다. 
        const Counter = new web3.eth.Contract(abi,"0x55804D12047C79c6946f23e94592a6f9655E1550",{data : '',from : ''});
        // 이렇게 작성한 후에 옵션을 추가하고 싶다면 객체의 키 값에 넣어줄 수 있다.
        Counter.options.from = "0x000";
        setCountContract(Counter);
      }
    }
  },[web3]);

  const getValue = async()=>{
    if(countContract === null) return;
    const result = web3.utils.toBigInt(await countContract.methods.getValue().call()).toString(10);
    setCount(result);
  }

  const increment = async()=>{
    await countContract.methods.increment().send({
      from : user.account,
      data : countContract.methods.increment().encodeABI()
    })
    getValue();
  }

  const decrement = async()=>{
    await countContract.methods.decrement().send({
      from : user.account,
      data : countContract.methods.decrement().encodeABI()
    })
    getValue();
  }

  useEffect(()=>{
   if(countContract !== null) getValue();
  },[countContract])

  if(user.account === null) return "연결된 지갑 주소가 없습니다.";
  return(
    <>
      <div>{user.account}</div>
      <div>카운터 : {count}</div>
      <button onClick={increment}>증가</button>
      <button onClick={decrement}>감소</button>
    </>
  )
}

export default App;
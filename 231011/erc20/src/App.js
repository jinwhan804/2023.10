import { useEffect, useState } from "react";
import useWeb3 from "./hooks/web3.hook";
import abi from "./abi/Pocketmon.json";

const App =()=>{

  const {user, web3} = useWeb3();
  const [contract,setContract] =useState(null);
  const [token,setToken] = useState("0");

  const [accounts , setAccounts] = useState([]);

  useEffect(()=>{
    if(web3 !== null){
      if(contract) return;
      const poketmon = new web3.eth.Contract(abi,"0xF0343b3eCeaD574E3bB6749F830500f654a9E021");
      setContract(poketmon);
    }
  },[web3]);

  // 해당 지갑의 포켓몬 조회
  const getPocketmon = async (account) =>{
    const result = contract.methods.getPocketmon().call({
      from : account,
    });
    return result;
  };

  // 지갑의 토큰량 조회
  const getToken = async(account) =>{

    if(!contract) return;

    let result = web3.utils.toBigInt(await contract.methods.balanceOf(account).call()).toString(10);

    result = await web3.utils.fromWei(result, "ether");

    return result;
  };

  // 메타마스크 계정들 조회
  const getAccounts = async ()=>{    const accounts = await window.ethereum.request({method : "eth_requestAccounts"});
    const _accounts = await Promise.all(
      accounts.map(async(account)=>{
        const token = await getToken(account);
        const pocketmon = await getPocketmon(account);
        // 추가로 포켓몬들도 어떤 포켓몬을 가지고 있는지 추가할 부분
        return {account, token, pocketmon};
      })
    )
    setAccounts(_accounts);
  };

  useEffect(()=>{
    if(!contract) return;
    getAccounts();
  },[contract])

  if(user.account === null) return "메타마스크 설치하셈."
  return(
    <>
    <div>토큰 보유량 : {token}</div>
    {accounts.map((item,index)=>(
      <div key={index}>
        계정 {item.account} : 토큰 값 : {item.token}
        <div>포켓몬들 <br></br>
          {item.pocketmon.map((item,index)=>(
            <div key={index}>
              {item.name} : <img width={50} src={item.url} alt=""/>
            </div>
          ))}
        </div>
      </div>
    ))}
    </>
  )
}

export default App;
import {useEffect, useState} from "react";
import axios from "axios";
import useWeb3 from "./hooks/web3.hook";
import abi from './abi/pokeNFT.json';

const App = ()=>{
  const {user,web3} = useWeb3();

  const [file,setFile] = useState(null);

  const [contract,setContract] = useState(null);
  
  const [name,setName] = useState(null);
  const [descript,setDescript] = useState(null);
  const [imgURL,setImgURL] = useState(null);
  const [hashAddress,setHashAddress] = useState('');

  useEffect(()=>{
    if(web3 !== null){
      if(contract) return;
      const data = new web3.eth.Contract(abi,"0x29df88C41f998D30e8B300847A735bac2cE398c0", {data : ""});
      setContract(data);
    }
  },[web3])

  const upload = async () =>{
    try {
      const fileData = new FormData();
      fileData.append("file",file)
      const resp = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS",fileData,{
        headers : {
          "Content-Type" : "multipart/form-data",
          pinata_api_key : "e2b64b7f8443ac1be83d",
          pinata_secret_api_key : "a17ef84d141fe568903b0ba9856f5da317f84a1c2f064f2101b4d1600ef3023c",
        },
  
      });
      console.log(resp);
      
    } catch (error) {
      console.log(error)
    }
  }

  const createJson = async()=>{
    const data = await axios.post('http://127.0.0.1:8000',{
      data : {
        name : name,
        descript : descript,
        imgURL : `https://moccasin-odd-penguin-381.mypinata.cloud/ipfs/${imgURL}`
      }
    });
    console.log(data);
  }

  const createNFT = ()=>{
    contract.methods.minting(hashAddress).send({
      from : user.account
    });    
  }

  return(
    <>
      <h2>json 파일 생성</h2>
      <label>NFT 이름</label>
      <input type="text" onChange={(e)=>{setName(e.target.value)}}/><br/>
      <label>NFT 설명</label>
      <input type="text" onChange={(e)=>{setDescript(e.target.value)}}/><br/>
      <label>NFT 이미지 주소</label>
      <input type="text" onChange={(e)=>{setImgURL(e.target.value)}}/><br/>
      <button onClick={createJson}>json 파일 생성</button><br/>
      <br/>
      <h2>json 파일 IPFS 업로드</h2>
      <label>IPFS 파일 업로드</label>
      <input type="file" onChange={(e)=>{
        setFile(e.target.files[0])
      }}
      />
      <button onClick={upload}>파일 업로드</button><br/>
      <br/>
      <h2>NFT minting</h2>
      <label>json파일 해시 주소</label>
      <input onChange={(e)=>{setHashAddress(e.target.value)}}></input><br/>
      <button onClick={createNFT}>minting</button><br/>
      <br/>
      <h2>NFT 토큰 확인</h2>
      <label>tokenId</label>
      <input onChange={(e)=>{}}></input><br/>
      <button>토큰 검색</button><br/>

    </>
  )
}

export default App;
// 빌드 폴더 안에 컴파일된 json 파일 명을 넣어서 가져온다.
const Counter = artifacts.require("Counter");

module.exports = (deployer)=>{
    deployer.deploy(Counter);
}
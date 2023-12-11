const Counter = artifacts.require("Counter");

// contract : 테스트 케이스를 정의하기 위한 최상위 구조
contract("Counter",(account) =>{
    // account : 네트워크에 있는 계정들이 매개변수로 들어온다.
    console.log(account);
    // describe : 테스트 그룹 단위
    describe("Counter contract", ()=>{
        // it : 테스트 단위
        let counter;
        it("counter1",async()=>{
            // 테스트 내용
            // 배포한 컨트랙트를 조회해서 컨트랙트의 인스턴스를 counter에 담아준다.
            counter = await Counter.deployed();
        });

        it("counter2", async()=>{
            console.log(await counter.getValue.call());
        });

        it("counter3", async()=>{
            await counter.setValue(20);
            console.log(await counter.getValue.call());
        });
    })
})
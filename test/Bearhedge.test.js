const { expect } = require("chai");

// Start test block
describe("Bearhedge contract", function () {
  before(async function () {
    this.Bearhedge = await hre.ethers.getContractFactory("BEARHEDGE_Token");
    this.bearhedge = await this.Bearhedge.deploy();

    await this.bearhedge.deployed();
    const router = await hre.ethers.getContractAt(
      "IDexRouter",
      "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506"
    );

    // Add half of total supply + 100 ETH to liquidity
    await this.bearhedge.approve(
      router.address,
      hre.ethers.constants.MaxUint256
    );
    const deadline = Math.floor(Date.now() / 1000);
    await router.addLiquidityETH(
      this.bearhedge.address,
      500000000000000000000n,
      0,
      0,
      this.bearhedge.address,
      deadline,
      { value: 100000000000000000000n }
    );
  });

  //Test cases
  it("uniswap pair should be created", async function () {
    expect(await this.bearhedge.pair()).to.not.equal(
      hre.ethers.constants.AddressZero
    );
  });

  it("total supply should be 1000000000000000000000", async function () {
    expect(await this.bearhedge.totalSupply()).to.equal(
      1000000000000000000000n
    );
  });
  it("name should be Bearhedge", async function () {
    expect(await this.bearhedge.name()).to.equal("BEARHEDGE");
  });
});

// End test block

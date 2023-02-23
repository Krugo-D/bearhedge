const { expect } = require("chai");

describe("Bearhedge contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();

    const Bearhedge = await ethers.getContractFactory("BEARHEDGE_Token");

    const bearhedge = await Bearhedge.deploy();

    const ownerBalance = await bearhedge.balanceOf(owner.address);
    expect(await bearhedge.totalSupply()).to.equal(ownerBalance);
  });
});

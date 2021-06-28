const hre = require("hardhat");
const {
  expect
} = require('chai');

describe("NFT", () => {
  it("It should deploy the contract, mint a token, and resolve to the right URI", async () => {
    const NFT = await hre.ethers.getContractFactory("UkuNFT");
    const nft = await NFT.deploy();
    const URI = "ipfs://QmWJBNeQAm9Rh4YaW8GFRnSgwa4dN889VKm9poc2DQPBkv";
    await nft.deployed();
    await nft.mint("0x09c0377BAdCa7349b20569f45f2D94398179Db0c", URI)
    expect(await nft.tokenURI(1)).to.equal(URI)
  });
});

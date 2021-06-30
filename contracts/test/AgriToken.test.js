const {
  assert
} = require("chai");

const AgriToken = artifacts.require('AgriToken');

contract('AgriToken', ([alice, bob, carol, dev, minter]) => {
  beforeEach(async () => {
    this.agri = await AgriToken.new({
      from: minter
    });
  });


  it('mint', async () => {
    await this.agri.mint(alice, 1000, {
      from: minter
    });
    assert.equal((await this.agri.balanceOf(alice)).toString(), '1000');
  })
});

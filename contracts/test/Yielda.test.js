const {
  advanceBlockTo
} = require('@openzeppelin/test-helpers/src/time');
const {
  assert
} = require('chai');

const AgriToken = artifacts.require('AgriToken');
const Yielda = artifacts.require('Yielda');

contract('Yielda', ([alice, bob, carol, dev, minter]) => {
  beforeEach(async () => {
    this.agri = await AgriToken.new({
      from: minter
    });
    this.yield = await Yielda.new(this.agri.address, {
      from: minter
    });
  });

  it('mint', async () => {
    await this.yield.mint(alice, 1000, {
      from: minter
    });
    assert.equal((await this.yield.balanceOf(alice)).toString(), '1000');
  });

  it('burn', async () => {
    await advanceBlockTo('650');
    await this.yield.mint(alice, 1000, {
      from: minter
    });
    await this.yield.mint(bob, 1000, {
      from: minter
    });
    assert.equal((await this.yield.totalSupply()).toString(), '2000');
    await this.yield.burn(alice, 200, {
      from: minter
    });

    assert.equal((await this.yield.balanceOf(alice)).toString(), '800');
    assert.equal((await this.yield.totalSupply()).toString(), '1800');
  });

  it('safeAgriTransfer', async () => {
    assert.equal(
      (await this.agri.balanceOf(this.yield.address)).toString(),
      '0'
    );
    await this.agri.mint(this.yield.address, 1000, {
      from: minter
    });
    await this.yield.safeAgriTransfer(bob, 200, {
      from: minter
    });
    assert.equal((await this.agri.balanceOf(bob)).toString(), '200');
    assert.equal(
      (await this.agri.balanceOf(this.yield.address)).toString(),
      '800'
    );
    await this.yield.safeAgriTransfer(bob, 2000, {
      from: minter
    });
    assert.equal((await this.agri.balanceOf(bob)).toString(), '1000');
  });
});

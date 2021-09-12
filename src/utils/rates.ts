import BN from "bn.js"
import { toBN } from "web3-utils";

const scale = toBN(10).pow(toBN(18)); 
export const supplyRate = (totalSupply: BN, totalBorrow: BN, totalReserve: BN, multiplier: BN, baseRate: BN, jumpMultiplier: BN, kink: BN, reserveFactor: BN) => {
    return borrowRate(totalSupply, totalBorrow, totalReserve, multiplier, baseRate, jumpMultiplier, kink)
    .mul(utilRate(totalSupply, totalBorrow, totalReserve)).div(scale)
    .mul(toBN(1).sub(reserveFactor)).div(scale); 
}

export const borrowRate = (totalSupply: BN, totalBorrow: BN, totalReserve: BN, multiplier: BN, baseRate: BN, jumpMultiplier: BN, kink: BN) => {
    const util = utilRate(totalSupply, totalBorrow, totalReserve);
    return multiplier.mul(util.gt(kink) ? kink : util).div(scale)
    .add(jumpMultiplier.mul(util.gt(kink) ? util.sub(kink) : toBN(0)).div(scale))
    .add(baseRate); 
}

export const utilRate = (totalSupply: BN, totalBorrow: BN, totalReserve: BN) => {
    return totalSupply.eq(toBN(0)) ? toBN(0) : totalBorrow.mul(scale).div(totalSupply);
}
import BN from "bn.js"
import { toBN } from "web3-utils";
import { boolean } from "yargs";

interface ret {
    swapAmt: BN
    reversed: boolean
}

export const optimalDeposit = (amtA: BN, amtB: BN, resA: BN, resB: BN) : ret => {
    if (amtA.mul(resB).gte(amtB.mul(resA))) {
        return {swapAmt: optimalDepositHelp(amtA, amtB, resA, resB), reversed: false};
    } else {
        return {swapAmt: optimalDepositHelp(amtB, amtA, resB, resA), reversed: true}; 
    }
}

const optimalDepositHelp = (amtA: BN, amtB: BN, resA: BN, resB: BN) => {
    const a = toBN(997); 
    const b = toBN(1997).mul(resA);
    const _c = (amtA.mul(resB)).sub(amtB.mul(resA));
    const c = _c.mul(toBN(1000)).div(amtB.add(resB)).mul(resA);
    const d = a.mul(c).mul(toBN(4));
    const e = (b.mul(b).add(d)); // square root
    const numerator = e.sub(b);
    const denominator = a.mul(toBN(2)); 
    return numerator.div(denominator);
}

const getAmountOut = (amtIn: BN, resIn: BN, resOut: BN) => {
    const amountInWithFee = amtIn.mul(toBN(997));
    const numerator = amountInWithFee.mul(resOut);
    const denominator = resIn.mul(toBN(1000)).add(amountInWithFee);
    return numerator.div(denominator);
}

export const priceImpact = (amtA: BN, amtB: BN, resA: BN, resB: BN) => {
    const {swapAmt, reversed} = optimalDeposit(amtA, amtB, resA, resB);
    const dB = amtB.add(getAmountOut(swapAmt, resA, resB));
    const dA = amtA.sub(swapAmt);
    
}
import BN from "bn.js"
import { toBN } from "web3-utils";

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

function sqrt(value: any) {
    let o = toBN(0);
    let x = value;
    let limit = 100;
    while(!x.pow(toBN(2)).eq(toBN(2)) && !x.eq(o) && --limit) {
        o = x;
        x = (x.add(value.div(x))).div(toBN(2));
    }
    return x
}

const optimalDepositHelp = (amtA: any, amtB: any, resA: any, resB: any) => {
    const a = toBN(997); 
    const b = toBN(1997).mul(resA);
    const _c = (amtA.mul(resB)).sub(amtB.mul(resA));
    const c = _c.mul(toBN(1000)).div(amtB.add(resB)).mul(resA);
    const d = a.mul(c).mul(toBN(4));
    const e = sqrt(b.mul(b).add(d)); // square root
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
    console.log(1)
    const {swapAmt, reversed} = optimalDeposit(amtA, amtB, resA, resB);
    console.log(3)
    if (reversed) {
        const dA = amtA.add(getAmountOut(swapAmt, resB, resA));
        const dB = amtB.sub(swapAmt);
        const spot = Number(resB.toString()) / Number(resA.toString());
        const real = Number(dB.toString()) / Number(dA.toString());
        return (real - spot) / spot
    } else {
        const dB = amtB.add(getAmountOut(swapAmt, resA, resB));
        const dA = amtA.sub(swapAmt);
        const spot = Number(resB.toString()) / Number(resA.toString());
        const real = Number(dB.toString()) / Number(dA.toString());
        console.log((spot-real) / spot)
        return parseInt(((spot - real) / spot).toFixed(0))
    }
}
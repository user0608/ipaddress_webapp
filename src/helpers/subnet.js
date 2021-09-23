import { convertBinaryToIpFormat } from "./utils";

export const nuevaMascara = (mask, numRedes) => {
    let numBites = Math.log2(numRedes)
    let j = 0;
    let newMask = ""
    for (let i = 0; i < 23; i++) {
        if (mask[i] === "0" && j < numBites) {
            newMask += "1"
            j++
        } else if (mask[i] === "1") {
            newMask += "1"
        } else {
            newMask += "0"
        }
    }
    return newMask
}

export const calculaSubnet = (red, tipo, num_sub) => {
    let numBites = Math.log2(num_sub)
    let redBites = tipo === "a" ? 8 : tipo === "b" ? 16 : 24
    let data = []
    for (let i = 0; i < num_sub; i++) {
        let binary = i.toString(2)
        binary = numBites === 0 ? "" : binary
        let r = `${red.substring(0, redBites)}${"0".repeat(numBites - binary.length)}${binary}` // ok   
        let d = {
            red: convertBinaryToIpFormat(`${r}${"0".repeat(32 - r.length)}`),
            mask: convertBinaryToIpFormat(`${"1".repeat(redBites + numBites)}${"0".repeat(32 - redBites - numBites)}`),
            first: convertBinaryToIpFormat(`${r}${"0".repeat(31 - r.length)}1`),
            last: convertBinaryToIpFormat(`${r}${"1".repeat(31 - r.length)}0`),
            broadcast: convertBinaryToIpFormat(`${r}${"1".repeat(32 - r.length)}`)
        }
        data.push(d)
    }
    return data
}

export const calculaSubnetPagina = (red, tipo, num_sub, pagina) => {
    console.log(red,tipo,num_sub,pagina)
    let numBites = Math.log2(num_sub)
    let redBites = tipo === "a" ? 8 : tipo === "b" ? 16 : 24
    let data = []
    let min = (pagina - 1) * 32
    let max = min + 32
    if (max > num_sub) {
        min = 0
        max = num_sub
    }
    for (let i = min; i < max; i++) {
        let binary = i.toString(2)
        binary = numBites === 0 ? "" : binary
        let r = `${red.substring(0, redBites)}${"0".repeat(numBites - binary.length)}${binary}` // ok   
        let d = {
            id: i+1,
            red: convertBinaryToIpFormat(`${r}${"0".repeat(32 - r.length)}`),
            mask: convertBinaryToIpFormat(`${"1".repeat(redBites + numBites)}${"0".repeat(32 - redBites - numBites)}`),
            first: convertBinaryToIpFormat(`${r}${"0".repeat(31 - r.length)}1`),
            last: convertBinaryToIpFormat(`${r}${"1".repeat(31 - r.length)}0`),
            broadcast: convertBinaryToIpFormat(`${r}${"1".repeat(32 - r.length)}`)
        }
        data.push(d)
    }
    return data
}
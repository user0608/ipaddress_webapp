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
    console.log(red, tipo, num_sub, pagina)
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
            id: i + 1,
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

export const bitsHosts = (num_host = 0) => {
    let bits = 0
    let h = 0
    for (let i = 0; i < 32; i++) {
        h = Math.pow(2, i) - 2
        if (h >= num_host) {
            bits = i
            break
        }
    }
    return { bits, host: h }
}
export const validarData = (prefix = 32, redes = []) => {
    let max = Math.pow(2, (32 - prefix))
    let carry = 0
    redes.forEach(r => {
        carry += bitsHosts(r).host
        console.log(bitsHosts(r).host)
    })
    if (carry > max) {
        return { result: false, total: carry, max }
    }
    return { result: true, total: carry, max }
}
export const addOneToBinary = (binary) => {
    if (binary.length === 35)
        binary = binary.replace(".", "").replace(".", "").replace(".", "")
    let result = ""
    if (binary.length === 32) {
        let carry = 1
        for (let i = 0; i < 32; i++) {
            if (binary[31 - i] === "1" && carry === 1) {
                result = "0" + result
            } else if (carry === 1) {
                result = "1" + result
                carry = 0
            } else {
                result = binary[31 - i] + result
            }

        }
    }
    return result
}

export const subNetVLSM = (ip = "",host = [{ nombre: "", host: 0 }]) => {
    host = host.sort((a, b) => b.host - a.host)
    let datos = []
    for (let i = 0; i < host.length; i++) {
        let res = bitsHosts(host[i].host)
        let r = ip.substring(0, 32 - res.bits)
        let red = `${r}${"0".repeat(res.bits)}`
        let broad = `${r}${"1".repeat(res.bits)}`
        let d = {
            name: host[i].nombre,
            requiere: host[i].host,
            have: res.host,
            red: convertBinaryToIpFormat(red),
            mask: convertBinaryToIpFormat(`${"1".repeat(32 - res.bits)}${"0".repeat(res.bits)}`),
            first: convertBinaryToIpFormat(`${r}${"0".repeat(res.bits - 1)}1`),
            last: convertBinaryToIpFormat(`${r}${"1".repeat(res.bits - 1)}0`),
            broadcast: convertBinaryToIpFormat(broad)
        }
        ip = addOneToBinary(broad)
        datos.push(d)
    }

    return datos
}
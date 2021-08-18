
const validarUnos = (mask, len) => {
    let counter = 0;
    let numRed = 0;
    let sub = 0;
    let last = "1"
    for (let i = 0; i < mask.length; i++) {
        if (i < len) {
            if (last === "1" && mask[i] === "1") numRed++
            else return { ok: false }
        } else {
            if (last === "1" && mask[i] === "1") sub++
        }
        last = mask[i]
        if (last === "1") counter++
    }
    if (counter === numRed + sub) return { ok: true, red: numRed, sub: sub }
    return { ok: false }
}
const validMask = (mask, type) => {
    let len = 0
    if (type === "a") len = 8
    if (type === "b") len = 16
    if (type === "c") len = 24
    let res = validarUnos(mask, len)
    return res
}
const formatBinaryToIP = (binary) => {
    let ip = "";
    for (let i = 0; i < binary.length; i++) {
        if (i % 8 === 0 && i !== 0) {
            ip += "."
        }
        ip += binary[i]
    }
    return ip
}
const prepareBinary = (ip) => {
    let par1 = byteToBinary(ip.byte1)
    let par2 = byteToBinary(ip.byte2)
    let par3 = byteToBinary(ip.byte3)
    let par4 = byteToBinary(ip.byte4)
    return `${par1}${par2}${par3}${par4}`
}
const prepareIpRed = (binaryIp, red, sub) => {
    let r = ""
    let s = ""
    let h = ""
    for (let i = 0; i < binaryIp.length; i++) {
        if (i < red) r += ((i % 8 === 0 && i !== 0) ? "." : "") + binaryIp[i]
        else if (i < red + sub) s += ((i % 8 === 0 && i !== 0) ? "." : "") + binaryIp[i]
        else h += ((i % 8 === 0 && i !== 0) ? "." : "") + binaryIp[i]
    }
    return { red: r, sub: s, host: h }
}

const byteToBinary = (num) => {
    if (!num) {
        return ""
    }
    let result = ""
    if (typeof num === "number") {
        result += num.toString(2)
    } else if (typeof num === "string") {
        result += parseInt(num).toString(2)

    }
    let len = result.length
    return "0".repeat(8 - len) + result
}
const tipoIP = (firstOcteto) => {
    let num = 0
    if (!firstOcteto) {
        return { a: false, b: false, c: false }
    }
    if (typeof firstOcteto === "string") {
        num = parseInt(firstOcteto)
    } else if (typeof firstOcteto === "number") {
        num = firstOcteto
    }
    if (num > 0 && num < 128) return { a: true, b: false, c: false }

    if (num >= 128 && num < 192) return { a: false, b: true, c: false }
    if (num >= 192 && num < 224) return { a: false, b: false, c: true }
    return { a: false, b: false, c: false }
}

export { byteToBinary, tipoIP, validMask, prepareBinary, prepareIpRed, formatBinaryToIP };
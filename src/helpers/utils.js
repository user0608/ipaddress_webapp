
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
const prepareBinary2 = (ip) => {
    let par1 = byteToBinary(ip.byte1)
    let par2 = byteToBinary(ip.byte2)
    let par3 = byteToBinary(ip.byte3)
    let par4 = byteToBinary(ip.byte4)
    return `${par1}.${par2}.${par3}.${par4}`
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
const convertBinaryToIpFormat = (IPBinary = "") => {
    if (IPBinary.length === 35)
        IPBinary = IPBinary.replace(".", "").replace(".", "").replace(".", "")
    let ip = ""
    if (IPBinary.length === 32) {
        for (let i = 0; i < 32; i += 8) {
            ip += (i === 0 ? "" : ".") + parseInt(IPBinary.substring(i, i + 8), 2).toString()
        }
    }
    return ip
}

const mascar = {
    a: "11111111.00000000.00000000.00000000",
    b: "11111111.11111111.00000000.00000000",
    c: "11111111.11111111.11111111.00000000"
}
const operarRedWithBroad = (address = "", mask = "") => {
    let ip = ""
    for (let i = 0; i < address.length; i++) {
        if (mask[i] === "1") ip += address[i]
        else if (mask[i] === ".") ip += "."
        else ip += "0"
    }
    return ip
}
const prepareDetalle = (address = "", n = 0, tipo = "") => {
    let mask = mascar[tipo]
    let ipRed = operarRedWithBroad(address, mask)
    for (let i = 0; i < n; i++) {
        mask = mask.replace("0", "1")
    }
    let subIp = operarRedWithBroad(address, mask)
    let primeraIP = `${subIp.substring(0, subIp.length - 1)}1`
    let broadcast = subIp
    for (let i = 0; i < mask.length; i++) {
        if (mask[i] === "0") broadcast = `${broadcast.substring(0, i)}1${broadcast.substring(i + 1, broadcast.length)}`
    }
    let ultimaIp = `${broadcast.substring(0, subIp.length - 1)}0`
    return {
        red: convertBinaryToIpFormat(ipRed),
        subRed: convertBinaryToIpFormat(subIp),
        broadcast: convertBinaryToIpFormat(broadcast),
        primeraIP: convertBinaryToIpFormat(primeraIP),
        ultimaIp: convertBinaryToIpFormat(ultimaIp)
    }
}
export {
    byteToBinary,
    tipoIP,
    validMask,
    prepareBinary,
    prepareIpRed,
    formatBinaryToIP,
    convertBinaryToIpFormat,
    prepareDetalle,
    prepareBinary2
};
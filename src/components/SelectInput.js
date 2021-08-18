import { useState, useEffect } from "react";

const calNumHost = (value, tipo) => {
    let i = Math.log2(value)
    let hh = 0
    if (tipo === "a") {
        hh = 2 ** (24 - i) - 2
    }
    if (tipo === "b") {
        hh = 2 ** (16 - i) - 2
    }
    if (tipo === "c") {
        hh = 2 ** (8 - i) - 2
    }
    return hh
}
const SelectInput = ({ changeHandler, tipo, nr = 1 }) => {
    const [redes, setRedes] = useState([])
    const [hosts, setHosts] = useState([])
    const [redValue, setRedValue] = useState(nr)
    const [hostValue, setHostValue] = useState(0)
    const meddleWareChange = (e) => {
        let value = parseInt(e.target.value)
        switch (e.target.name) {
            case "redes":
                const hh = calNumHost(value, tipo)
                setHostValue(hh)
                setRedValue(value)
                changeHandler({ numRed: value, numHost: hh })
                break;
            case "hosts":
                let j = 0
                let rr = 0
                if (tipo === "c") j = 8 - Math.log2(value + 2)
                if (tipo === "b") j = 16 - Math.log2(value + 2)
                if (tipo === "a") j = 24 - Math.log2(value + 2)
                rr = 2 ** j
                setRedValue(rr)
                setHostValue(value)
                changeHandler({ numRed: rr, numHost: value })
                break;
            default:
        }
    }
    useEffect(() => {
        let h = []
        let r = []
        let lim = 0
        if (tipo === "a") lim = 24
        if (tipo === "b") lim = 16
        if (tipo === "c") lim = 8

        for (let i = 0; i < lim - 1; i++) {
            r = [...r, 2 ** i]
            h = [...h, 2 ** (i + 2) - 2]
        }
        setRedes(r)
        setHosts(h)       
        const hhhh =calNumHost(nr, tipo)
        setHostValue(hhhh)
    }, [tipo,nr])

    return (
        <div className="prefix">
            <div className="prefix-item ml">
                <label htmlFor="redes_id">SubRedes:</label>
                <select name="redes" id="redes_id"
                    onChange={meddleWareChange}
                    value={redValue}
                >
                    {
                        redes.map(red => (
                            <option key={red} value={red}>{red}</option>
                        ))
                    }
                </select>
            </div>
            <div className="prefix-item">
                <label htmlFor="hosts_id">Hosts:</label>
                <select name="hosts" id="hosts_id"
                    onChange={meddleWareChange}
                    value={hostValue}
                >
                    {
                        hosts.map(h => (
                            <option key={h} value={h}>{h}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    );
}

export default SelectInput;
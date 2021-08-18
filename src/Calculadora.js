import useIPState from "./hooks/useIPState";
import IPInputWithBinary from "./components/IPInputWithBinary";
import HeaderBox from "./components/HeaderBox";
import { useState } from "react";
import IPInputGeneral from "./components/IPInputGeneral";
import BinaryView from "./components/BinaryView";
import { prepareBinary, prepareIpRed, validMask } from "./helpers/utils";
const getTipoIp = (tipo) => {
    if (tipo.a) return "a"
    if (tipo.b) return "b"
    if (tipo.c) return "c"
}
const Calculadora = () => {
    const [ipValue, handler] = useIPState({})
    const [mask, handlerMask, resetHand] = useIPState({})
    const [tipoIP, setTipoIp] = useState({ a: false, b: false, c: false })
    const [binary, setBinary] = useState({ red: "", sub: "", host: "" })
    const handlerCheck = () => {
        if (
            mask.byte1 && ipValue.byte1 &&
            mask.byte2 && ipValue.byte1 &&
            mask.byte3 && ipValue.byte1 &&
            mask.byte4 && ipValue.byte1
        ) {
            let binary = prepareBinary(mask)
            let r = validMask(binary,getTipoIp(tipoIP))
            if (!r.ok) {
                alert("Mascara de red errónea")
                resetHand()
                setBinary({ red: "", sub: "", host: "" })
            }else{
                let redBinary = prepareBinary(ipValue)
                let rr =prepareIpRed(redBinary, r.red, r.sub)
                setBinary({ ...rr})
            }
        }
    }
    return (
        <div className="bg cal-box" >

            <HeaderBox selectedOption={tipoIP} />
            <p className="text-cal">IP Address</p>
            <IPInputWithBinary ipValue={ipValue}
                handlerChange={handler}
                onChangeTipoIp={setTipoIp}
            />
            <p className="text-cal">Subnet Mask</p>
            <IPInputGeneral
                handlerChange={handlerMask}
                IPValue={mask}
            />
            <div className="btn-cont">
                <button
                    className="text-cal"
                    onClick={handlerCheck}
                >
                    Check
                </button>
            </div>
            <div
                className="text-cal text-binary"
            >
                <BinaryView host={binary.host} sub={binary.sub} red={binary.red} />
            </div>
        </div>
    );
}

export default Calculadora;
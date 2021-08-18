import useIPState from "./hooks/useIPState";
import IPInputWithBinary from "./components/IPInputWithBinary";
import HeaderBox from "./components/HeaderBox";
import { useState } from "react";
import IPInputGeneral from "./components/IPInputGeneral";
import BinaryView from "./components/BinaryView";
import { prepareDetalle, prepareBinary, prepareBinary2, prepareIpRed, validMask } from "./helpers/utils";
import SelectInput from "./components/SelectInput";
import Detalle from "./components/Detalle";
const getTipoIp = (tipo) => {
    if (tipo.a) return "a"
    if (tipo.b) return "b"
    if (tipo.c) return "c"
}
const Calculadora = () => {
    const [errorMessage, setErrorMessage] = useState("")
    const [ipValue, handler] = useIPState({})
    const [mask, handlerMask, resetHand] = useIPState({})
    const [tipoIP, setTipoIp] = useState({ a: false, b: false, c: false })
    const [binary, setBinary] = useState({ red: "", sub: "", host: "" })
    const [detalle, setDetalle] = useState(
        {
            data: { red: "", sub: "", broadcast: "", primeraIP: "", ultimaIp: "" },
            show: false
        }
    )

    const handlerCheck = () => {
        if (
            mask.byte1 && ipValue.byte1 &&
            mask.byte2 && ipValue.byte1 &&
            mask.byte3 && ipValue.byte1 &&
            mask.byte4 && ipValue.byte1
        ) {
            let binary = prepareBinary(mask)
            let r = validMask(binary, getTipoIp(tipoIP))
            if (!r.ok) {
                setErrorMessage("Mascara de red errónea")
                resetHand()
                setBinary({ red: "", sub: "", host: "" })
            } else {
                let redBinary = prepareBinary2(ipValue)
                let rr = prepareIpRed(redBinary.replaceAll(".", ""), r.red, r.sub)              
                let dataDetalle = prepareDetalle(redBinary, r.sub, getTipoIp(tipoIP))
                setDetalle(
                    {
                        data: { ...dataDetalle },
                        show: true
                    }
                )

                setBinary({ ...rr })
                setErrorMessage("");
            }
        }
    }
    const numRedesHandler = ({ numRed, numHost }) => {
        console.log(numRed, numHost)
    }
    return (
        <div className="bg cal-box" >
            <HeaderBox selectedOption={tipoIP} />
            <p className={errorMessage && "error"}>{errorMessage}</p>
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
            {detalle.show &&
                <Detalle
                    {...detalle.data}
                />
            }
            <hr />

            <SelectInput tipo={getTipoIp(tipoIP)} changeHandler={numRedesHandler} />
        </div>
    );
}
export default Calculadora;
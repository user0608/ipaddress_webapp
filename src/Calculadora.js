import useIPState from "./hooks/useIPState";
import IPInputWithBinary from "./components/IPInputWithBinary";
import HeaderBox from "./components/HeaderBox";
import { useState } from "react";
import IPInputGeneral from "./components/IPInputGeneral";
import BinaryView from "./components/BinaryView";
import { prepareDetalle, prepareBinary, prepareBinary2, prepareIpRed, validMask, byteToBinary } from "./helpers/utils";
import SelectInput from "./components/SelectInput";
import Detalle from "./components/Detalle";
import { DataGrid } from "./components/DataGrid";
import { calculaSubnetPagina } from "./helpers/subnet";
import { Paginado } from "./components/Paginado";
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
    const [subAndHost, setSubAndHost] = useState({ sub: 1, host: 0 })
    const [detalle, setDetalle] = useState(
        {
            data: { red: "", sub: "", broadcast: "", primeraIP: "", ultimaIp: "" },
            show: false
        }
    )
    const [table, setTable] = useState()
    const [currentPage, setPage] = useState(1)
    const handlerCheck = () => {
        if (
            mask.byte1 && ipValue.byte1 &&
            mask.byte2 && ipValue.byte2 &&
            mask.byte3 && ipValue.byte3 &&
            mask.byte4 && ipValue.byte4
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
    const onCalcularHandler = (page) => {
        console.log(ipValue)
        console.log(tipoIP)
        console.log(subAndHost)
        if (ipValue.byte1 && ipValue.byte2 && ipValue.byte3 && ipValue.byte4) {
            let o1 = byteToBinary(ipValue.byte1)
            let o2 = byteToBinary(ipValue.byte2)
            let o3 = byteToBinary(ipValue.byte3)
            let o4 = byteToBinary(ipValue.byte4)
            let tIP = tipoIP.a ? "a" : tipoIP.b ? "b" : "c"
            console.log(`${o1}${o2}${o3}${o4}`, tipoIP)
            let result = calculaSubnetPagina(`${o1}${o2}${o3}${o4}`, tIP, subAndHost.sub, page)
            setTable(result)
            setPage(page)
            setErrorMessage("");
        } else {
            setErrorMessage("IP Incorrecto");
        }
    }
    const onChangePage = (page) => {
        onCalcularHandler(page)
    }
    return (
        <>
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
                <SelectInput tipo={getTipoIp(tipoIP)} changeHandler={setSubAndHost} />
                <div className="btn-cont">
                    <button
                        className="text-cal"
                        onClick={() => onCalcularHandler(1)}
                    >
                        Calcular
                    </button>
                </div>
            </div>
            {table &&
                <div>
                    <p>Pagina actual {currentPage} con 32 sub redes</p>
                    <Paginado num={subAndHost.sub} handlerCurrent={onChangePage} />
                    <hr />
                    <DataGrid data={table} />
                </div>
            }
        </>
    );
}
export default Calculadora;
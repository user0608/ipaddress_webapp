import React, { useState } from 'react'
import IPInputGeneral from './components/IPInputGeneral'
import { ListInput } from './components/ListInput'
import { subNetVLSM, validarData } from './helpers/subnet'
import { byteToBinary } from './helpers/utils'
import useIPState from './hooks/useIPState'
import { DataGridVLSM } from "./components/DataGridVLSM";

export const CalculadoraVLSM = () => {
    const [ip, handlerIP] = useIPState({})
    const [prefix, setPrefix] = useState(0)
    const [table, setTable] = useState()
    const handlerPrefix = (e) => {
        let val = parseInt(e.target.value)
        setPrefix(val)
    }  
    const handlerCalcular = (values = []) => {
        const hosts = values.map(v => v.val)
        const hostsReady = values.map(v => ({ nombre: v.label, host: v.val }))
        const result = validarData(prefix, hosts)
        if (!result.result) {
            alert(`El numero de host maximos disponibles es ${result.max}, se solicito ${result.total}`)
            return
        }
        if (ip.byte1 && ip.byte2 && ip.byte3 && ip.byte4) {
            let o1 = byteToBinary(ip.byte1)
            let o2 = byteToBinary(ip.byte2)
            let o3 = byteToBinary(ip.byte3)
            let o4 = byteToBinary(ip.byte4)
            const res = subNetVLSM(`${o1}${o2}${o3}${o4}`, hostsReady)
            setTable(res)
            console.log(res)
        } else {
            alert(`IP invalido!`)
        }
    }
    return (
        <>
            <div className="bg cal-box">
                <p className="text-cal">IP Address</p>
                <IPInputGeneral
                    handlerChange={handlerIP}
                    IPValue={ip}
                />
                <div className="ip-box8">
                    <span>Prefix:</span>
                    <input
                        name="byte1"
                        type="number"
                        min="0" max="32"
                        autoComplete="off"
                        value={prefix}
                        onChange={handlerPrefix}
                    />                    
                </div>
                <ListInput handlerCalcular={handlerCalcular} />
            </div>
            {table &&
                <div>
                    <p>Pagina actual con 32 sub redes</p>                    
                    <hr />
                    <DataGridVLSM data={table} />
                    
                </div>
            }
        </>
    )
}

import { tipoIP } from "../helpers/utils"

const IPInputBox = ({ IPValue, handlerChange, handlerTipoIp }) => {
    const auxTipiIP = (e) => {
        if (e.target.name === "byte1") {
            let r=tipoIP(e.target.value)
            handlerTipoIp({
                ...r
            })
        }
        if(e.target.name==="byte1" && parseInt(e.target.value)>=224){
            alert(`Clase A: [0 - 127], Clase B: [128 - 191], Clase C: [129 - 223],\n ${e.target.value} esta fuera del rango [0 - 223]`)
            return
        } 
        handlerChange(e)
    }
    return (
        <div className="ip-box8">
            <input
                name="byte1"
                type="number"
                min="0" max="255"
                autoComplete="off"
                value={IPValue?.byte1}
                onChange={auxTipiIP}
            />
            <input
                name="byte2"
                type="number"
                min="0" max="255"
                autoComplete="off"
                value={IPValue?.byte2}
                onChange={handlerChange}
            />
            <input
                name="byte3"
                type="number"
                min="0" max="255"
                autoComplete="off"
                value={IPValue?.byte3}
                onChange={handlerChange}
            />
            <input
                name="byte4"
                type="number"
                min="0" max="255"
                autoComplete="off"
                value={IPValue?.byte4}
                onChange={handlerChange}
            />
        </div>
    );
}

export default IPInputBox;
import React, { useState } from 'react'

export const ListInput = ({handlerCalcular}) => {
    const [val, setValue] = useState(0)
    const [label, setLabel] = useState("")
    const [values, setValues] = useState([])
    const setValHandler = (e) => {
        setValue(parseInt(e.target.value))
    }
    const setLabelHandler = (e) => {
        setLabel(e.target.value)
    }
    const addHandler = () => {
        if (val === 0 || label === "") {
            alert("Datos invalidos")
            return
        }
        setValue(0)
        setLabel("")
        setValues([...values, { val, label }])
    }
    const resetHandler = () => {
        setValue(0)
        setLabel("")
        setValues([])
    }
    const calcularHandler = () => {
        setValue(0)
        setLabel("")
        if (handlerCalcular) {
            handlerCalcular(values)
        }
    }
    return (
        <div>
            <hr />
            <div >
                <span className="bb-la">Label:</span>
                <input className="bb2" type="text" value={label} onChange={setLabelHandler} />
                <span className="bb-la">Hosts:</span>
                <input className="bb" type="number" value={val} onChange={setValHandler} />
                <div className="btn-cont">
                    <button
                        className="text-cal"
                        onClick={resetHandler}
                    >
                        Reset
                    </button>
                    <button
                        className="text-cal"
                        onClick={addHandler}
                    >
                        Add
                    </button>
                </div>
                <hr />
                <div className="btn-cont">
                    <button
                        className="text-cal"
                        onClick={calcularHandler}
                    >
                        Calcular
                    </button>
                </div>
            </div>
            <table className="mi-tabla">
                <tr>
                    <th>Label</th>
                    <th>Num Hosts</th>
                </tr>
                {
                    values.map(v => (
                        <tr key={`${v.label}${v.val}`}>
                            <td>{v.label}</td>
                            <td>{v.val}</td>
                        </tr>
                    ))
                }
            </table>
        </div>
    )
}

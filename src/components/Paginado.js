import React, { useState } from 'react'

export const Paginado = ({ num = 180, handlerCurrent }) => {  
    const last = parseInt((num + 31) / 32)
    const [input, setInput] = useState(1)
    const handlerChange = (e) => {
        setInput(e.target.value)
    }
    const handlerOK = (e) => {
        e.preventDefault()        
        if(input<=last){
            handlerCurrent(input)
        }else{
            alert(`Solo hay ${last} paginas`)
            setInput(1)
        }
    }
    return (
        <div className="page-form">
            <spam>Pagina:</spam>
            <form onSubmit={handlerOK}>
                <input type="number" value={input} className="page" onChange={handlerChange} />
                <button>OK</button>
            </form>
            <spam>Total de paginas {last}</spam>
        </div>
    )


}

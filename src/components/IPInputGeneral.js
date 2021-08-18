
const IPInputGeneral = ({ IPValue, handlerChange}) => {
   
    return (
        <div className="ip-box8">
            <input
                name="byte1"
                type="number"
                min="0" max="255"
                autoComplete="off"
                value={IPValue?.byte1}
                onChange={handlerChange}
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

export default IPInputGeneral;
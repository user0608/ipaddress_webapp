import OptionCheck from "./OptionCheck"

const HeaderBox = ({ selectedOption = { a: false, b: false, c: false } }) => {
    const rango = { start: "100", end: "100" }
    return (
        <div className="header">
            <div className="ip-box8">
                <p>Clase:</p>
                <OptionCheck label="A" checked={selectedOption.a} />
                <OptionCheck label="B" checked={selectedOption.b} />
                <OptionCheck label="C" checked={selectedOption.c} />
            </div>            
        </div>
    );
}

export default HeaderBox;
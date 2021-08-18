import OptionCheck from "./OptionCheck"

const HeaderBox = ({ selectedOption = { a: false, b: false, c: false } }) => {    
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
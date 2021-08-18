const OptionCheck = ({label="N",checked=false}) => {
    return (
        <div className="check-item">
            <input
                type="radio"
                id="a"
                checked={checked}
                disabled={!checked}
            />    
            <span>{label}</span>        
        </div>
    );
}

export default OptionCheck;
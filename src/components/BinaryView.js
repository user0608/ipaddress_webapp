const BinaryView = ({ red = "0000", sub = "0000", host = "0000" }) => {
    return (
        <>
            <span className="red">{red}</span>
            <span className="sub">{sub}</span>
            <span className="host">{host}</span>
        </>
    );
}

export default BinaryView
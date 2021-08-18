const Detalle = ({ red, subRed, broadcast, primeraIP, ultimaIp }) => {
    return (
        <div className="box">
            <div className="box-items">
                <div className="i-item">
                    <span>Network Address:</span>
                    <span>{red}</span>
                </div>
                <div className="i-item">
                    <span>Subnet Address:</span>
                    <span>{subRed}</span>
                </div>
                <div className="i-item">
                    <span>First valid IP:</span>
                    <span className="ip">{primeraIP}</span>
                </div>
                <div className="i-item">
                    <span>Last valid IP:</span>
                    <span className="ip">{ultimaIp}</span>
                </div>
                <div className="i-item">
                    <span>Broadcast Address:</span>
                    <span>{broadcast}</span>
                </div>
                {/* <div className="i-item">
                    <span>Number Host:</span>
                    <span>3</span>
                </div> */}
            </div>
        </div>
    );
}

export default Detalle;
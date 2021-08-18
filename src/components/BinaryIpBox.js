import { byteToBinary } from "../helpers/utils";

const BinaryIpBox = ({ipValue={}}) => {    
    
    return (
        <div >
            <div className="ip-box8 bytes-color">
                <input
                    name="byte1"
                    type="text"
                    value={byteToBinary(ipValue?.byte1)}                   
                    disabled                    
                />
                <input
                    name="byte1"
                    type="text"
                    value={byteToBinary(ipValue?.byte2)} 
                    disabled
                
                />
                <input
                    name="byte1"
                    type="text"                   
                    value={byteToBinary(ipValue?.byte3)} 
                    disabled
                />
                <input
                    name="byte1"
                    type="text"
                    value={byteToBinary(ipValue?.byte4)} 
                    disabled
                />                
            </div>
        </div>
    );
}

export default BinaryIpBox;
import IPInputBox from "./IPInputBox"
import BinaryIpBox from "./BinaryIpBox"

const IPInputWithBinary = ({ipValue,handlerChange,onChangeTipoIp}) => {
  return (
    <div>
      <IPInputBox 
        IPValue={ipValue} 
        handlerChange={handlerChange} 
        handlerTipoIp={onChangeTipoIp}
        />
      <BinaryIpBox ipValue={ipValue}/>
    </div>
  );
}

export default IPInputWithBinary;
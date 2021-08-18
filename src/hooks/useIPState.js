import { useState } from "react";
const useIPState = ({init={byte1: "",byte2: "",byte3: "",byte4: ""}}) => {
    const [ipValue, setIpValue] = useState(init)
    const handlerInputChange = (e) => {
        if(e.target.value.length>1 && e.target.value[0]==="0"){
            return
        }    
        if(e.target.value ===""||(parseInt(e.target.value)<=255 && parseInt(e.target.value)>=0)){           
            setIpValue({
                ...ipValue,
                [e.target.name]: e.target.value
            })
        }        
    }    
    const resetHand =()=>{
        setIpValue(init)
    }
    return [ipValue,handlerInputChange,resetHand]
}
 
export default useIPState;
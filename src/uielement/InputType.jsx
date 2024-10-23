import React from 'react'
import { SearchIco } from "../icons/icons";
function InputType(props) {
    const Sico = SearchIco;
  return (
    <div className='input-feild'>
        <label> <span>{<SearchIco/>}</span>       <input type={props.type} placeholder={props.placeholder}/>
        </label>
    </div>
  )
}

export default InputType
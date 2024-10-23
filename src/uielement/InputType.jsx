import React from "react";
import { SearchIco } from "../icons/icons";
function InputType(props) {
  return (
    <div className={`input-feild ${!props?.icon ? "" : "non-icon"}`}>
      <label>
     
        {props?.label && <p className="label">{props.label}</p>}
        {!props.icon && <span>{<SearchIco />}</span>}{" "}
        <input placeholder={props.placeholder} type={props.type} />
      </label>
    </div>
  );
}

export default InputType;

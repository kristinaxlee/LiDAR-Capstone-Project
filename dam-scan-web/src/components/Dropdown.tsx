import React from "react";
import { DropdownContainer, DropdownSelect } from "./ui/DropdownUI";

function Dropdown(props: any) {
  return (
    <DropdownContainer>
      <DropdownSelect onChange={props.change} value={props.value}>
        <option value="">-- --</option>
        {props.options.map((item: any) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </DropdownSelect>
    </DropdownContainer>
  );
}

export default Dropdown;

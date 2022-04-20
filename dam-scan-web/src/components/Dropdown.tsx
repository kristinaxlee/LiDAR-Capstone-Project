import React from "react";
import { DropdownContainer, DropdownSelect } from "./ui/DropdownUI";

const Dropdown = (props: any) => {
  return (
    <DropdownContainer>
      <DropdownSelect onChange={props.change} value={props.value}>
        <option value="">-- --</option>
        {props.options.map((item: any) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </DropdownSelect>
    </DropdownContainer>
  );
};

const DateDropdown = (props: any) => {
  return (
    <DropdownContainer>
      <DropdownSelect onChange={props.change}>
        <option value="">-- --</option>
        {props.options.map((item: any) => (
          <option key={item.id} value={JSON.stringify(item)}>
            {item.date}
          </option>
        ))}
      </DropdownSelect>
    </DropdownContainer>
  );
};

export { Dropdown, DateDropdown };

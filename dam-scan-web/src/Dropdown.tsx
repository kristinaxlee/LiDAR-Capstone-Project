import React from "react";
import styled from "styled-components";

const DropdownContainer = styled.div`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

function Dropdown(props: any) {
  return (
    <DropdownContainer>
      <select onChange={props.change} value={props.value}>
        <option value="0">-- --</option>
        {props.options.map((item: any) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </DropdownContainer>
  );
}

export default Dropdown;

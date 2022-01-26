import React from "react";
import styled from "styled-components";

const DropdownContainer = styled.div``;

const DropdownSelect = styled.select`
  border-radius: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: "Nunito", sans-serif;
  border: none;
  padding: 2px;
  min-width: 150px;
  height: 24px;
  font-size: 14px;
`;

function Dropdown(props: any) {
  return (
    <DropdownContainer>
      <DropdownSelect onChange={props.change} value={props.value}>
        <option value="0">-- --</option>
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

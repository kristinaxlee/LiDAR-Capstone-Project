import React from "react";

function Dropdown(props: any) {
  return (
    <div>
      <select onChange={props.change} value={props.value}>
        <option value="0">-- Select --</option>
        {props.options.map((item: any) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;

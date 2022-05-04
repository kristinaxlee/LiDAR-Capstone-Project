import React from "react";
import { DropdownContainer, DropdownSelect } from "./ui/DropdownUI";

function timeConverter(UNIX_timestamp: number) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var time = month + " " + date + " " + year;
  return time;
}

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
            {timeConverter(item.date)}
          </option>
        ))}
      </DropdownSelect>
    </DropdownContainer>
  );
};

export { Dropdown, DateDropdown };

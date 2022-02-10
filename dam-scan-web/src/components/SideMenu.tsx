import React, { useState } from "react";
import Dropdown from "./Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import "../App.css";
import { renderDisplay } from "../threeFunctions";

import logo from "../assets/radar.png";
import room from "../assets/room.png";
import date from "../assets/calendar-day.png";
import department from "../assets/department.png";
import calendar from "../assets/calendar.png";
import {
  DateInput,
  DateLabelContainer,
  DisplayButton,
  FaIconContainer,
  FilterBody,
  FilterContainer,
  FilterFooter,
  FilterLabel,
  FilterName,
  FilterTitleSmall,
  Icon,
  SideMenuContainer,
  SideMenuHeader,
  SideMenuTitle,
  SiteLogo,
  SiteTitle,
} from "./ui/SideMenuUI";

const options = [
  {
    id: 1,
    name: "1",
  },
  {
    id: 2,
    name: "2",
  },
  {
    id: 3,
    name: "3",
  },
];

function SideMenu(props: any) {
  const { filters, setRoom, setDate, setDepartment, setToDate, setFromDate, setTitles } =
    props;

  const [menuActive, setMenuActive] = useState(true);
  
  return (
    <div>
      <SideMenuContainer
        style={{
          width: menuActive ? "450px" : "88px",
        }}
      >
        <SideMenuHeader>
          <SiteLogo src={logo} />

          <SiteTitle style={{ display: !menuActive ? "none" : "" }}>
            DAMSCAN
          </SiteTitle>

          <FaIconContainer
            style={{ backgroundColor: "#0883eb", boxShadow: "none" }}
          >
            {menuActive ? (
              <FontAwesomeIcon
                style={{ display: "block", margin: "auto" }}
                icon={faChevronDown}
                color="#0883eb"
              />
            ) : (
              <FontAwesomeIcon
                style={{ display: "block", margin: "auto" }}
                icon={faChevronLeft}
                color="#0883eb"
              />
            )}
          </FaIconContainer>
        </SideMenuHeader>

        <FilterBody>
          <div
            style={{
              color: "white",
              width: "90%",
              alignItems: "center",
              margin: "auto",
              display: !menuActive ? "none" : "",
            }}
          >
            <SideMenuTitle>Filters</SideMenuTitle>
            <FilterContainer>
              <FilterLabel>
                <Icon src={department} />
                <FilterName>Category</FilterName>
              </FilterLabel>

              <Dropdown
                options={options}
                value={filters.department}
                change={setDepartment}
              />
            </FilterContainer>

            <FilterContainer>
              <FilterLabel>
                <Icon src={calendar} />
                <FilterName>Dates</FilterName>
              </FilterLabel>
              <DateLabelContainer>
                <FilterTitleSmall>From</FilterTitleSmall>
              </DateLabelContainer>
              <DateInput
                type="date"
                value={filters.fromDate}
                onChange={setFromDate}
              ></DateInput>

              <DateLabelContainer>
                <FilterTitleSmall>To</FilterTitleSmall>
              </DateLabelContainer>
              <DateInput
                type="date"
                value={filters.toDate}
                onChange={setToDate}
              ></DateInput>
            </FilterContainer>

            <SideMenuTitle>Select a location</SideMenuTitle>
            <FilterContainer>
              <FilterLabel>
                <Icon src={room} />
                <FilterName>Room</FilterName>
              </FilterLabel>

              <Dropdown
                options={options}
                value={filters.room}
                change={setRoom}
              />
            </FilterContainer>
            <FilterContainer>
              <FilterLabel>
                <Icon src={date} />
                <FilterName>Date</FilterName>
              </FilterLabel>

              <Dropdown
                options={options}
                value={filters.date}
                change={setDate}
              />
            </FilterContainer>
            <DisplayButton
              onClick={() => {
                if (filters.room !== "" && filters.date !== "") {
                  renderDisplay();
                  setTitles({
                    curDate: filters.date,
                    curRoom: filters.room,
                    displayClicked: true, 

                  })
                } else {
                  window.alert("Please select a room and date!");
                }
              }}
            >
              Display!
            </DisplayButton>
          </div>
        </FilterBody>

        <FilterFooter>
          <FaIconContainer
            onClick={() => {
              setMenuActive((curMenuActive: Boolean) => !curMenuActive);
            }}
          >
            {menuActive ? (
              <FontAwesomeIcon
                style={{ display: "block", margin: "auto" }}
                icon={faChevronDown}
                color="#0883eb"
              />
            ) : (
              <FontAwesomeIcon
                style={{ display: "block", margin: "auto" }}
                icon={faChevronLeft}
                color="#0883eb"
              />
            )}
          </FaIconContainer>
        </FilterFooter>
      </SideMenuContainer>
    </div>
  );
}

export default SideMenu;

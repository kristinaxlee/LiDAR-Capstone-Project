import React, { useState } from "react";
import styled from "styled-components";
import Dropdown from "./Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import { renderDisplay } from "./threeFunctions";

import logo from "./assets/radar.png";
import room from "./assets/room.png";
import date from "./assets/calendar-day.png";
import department from "./assets/department.png";
import calendar from "./assets/calendar.png";

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

const SideMenuContainer = styled.div`
  background-color: #0883eb;
  width: 450px;
  text-align: center;
  display: flex;
  flex-flow: column;
  height: 100%;
`;

const SideMenuHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  color: white;
  padding-top: 10px;
  padding-bottom: 10px;
  flex: 0 1 auto;
  min-height: 88px;
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  margin: 5px;
  position: relative;
  height: 30px;
`;

const FilterName = styled.p`
  color: white;
  padding-left: 5px;
  font-size: 20px;
  font-weight: 600;
`;

const SideMenuTitle = styled.p`
  color: white;
  font-size: 24px;
  padding-top: 16px;
  padding-bottom: 8px;
  font-weight: 700;
`;

const Icon = styled.img`
  height: 24px;
`;

const SiteLogo = styled.img`
  height: 48px;
  padding-left: 20px;
`;

const SiteTitle = styled.p`
  font-size: 40px;
  color: white;
  font-weight: 800;
`;

const FaIconContainer = styled.div`
  display: flex;
  margin-right: 20px;
  background-color: white;
  width: 25px;
  height: 25px;
  border-radius: 10px;
  align-items: center;
  text-align: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transition: transform 0.2s;
  &: hover {
    transform: scale(1.05);
  }
`;

const FilterLabel = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitleSmall = styled.div`
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
  align-self: flex-end;
  margin-left: 4px;
  padding-bottom: 4px;
`;

const DisplayButton = styled.div`
  background-color: white;
  color: #0883eb;
  width: 150px;
  text-align: center;
  border-radius: 20px;
  padding: 8px;
  margin: 0 auto;
  margin-top: 20px;
  font-weight: 700;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transition: transform 0.2s;
  &: hover {
    transform: scale(1.05);
  }
`;

const DateLabelContainer = styled.div`
  height: 100%;
  display: flex;
`;

const DateInput = styled.input`
  border: none;
  border-radius: 4px;
  padding: 4px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 12px;
  height: 16px;
`;

const FilterBody = styled.div`
  flex: 1 1 auto;
  height: 80%;
  display: flex;
  align-items: center;
`;

const FilterFooter = styled.div`
  flex: 0 1 40px;
  padding-left: 33px;
  padding-bottom: 33px;
`;

function SideMenu(props: any) {
  const {
    filters,
    setRoom,
    setDate,
    setDepartment,
    setToDate,
    setFromDate,
    menuActive,
    setMenuActive,
  } = props;

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

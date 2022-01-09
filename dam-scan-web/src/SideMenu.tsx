import React, { useState } from "react";
import styled from "styled-components";
import Dropdown from "./Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

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
  width: 400px;
  text-align: center;
`;

const SideMenuHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  color: white;
  padding-top: 10px;
  padding-bottom: 10px;
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
`;

const SiteTitle = styled.p`
  font-size: 40px;
  padding-left: 10px;
  color: white;
  font-weight: 700;
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
  padding: 4px;
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
`;

function SideMenu(props: any) {
  const [filters, setFilters] = useState({
    department: "",
    fromDate: "",
    toDate: "",
    room: "",
    date: "",
  });

  const changeRoom = (e: any) => {
    setFilters({
      ...filters,
      room: e.target.value,
    });
  };

  const changeDate = (e: any) => {
    setFilters({
      ...filters,
      date: e.target.value,
    });
  };

  const changeDepartment = (e: any) => {
    setFilters({
      ...filters,
      department: e.target.value,
    });
  };

  const changeToDate = (e: any) => {
    setFilters({
      ...filters,
      toDate: e.target.value,
    });
  };

  const changeFromDate = (e: any) => {
    setFilters({
      ...filters,
      fromDate: e.target.value,
    });
  };

  const [menuActive, setMenuActive] = useState(true);
  return (
    <div>
      <SideMenuContainer style={{ height: menuActive ? "100vh" : "" }}>
        <SideMenuHeader>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingLeft: "20px",
            }}
          >
            <SiteLogo src={logo} />
            <SiteTitle>DAMSCAN</SiteTitle>
          </div>

          <FaIconContainer
            onClick={() => {
              setMenuActive(!menuActive);
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
        </SideMenuHeader>

        {menuActive && (
          <div
            style={{
              display: "flex",
              minHeight: "90%",
            }}
          >
            <div
              style={{
                color: "white",
                width: "90%",
                alignItems: "center",
                margin: "auto",
              }}
            >
              <SideMenuTitle>Filters</SideMenuTitle>
              <FilterContainer>
                <FilterLabel>
                  <Icon src={department} />
                  <FilterName>Department</FilterName>
                </FilterLabel>

                <Dropdown
                  options={options}
                  value={filters.department}
                  change={changeDepartment}
                />
              </FilterContainer>

              <FilterContainer>
                <FilterLabel>
                  <Icon src={calendar} />
                  <FilterName>Dates</FilterName>
                </FilterLabel>
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    padding: "4px",
                  }}
                >
                  <FilterTitleSmall>From</FilterTitleSmall>
                </div>
                <input
                  type="date"
                  id="start"
                  name="trip-start"
                  value={filters.fromDate}
                  onChange={changeFromDate}
                ></input>

                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    padding: "4px",
                  }}
                >
                  <FilterTitleSmall>To</FilterTitleSmall>
                </div>
                <input
                  style={{ fontSize: "8px" }}
                  type="date"
                  id="start"
                  name="trip-start"
                  value={filters.toDate}
                  onChange={changeToDate}
                ></input>
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
                  change={changeRoom}
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
                  change={changeDate}
                />
              </FilterContainer>
              <DisplayButton>Display!</DisplayButton>
            </div>
          </div>
        )}
      </SideMenuContainer>
    </div>
  );
}

export default SideMenu;

import React, { useState, useEffect } from "react";
import axios from "axios";
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
import building from "../assets/department.png";
import department from "../assets/college.png";
import calendar from "../assets/calendar.png";
import { DateDropdown, Dropdown } from "./Dropdown";
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

const departments = ["Engineering", "Science", "Agriculture", "Academic"];

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

function SideMenu(props: any) {
  const {
    filters,
    setRoom,
    setSelectedScan,
    setDepartment,
    setBuilding,
    setToDate,
    setFromDate,
    setTitles,
    setShowWarning,
    setFirstLoad,
    firstLoad,
    setShowTips,
    selectedScan,
  } = props;

  const [menuActive, setMenuActive] = useState(true);
  const [results, setResults] = useState([]); // all scan objects
  const [buildingResults, setBuildingResults] = useState([]); // all buildings
  const [roomResults, setRoomResults] = useState([]); // all rooms for a certain building

  // API call to grab buildings
  useEffect(() => {
    // include query param for category when selected
    axios
      .get(`http://localhost:8888/scans/buildings`, {
        params: { category: filters.department },
      })
      .then((res) => {
        const data = res.data;
        setBuildingResults(data);
      });
  }, [filters.department]);

  // API call to grab rooms for a chosen building (building must be chosen first)
  useEffect(() => {
    // make sure that a building has been selected before we make the API call to grab rooms
    if (filters.building !== "") {
      axios
        .get(`http://localhost:8888/scans/rooms`, {
          params: { building: filters.building },
        })
        .then((res) => {
          const data = res.data;
          setRoomResults(data);
        });
    }
  }, [filters.building, filters.department]);

  // API call to grab available dates (building and room must be chosen first)
  useEffect(() => {
    if (filters.building !== "" && filters.room !== "") {
      axios
        .get(`http://localhost:8888/scans`, {
          params: {
            building: filters.building,
            room: filters.room,
            fromDate: filters.fromDate,
            toDate: filters.toDate,
          },
        })
        .then((res) => {
          const data = res.data;
          console.log(" --- scan results: ", data);
          setResults(res.data);
        });
    }
  }, [
    filters.building,
    filters.room,
    filters.fromDate,
    filters.toDate,
    filters.department,
  ]);

  return (
    <div>
      <SideMenuContainer
        style={{
          width: menuActive ? "450px" : "88px",
        }}
        id="side-menu"
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
                <FilterName>Department</FilterName>
              </FilterLabel>

              <Dropdown
                options={departments}
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
                <Icon src={building} />
                <FilterName>Building</FilterName>
              </FilterLabel>

              <Dropdown
                options={buildingResults}
                value={filters.building}
                change={setBuilding}
              />
            </FilterContainer>
            <FilterContainer>
              <FilterLabel>
                <Icon src={room} />
                <FilterName>Room</FilterName>
              </FilterLabel>

              <Dropdown
                options={roomResults}
                value={filters.room}
                change={setRoom}
              />
            </FilterContainer>
            <FilterContainer>
              <FilterLabel>
                <Icon src={date} />
                <FilterName>Date</FilterName>
              </FilterLabel>

              <DateDropdown
                options={results}
                value={selectedScan}
                change={(e: any) => {
                  setSelectedScan(JSON.parse(e.target.value));
                }}
              />
            </FilterContainer>
            <DisplayButton
              id="display-button"
              onClick={() => {
                // if user correctly picks a room and date, then display the scan and update the titles
                if (
                  filters.building !== "" &&
                  filters.room !== "" &&
                  selectedScan !== {}
                ) {
                  renderDisplay(selectedScan.filename);
                  setShowWarning(false);

                  setTitles({
                    curDate: timeConverter(selectedScan.date),
                    curRoom: selectedScan.building + " " + selectedScan.room,
                    displayClicked: true,
                  });
                  // if this is user's first load, then show tips then set first load to false
                  if (firstLoad) {
                    setShowTips(true);
                    setFirstLoad(false);
                  }
                } else {
                  setShowWarning(true);
                }
              }}
            >
              Display!
            </DisplayButton>
          </div>
        </FilterBody>

        <FilterFooter>
          <FaIconContainer
            id="expand-menu-button"
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

import styled from "styled-components";

export const IconContainer = styled.div`
  display: flex;
  text-align: center;
  background-color: #0883eb;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 15px;
  position: absolute;
  right: 10px;
  font-size: 30px;
  transition: transform 0.2s;
  &: hover {
    transform: scale(1.05);
  }
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

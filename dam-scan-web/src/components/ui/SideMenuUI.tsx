import styled from "styled-components";

export const DateInput = styled.input`
  border: none;
  border-radius: 4px;
  padding: 2px;
  padding-left: 4px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 12px;
`;

export const DateLabelContainer = styled.div`
  height: 100%;
  display: flex;
`;

export const DisplayButton = styled.div`
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

export const FaIconContainer = styled.div`
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

export const FilterLabel = styled.div`
  display: flex;
  align-items: center;
`;

export const FilterTitleSmall = styled.div`
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
  align-self: flex-end;
  margin-left: 4px;
  padding-bottom: 4px;
`;

export const FilterBody = styled.div`
  flex: 1 1 auto;
  height: 80%;
  display: flex;
  align-items: center;
`;

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  margin: 5px;
  position: relative;
  height: 30px;
`;

export const FilterFooter = styled.div`
  flex: 0 1 40px;
  padding-left: 33px;
  padding-bottom: 33px;
`;

export const FilterName = styled.p`
  color: white;
  padding-left: 5px;
  font-size: 20px;
  font-weight: 600;
`;

export const Icon = styled.img`
  height: 24px;
`;

export const SideMenuContainer = styled.div`
  background-color: #0883eb;
  width: 450px;
  text-align: center;
  display: flex;
  flex-flow: column;
  height: 100%;
`;

export const SideMenuHeader = styled.div`
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

export const SideMenuTitle = styled.p`
  color: white;
  font-size: 24px;
  padding-top: 16px;
  padding-bottom: 8px;
  font-weight: 700;
`;

export const SiteLogo = styled.img`
  height: 48px;
  padding-left: 20px;
`;

export const SiteTitle = styled.p`
  font-size: 40px;
  color: white;
  font-weight: 800;
`;


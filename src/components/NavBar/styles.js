import styled from 'styled-components/native';

export const ContainerNav = styled.View`
  width: 100%
  background-color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding:0px 20px;
  border-bottom: 5px solid #ddd;
  height: 60px;
  
`;
export const ContainerSelect = styled.View`
  width: 60px;
  height: 40px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-top: 10px;
  margin-left: 20px;
`;
export const ContainerTabNav = styled.View`
  background-color: transparent;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: auto;
  gap: 10px;
  // border: solid 1px white;
`;

export const ContainerTabCreator = styled.View`
  display: flex;
  width: 50px;
  flex-direction: row;
  border: solid 1px white;
`;

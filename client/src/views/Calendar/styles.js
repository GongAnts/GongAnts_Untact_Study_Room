import styled from 'styled-components';

// Calendar js //
export const ButtonWrapper = styled.div`
  position: absolute;
  left: 90%;
  top: 70vh;
  text-align: center;
  padding-bottom: 3px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  height: 150px;
  &:hover .subBtn {
    opacity: 1;
    visibility: visible;
    top: 0;
  }
  & > svg {
    cursor: pointer;
    border-radius: 50%;
    color: white;
    width: 50px;
    height: 50px;
    padding: 10px;
    &.filterBtn {
      background-color: pink;
      z-index: 1;
      transition: all 0.4s ease;
    }
    &.writeBtn {
      background-color: skyblue;
      z-index: 2;
      transition: all 0.5s ease;
    }
    &.menuBtn {
      background-color: #ffdb0d;
      z-index: 3;
    }
    &.subBtn {
      opacity: 0;
      visibility: hidden;
      top: 60px;
      position: relative;
    }
  }
`;

// Day js //
export const D = styled.div`
  padding-top: 4px;
  height: 12vh;
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow: hidden;
  &.grayed {
    color: gray;
  }
  &.today > .title {
    color: white;
    background-color: skyblue;
  }
  & > .title {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 30px;
    height: 30px;
  }
`;

export const Plan = styled.label`
  text-align: center;
  background-color: ${(props) => props.color};
  font-size: 0.8em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 1px 0;
  height: 20px;
  width: 100%;
  border-radius: 7px;
  color: white;
  cursor: pointer;
  &.completed {
    background-color: #bfbfbf;
  }
`;

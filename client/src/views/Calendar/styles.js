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

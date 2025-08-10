import styled from "styled-components";

export let HeaderWrapper = styled.div`
  height: 30px;
  display: flex;
  justify-content: center;
  .header {
    margin-right: 20px;
    font-size: 20px;

    a:hover {
      text-decoration: none;
    }

    .active {
      color: #fff;
      background: #000;
      text-decoration: none;
    }
  }
`;

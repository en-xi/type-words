import styled from "styled-components";

export let DefinitionWrapper = styled.div`
  > div {
    display: grid;
    grid-template-columns: 1fr 4fr;
  }
  dt {
    color: green;
  }
  a.more {
    text-decoration: none;

    &:hover {
      background-color: lightgrey;
    }
  }
  span.level {
    color: blue;
  }

  dd {
    padding-left: 20px;
  }
`;

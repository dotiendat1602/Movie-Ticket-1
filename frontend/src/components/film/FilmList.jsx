import React from 'react'
import styled from 'styled-components';
const FilmListStyled = styled.div`
  display: flex;
  left:'auto';
  flex-wrap: wrap;
  gap:10px;
  padding-left: 10%;
  padding-right: 10%;
  justify-content: center;
  width: 100%;
`;
export default function FilmList(props) {
  return (
    <FilmListStyled>{props.children}</FilmListStyled>
  )
}

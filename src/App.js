import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import iconDice from './iconDice.svg';
import './static/Manrope-Light.ttf';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: hsl(218, 23%, 16%);
  }

  @font-face {
    font-family: "ManropeLight";
    src: local("ManropeLight"),
    url("./static/Manrope-light.ttf") format("truetype");
    font-weight: normal;
  }
`;

const Div = styled.div`
  background: hsl(217, 19%, 24%);
  color: hsl(193, 38%, 86%);
  padding: 20px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2.5rem 5rem 0 rgba(0, 0, 0, 0.1);
  border-radius: 3mm;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'ManropeLight';
  font-size: 30px;

  @media screen and (max-width: 40em) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'ManropeLight';
    font-size: 20px;
    width: 200px;
  }
`;

const H5 = styled.h5`
  color: hsl(150, 100%, 66%);
  font-size: 15px;

  @media screen and (max-width: 40em) {
    font-size: 10px;
  }
  
`;

const Img = styled.img`
  margin-bottom: -40px;
  background-color: hsl(150, 100%, 66%);
  border-radius: 6mm;
  padding: 10px;
  transition: 0.1s;

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 12px 1px hsl(150, 100%, 66%);
  }

  &:active {
    background-color: hsl(193, 38%, 86%);
  }
`;

function App() {
  const [getAdvice, setGetAdvice] = useState('');
  const [isError, setisError] = useState(null);

  const handleClick = () => {
    fetch('https://api.adviceslip.com/advice')
      .then(response => {
        if(!response.ok) {
          throw Error('Could not fetch advice from this resource');
        }
        return response.json();
      })
      .then(slip => {
        setGetAdvice(slip);
        setisError(null);
      })
      .catch(err => {
        setisError(err.message);
      })
  };

  return (
    <div >
        <GlobalStyle />
        <Div>
            { isError && <div>{isError}</div> }
            { getAdvice && 
            <div>
              <H5>ADVICE #{getAdvice.slip.id} </H5>
              <p><q> {getAdvice.slip.advice} </q></p> 
            </div> 
            }
            {/* <svg width="300" height="16" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path fill="#4F5D74" d="M0 8h196v1H0zM248 8h196v1H248z"/><g transform="translate(212)" fill="#CEE3E9"><rect width="6" height="16" rx="3"/><rect x="14" width="6" height="16" rx="3"/></g></g></svg>      */}
            <Img src={iconDice} alt= '' onClick={handleClick} />
        </Div>
    </div>
  );
}

export default App;

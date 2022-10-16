import styled, { createGlobalStyle, keyframes } from 'styled-components'
import { Link } from 'react-router-dom'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #ACF9D2;
    font-family: sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: grid;
  }

  a {
    color: black;
    text-decoration: none;
  }
`

export const Container = styled.div`
  max-width: 920px;
  padding-right: 1rem;
  padding-left: 1rem;
  margin: auto;
  border-radius: 10px;
`

export const Input = styled.input`
  max-width: 100%;
  padding: 11px 13px;
  background: #f9f9fa;
  color: #f03d4e;
  margin-bottom: 0.9rem;
  border-radius: 35px;
  outline: 0;
  border: 1px solid rgba(245, 245, 245, 0.7);
  font-size: 14px;
  transition: all 0.3s ease-out;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
  :focus,
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }
`
const jump = keyframes`
  from{
    transform: translateY(0)
  }
  to{
    transform: translateY(-3px)
  }
`

export const LoginButton = styled.button`
  max-width: 68%;
  padding: 1rem 1rem;
  color: black;
  text-transform: uppercase;
  background: #b7d7e8;
  border: none;
  border-radius: 3px;
  outline: 0;
  cursor: pointer;
  margin-top: 0.6rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;
  :hover {
    background: #87bdd8;
    animation: ${jump} 0.2s ease-out forwards;
  }
`

export const CancelButton = styled.button`
  max-width: 68%;
  padding: 1rem 1rem;
  color: black;
  text-transform: uppercase;
  background: #e8b7d8;
  border: none;
  border-radius: 3px;
  outline: 0;
  cursor: pointer;
  margin-top: 0.6rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;
  :hover {
    background: #d8879e;
    animation: ${jump} 0.2s ease-out forwards;
  }
`

export const Button = styled.button`
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  border-radius: 3px;
  color: #2f436b;
  color: ${props => (props.primary ? '#5a82b0' : '#d5f4e6')};
  border: ${props =>
    props.primary ? '2px #5a82b0' : '2px #d5e1df'};
  margin: 0 1em;
  padding: 0.25em 1em;
  transition: 0.5s all ease-out;
 
  &:hover {
    color: #3e6b6a;
    background-color: ${props => props.primary ? '#5a82b0' : '#93dbba'};
  }
`

export const Form = styled.form`
  margin: 0 auto;
  width: 100%;
  max-width: 300px;
  padding: 1rem;
  display: grid;
  justify-content: center;
  align-items: center;
  border: 6px solid green;
  border-radius: 50px;
  background-color: #A6F5FB;
`

export const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
`

export const NavLink = styled(Link)`
  color: black;
  cursor: pointer;
  display: flex;
  padding: 1rem;
  align-items: center;
  opacity: 80%;
  text-decoration: none;
  font-size: 30px;
  font-weight: 800;
  transition: all .5s ease;
  &:hover{
      transform: scale(1.08);
  }
`

export const Nav = styled.nav` 
  font-size: 20px;
  position: sticky;
  height: 3rem;
  background-color: #a2b9bc;
  box-shadow: 0px 7px 10px rgba(0, 0, 0, 0.15);
  border-radius: 35px;
  width: 100%;
  opacity: 75%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const StyledLi = styled.li`
  list-style-type: circle;
  padding: 0.5rem 0.5rem;
  border-bottom: solid 2px lightgrey;
  list-style-type: none;
`

export const ListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: left;
  text-align: left;
`

export const Table = styled.table`
  display: flex;
  align-items: center;
  width: 480px;
  flex-direction: column;
  background-color: #f5f4f0;
  padding: 1rem;
  margin: 1rem;
  border-radius: 25px;
`

export const InputLabel = styled.label`
  color: #8d8d8d;
  position: absolute;
  top: 27px;
  left: 55px;
  background: #ffffff;
  transition: 300ms;
  transform: translate(-50%, -50%);
`;


export default GlobalStyle
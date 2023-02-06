import { Context } from '../index';
import { useContext, useState } from 'react';
import ThemeChanger from './ThemeSwitch';
import LanguageSwitch from './LanguageSwitch';
import Phones from './Elements/Phones';
import Address from './Elements/Address'
import SocialMediaPanel from './Elements/SocialMediaPanel';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components'
import {FiArrowDown, FiArrowUp} from 'react-icons/fi'

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 2.5em;
  padding: 0 2rem;

  .specialButtons{
    display: flex;
    justify-content: space-around;
    align-items: center;

    &.item{
        margin: 5em;
    }
    
}

  @media screen and (max-width: 1124px){
    flex-direction: column;
    height: auto;
    justify-content:center;
    align-items: center;

    & .topbar-item{
      margin-top: 1em;
      display:${({ isOpen }) => (isOpen ? "flex" : "none")};
    }

    .specialButtons{
      margin-bottom: 0.5em;
      margin-left: 1.5em;
      }
    }
}
`

const Hamburger = styled.div`
  display:none;
  color: #B7B7B7;
  
  @media (max-width: 1124px) {
    display:block;
    width:100%;
    & svg{
      float:right;
    }

  }
`


const Topbar = observer(() => {
    const [isOpen, setIsOpen] = useState(false)
    const {appTheme} = useContext(Context)
    const theme = appTheme.themeVariant

    return (
      <Container  isOpen={isOpen} style={{backgroundColor:theme.mainColor, color:theme.secondColor}}>
          <Hamburger onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiArrowUp size={28}/> : <FiArrowDown size={28}/>}
            </Hamburger>
        <span className='topbar-item'><Phones color = {theme.secondColor}/></span>
        <span className='topbar-item'><Address color = {theme.secondColor}/></span>
        <span className='topbar-item'><SocialMediaPanel color = {theme.secondColor}/></span>

        <div  className='specialButtons topbar-item'>
            <ThemeChanger className='item'/>
            <LanguageSwitch className='item'/>
        </div>
      </Container>
    );
  })
  
  export default Topbar;
  
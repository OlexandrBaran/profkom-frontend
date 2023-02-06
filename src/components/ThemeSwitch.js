import React from "react";
import { Context } from '../index';
import { useContext } from 'react';
import styled from 'styled-components'

const Slider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: .4s;
    border-radius: 1.5em;
    border: 1px solid #394E61;

        &::before{
            position: absolute;
            content: '';
            height: 1.5em;
            width: 1.5em;
            left: 4px;
            bottom: 4px;
            background-color: #394E61;
            transition: .4s;
            border-radius: 50%;
        }       
`

const Input = styled.input`
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + .slider::before{
        transform: translateX(1.5em);
    }
} 
`

const Switch = styled.label`
    position: relative;
    display: inline-block;
    width: 3.9em;
    height: 2.1em;
    margin-right: 3em;
`

const ThemeSwitch = () => {

    const {appTheme} = useContext(Context);
    
    const changeAppTheme = () => {
        (appTheme.themeVariant.name === "light") ? appTheme.setThemeVariant('dark') : appTheme.setThemeVariant('light')
    }

    return(
        <Switch onChange={changeAppTheme}>
            <Input type="checkbox"/>
            <Slider className="slider"/>
        </Switch>
    );
}

export default ThemeSwitch;
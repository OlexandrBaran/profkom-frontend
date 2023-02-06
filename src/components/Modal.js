import { useContext } from "react";
import styled from "styled-components";
import { Context } from "..";

const ModalBlock = styled.div`
    height:100vh;
    width:100vw;
    background-color:rgba(0,0,0,0.4);
    position:fixed;
    top:0;
    left:0;
    display:flex;
    align-items:center;
    justify-content:center;
    transition: visibility 0.5s, opacity 0.5s linear;
`

const ModalContent = styled.div`
    padding:20px;
    border-radius:12px;
    background-color:white;
    transform:scale(0.5);
    transition: 0.4s all;
    width:auto;
    color:#B7B7B7;

    &.active{
        transform:scale(1);
    }
`

const Modal = ({active, setActive, children}) => {

    const {appTheme} = useContext(Context)

    return(
        <ModalBlock 
            onClick={() => setActive(false)}
            style={{
                visibility:(active ? 'visible' : "hidden"), 
                opacity:(active ? '1' : "0")
            }}   
        >
            <ModalContent 
                className={(active ? 'active' : "")}
                onClick={e => e.stopPropagation()}
                style={{backgroundColor:appTheme.themeVariant.navColor}}
                >
                    {children}
            </ModalContent>
        </ModalBlock>
    )
}

export default Modal;
import { useTranslation } from "react-i18next";
import {indicators} from '../../data/IndicatorsData'
import CountUp from 'react-countup'
import { useContext } from "react";
import { Context } from "../..";
import styled from "styled-components";
import { observer } from "mobx-react-lite";



const Container = styled.div`
    color:#F4F5FB;
    width:100%;
    border:1px solid #273744; 

`

const Row = styled.div`
    display:flex;
    flex-direction:row;
    justify-content: space-around;
    align-items: center;
    margin:2em 0 3em 0;

    @media screen and (max-width: 1400px) {
        flex-wrap:wrap;
    }

    @media screen and (max-width: 580px) {
        flex-direction:column;
    }

`

const Col = styled.div`
    width:25vw;
    font-size:2rem;

    @media screen and (max-width: 1400px) {
        width:50%;
        margin:0.5em 0;
    }

    @media screen and (max-width: 875px) {
        font-size:1.5rem;
    }
`

const Title = styled.p`
    font-size:0.7em;
`


const CurrentIndicators = observer(() => {

    const {appTheme} = useContext(Context)
    const {t} = useTranslation()

    return (
        <Container style={{backgroundColor:appTheme.themeVariant.navColor}}>
            <h2 className="text-center text-uppercase pt-4">{t('curr_ident')}</h2>
            <Row>
                {indicators.map(({id, title, count, icon}) => {

                    return(
                         <Col className="text-center" key={id}>
                            {icon}<br/>
                            <CountUp start={0} end={count} duration={5} delay={0} style={{fontSize:"2em"}}/>                 
                            <Title>{t(`${title}`)}</Title>
                         </Col>
                    )
                })}

            </Row>
        </Container>
    )
})

export default CurrentIndicators
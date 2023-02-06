import { useTranslation } from "react-i18next";
import {programs} from '../../data/programsData'
import { useContext } from "react";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";



const Container = styled.div`
  
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

const Card = styled.div`
    color:#F4F5FB;
    border:1px solid #273744;
    border-radius:15px;
    width:15rem;
    height:17rem;
    display:flex;
    flex-direction:column;
    justify-content:center;
    aligh-items:center;
    margin: 1em;

    &:hover{
        transform:scale(1.1);
        transition: transform .3s ease-in-out;
    }
`
const Text = styled.p`
    font-size:1.4em;
    text-align:center;  
`




const SocialPrograms = observer(() => {

    const {appTheme} = useContext(Context)
    const {t} = useTranslation()

    const navigate = useNavigate()
    return (
        <Container style={{backgroundColor:appTheme.themeVariant.mainColor, color:appTheme.themeVariant.textColor}}  >
            <h2 className="text-center text-uppercase mt-3">{t('menu_item_programs')}</h2>
            <Row>
            {programs.map(({id, title, icon}) => {
                return(
                    <Card
                        key={id} 
                        style={{backgroundColor:appTheme.themeVariant.navColor}}
                        onClick={e => navigate('/programs')}
                    >
                        <div>
                            <p className="text-center" >{icon}</p>
                            <Text>{t(`${title}`)}</Text>
                        </div>
                    </Card>   
                )
            })}
            </Row>
        </Container>
    )
})

export default SocialPrograms;
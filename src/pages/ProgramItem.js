import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useTranslation } from "react-i18next"
import styled from "styled-components";
import { Context } from "..";


const Container = styled.div`
    max-width:100%
    margin-bottom:0;
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items:center;
    margin-top:1em;
`

const Image = styled.img`
    width:25%;
    border-radius:1rem;
    text-align:center;
    margin-bottom:2rem;
    margin-top:1em;
`

const Text = styled.div`
    padding:0 12%;;
    margin-bottom:2em;
    text-align:justify;
    p{
        margin:0;
        padding:0;
    }
`

const ProgramItem = observer(({title, image, textUA, textEN}) => {
    const currenLanguageCode = localStorage.getItem('i18nextLng') || 'ua'
    const {appTheme} = useContext(Context)
    const {t} = useTranslation();

    return (
        <Container style={{backgroundColor:appTheme.themeVariant.mainColor, color:appTheme.themeVariant.textColor}}>
            <h1 className="text-uppercase text-center p-2">{t(`${title}`)}</h1>
            <Image src={image} alt={title}/>
            <Text>
            {(currenLanguageCode === 'ua') ? textUA : textEN}
            </Text>
        </Container>
    )
})

export default ProgramItem
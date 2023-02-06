import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Context } from "..";

const Container = styled.div`
    max-width:100%
    margin-bottom:0;
`

const Image = styled.img`
    width:50%;
    border: 1px solid #273744;
    border-radius:1rem;
    margin-left:25%;
    margin-bottom:2rem;
`

const Text = styled.div`
    padding:0 12%;
    text-align:justify;
    p{
        margin:0;
        padding:0;
    }
`

const About = observer(() => {

    const {appTheme} = useContext(Context)
    const {t} = useTranslation()
    return(
        <Container style={{backgroundColor:appTheme.themeVariant.mainColor, color:appTheme.themeVariant.textColor}}>
            <h3 className="text-center text-uppercase p-3">{t("menu_item_about")}</h3>
            <Image src="https://www.uzhnu.edu.ua/uploads/root/content/profkom/_logo_z_fonom.jpg" alt="alt"/>
            <Text>
                <p>{t("about_line1")}</p>
                <p  className="pt-3">{t("about_line2")}</p>
                <ol>
                    <li>{t("about_line3")}</li>
                    <li>{t("about_line4")}</li>
                    <li>{t("about_line5")}</li>
                    <li>{t("about_line6")}</li>
                    <li>{t("about_line7")}</li>
                    <li>{t("about_line8")}</li>
                    <li>{t("about_line9")}</li>
                    <li>{t("about_line10")}</li>
                </ol>
                <p className="pb-5">{t("about_line11")}</p>
            </Text>
        </Container>
    );
})

export default About;
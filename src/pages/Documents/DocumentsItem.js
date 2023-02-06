import { useTranslation } from "react-i18next";
import styled from "styled-components";

const Container = styled.div`
    margin:1em 2em;
`

const Link = styled.a`
    display:block;
    text-decoration:none;
    color:grey;
    margin-top:5px;
    
    
    &:hover{
        color:#424242;
    }

    @media and screen(max-width:1000px){
        &:hover{
            color:grey;
        }

    }
`


const DocumentsItem = ({data}) => {

    const {t} = useTranslation();

    return(
        <Container>
            {data.map(({id, title, link}) => {
                return( 
                    <Link key={id} href={link} target='_blank'>
                        {t(`${title}`)}
                    </Link>       
                )
            })}
        </Container>
    );
}

export default DocumentsItem;
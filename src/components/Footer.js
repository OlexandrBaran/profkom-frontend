import { Context } from '../index';
import { useContext } from 'react';
import { useTranslation } from "react-i18next";
import {partners} from '../data/footerData';
import Phones from './Elements/Phones';
import Address from './Elements/Address';
import Mail from './Elements/Mail';
import BussinesHours from './Elements/BussinesHours';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

const FooterContainer = styled.div`
    color: #F4F5FB;

    @media (max-width: 574px) {
        padding:2rem 2rem;
        text-align:center;
    }
`

const Footer = observer(() => {

    const currenLanguageCode = localStorage.getItem('i18nextLng') || 'ua'
    const {appTheme} = useContext(Context)
    const {t} = useTranslation()

    const partnersPost = partners.map(item => {
        return(
            <div key={item.id}>
                <p>
                    <a href={item.link} target={'_blank'} rel="noreferrer" className="text-decoration-none link" style={{color:'#F4F5FB'}} >
                      {(currenLanguageCode === 'ua') ? item.nameUA : item.nameEN}
                    </a>
                </p>
            </div>
        )
    })
 

    
    return(
        <FooterContainer style={{backgroundColor:appTheme.themeVariant.navColor}}>
            <div className="container">
                <div className="row">
                        {/*Column about us*/}
                        <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3 mt-3">
                            <h4 className='text-center mb-3'>{t('footer_column_1_about_us')}</h4>
                            <p className='text-justify'>
                            {t('footer_bottom_column_aboutUs_text')}
                            </p>
                        </div>

                        {/*Column Partners*/}
                        <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3 mt-3">
                            <h4 className='text-center mb-3'>{t('footer_column_2_our_partners')}</h4>
                                {partnersPost}
                        </div>

                        {/*Column Contacts*/}
                        <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3 mt-3 ">
                            <h4 className='text-center mb-3' style={{color:'#F4F5FB'}}>{t('footer_column_3_contacts')}</h4>
                            <Phones color={'#F4F5FB'}/>
                            <div className='mt-4'><Address color={'#F4F5FB'}/></div>
                            <Mail color={'#F4F5FB'}/>
                        </div>

                        {/*Column bussines hours*/}
                        <BussinesHours/>
                </div>

                {/*Footer bottom*/}
                <div className='footer-bottom mt-3'>
                    <p className='text-center'>
                        {t('trade_union_name')} {new Date().getFullYear()}. {t('rights')} 
                    </p>
                </div>
            </div>
        </FooterContainer>
    );
})

export default Footer;
import React, {useContext, useEffect, useState} from 'react';
import {Form, Button} from "react-bootstrap";
import {createTeamMember, fetchTeamMember} from '../../http/teamMemberApi'
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useInput } from '../../validation/validation';
import { Context } from '../..';



const Container = styled.div`
    padding: 1rem 20rem;
    color:grey;
    & h3 {
        text-transform:uppercase;
    }

    @media(max-width:1410px){
        padding: 1rem 3rem;
    }
`
const Error = styled.div`
    color:red;
    margin-bottom:1em;
`

const CreateTeamMember = ({isUpdate, itemmmm}) => {
    
    const {t} = useTranslation()
    const {teamMember} = useContext(Context);
    
    useEffect(() => {
        fetchTeamMember().then(data => teamMember.setTeamMembers(data.rows));
        // eslint-disable-next-line
    }, [])

    const getDataArray = (initialArray, property) => {
        let dataArray = []
        initialArray.map( (el) => {
           return dataArray.push(el[property]);
        })
        return dataArray
    }

    const firstNameUA = useInput('', { isEmpty:true, isContainsNumber:true})
    const lastNameUA = useInput('', { isEmpty:true, isContainsNumber:true})
    const firstNameEN = useInput('', { isEmpty:true, isContainsNumber:true})
    const lastNameEN = useInput('', { isEmpty:true, isContainsNumber:true})
    const email = useInput('', { isEmpty:true, isEmail:true, isUnique:getDataArray(teamMember.teamMembers, "email")})
    const phoneNumber = useInput('', { isEmpty:true, isPhoneNumber:true, minLength:12, maxLength:12, isUnique:getDataArray(teamMember.teamMembers, "phoneNumber")})
    const descriptionEN = useInput('', { isEmpty:true})
    const descriptionUA = useInput('', { isEmpty:true})
    const [department, setDepartment] = useState('')
    const positionUA = useInput('', { isEmpty:true})
    const positionEN = useInput('', { isEmpty:true})
    const instagram = useInput('', { isEmpty:true})
    const facebook = useInput('', { isEmpty:true})
    const telegram = useInput('', { isEmpty:true})
    const [file, setFile] = useState(null)

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addTeamMember = async () => {
        const {url} = await fetch('/s3Url').then(res => res.json())
        await fetch(url, {
            method:"PUT",
            headers: {
                "Content-Type":"multipart/form-data"
            },
            body: file
        })
        const imageUrl = url.split('?')[0]
        const formData = new FormData()

        formData.append('firstNameUA', firstNameUA.value)
        formData.append('lastNameUA', lastNameUA.value)
        formData.append('firstNameEN', firstNameEN.value)
        formData.append('lastNameEN', lastNameEN.value)
        formData.append('email', email.value)
        formData.append('phoneNumber', phoneNumber.value)
        formData.append('descriptionEN', descriptionEN.value)
        formData.append('descriptionUA', descriptionUA.value)
        formData.append('department', department)
        formData.append('image', imageUrl)
        formData.append('positionUA', positionUA.value)
        formData.append('positionEN', positionEN.value)
        formData.append('instagram', instagram.value)
        formData.append('facebook', facebook.value)
        formData.append('telegram', telegram.value)
        
        createTeamMember(formData)
        
        firstNameUA.clearState();
        lastNameUA.clearState();
        firstNameEN.clearState();
        lastNameEN.clearState();
        email.clearState();
        phoneNumber.clearState();
        descriptionEN.clearState();
        descriptionUA.clearState();
        positionUA.clearState();
        positionEN.clearState();
        facebook.clearState();
        telegram.clearState();
        instagram.clearState();
        setFile(null);
        document.getElementById("select_image").value = null;
        setDepartment('option_department_univer')
    }

    const update = (itemmmm) => {
        firstNameUA.value = itemmmm.firstNameUA
    }

    update(itemmmm);

    return (
            <Container>
                {isUpdate ? <h3 className="text-center text-uppercase">{t(`UpdateTeamMember`)}</h3> :
                <h3 className='text-center'>{t("CreateTeamMember")}</h3>}
                <Form className='form'>
                    <Form.Group className="mb-3 text-center">
                        <Form.Label>{t('first_name_ua')}</Form.Label>
                        <Form.Control
                            onChange={e => firstNameUA.onChange(e)}
                            onBlur={e => firstNameUA.onBlur(e)}
                            value={firstNameUA.value}
                            placeholder={"Андрій"}
                        />
                        
                    </Form.Group>
                    {(firstNameUA.isDirty && firstNameUA.isEmpty) && <Error>{t(`${firstNameUA.errorMessages.isEmpty}`)}</Error>}
                    {(firstNameUA.isDirty && firstNameUA.isContainsNumber) && <Error>{t(`${firstNameUA.errorMessages.isContainsNumber}`)}</Error>}

                    <Form.Group className="mb-3 text-center">
                        <Form.Label>{t('last_name_ua')}</Form.Label>
                        <Form.Control
                            value={lastNameUA.value}
                            onChange={e => lastNameUA.onChange(e)}
                            onBlur={e => lastNameUA.onBlur(e)}
                            placeholder={"Шевченко"}
                        />
                    </Form.Group>
                    {(lastNameUA.isDirty && lastNameUA.isEmpty) && <Error>{t(`${lastNameUA.errorMessages.isEmpty}`)}</Error>}
                    {(lastNameUA.isDirty && lastNameUA.isContainsNumber) && <Error>{t(`${lastNameUA.errorMessages.isContainsNumber}`)}</Error>}

                    <Form.Group className="mb-3 text-center">
                        <Form.Label>{t('first_name_en')}</Form.Label>
                        <Form.Control
                             value={firstNameEN.value}
                             onChange={e => firstNameEN.onChange(e)}
                             onBlur={e => firstNameEN.onBlur(e)}
                            placeholder={"Andrew"}
                        />
                    </Form.Group>
                    {(firstNameEN.isDirty && firstNameEN.isEmpty) && <Error>{t(`${firstNameEN.errorMessages.isEmpty}`)}</Error>}
                    {(firstNameEN.isDirty && firstNameEN.isContainsNumber) && <Error>{t(`${firstNameEN.errorMessages.isContainsNumber}`)}</Error>}


                    <Form.Group className="mb-3 text-center">
                        <Form.Label>{t('last_name_en')}</Form.Label>
                        <Form.Control
                            value={lastNameEN.value}
                            onChange={e => lastNameEN.onChange(e)}
                            onBlur={e => lastNameEN.onBlur(e)}
                            placeholder={"Shevchenko"}
                        />
                    </Form.Group>
                    {(lastNameEN.isDirty && lastNameEN.isEmpty) && <Error>{t(`${lastNameEN.errorMessages.isEmpty}`)}</Error>}
                    {(lastNameEN.isDirty && lastNameEN.isContainsNumber) && <Error>{t(`${lastNameEN.errorMessages.isContainsNumber}`)}</Error>}

                    <Form.Group className="mb-3 text-center">
                        <Form.Label>{t('email')}</Form.Label>
                        <Form.Control
                            value={email.value}
                            onChange={e => email.onChange(e)}
                            onBlur={e => email.onBlur(e)}
                            placeholder={"example@gmail.com"}
                            type="email"
                        />
                    </Form.Group>
                    {(email.isDirty && email.isEmpty) && <Error>{t(`${email.errorMessages.isEmpty}`)}</Error>}
                    {(email.isDirty && email.isEmail) && <Error>{t(`${email.errorMessages.isEmail}`)}</Error>}
                    {(email.isDirty && email.isUnique) && <Error>{t(`${email.errorMessages.isUnique}`)}</Error>}



                    <Form.Group className="mb-3 text-center">
                        <Form.Label>{t('phoneNumber')}</Form.Label>
                        <Form.Control
                            value={phoneNumber.value}
                            onChange={e => phoneNumber.onChange(e)}
                            onBlur={e => phoneNumber.onBlur(e)}
                            placeholder={"380123456789"}
                        />
                    </Form.Group>
                    {(phoneNumber.isDirty && phoneNumber.isEmpty) && <Error>{t(`${phoneNumber.errorMessages.isEmpty}`)}</Error>}
                    {(phoneNumber.isDirty && phoneNumber.isPhoneNumber) && <Error>{t(`${phoneNumber.errorMessages.isPhoneNumber}`)}</Error>}
                    {(phoneNumber.isDirty && phoneNumber.minLength) && <Error>{t(`${phoneNumber.errorMessages.minLength}`)}</Error>}
                    {(phoneNumber.isDirty && phoneNumber.maxLength) && <Error>{t(`${phoneNumber.errorMessages.maxLength}`)}</Error>}
                    {(phoneNumber.isDirty && phoneNumber.isUnique) && <Error>{t(`${phoneNumber.errorMessages.isUnique}`)}</Error>}


                    <Form.Group className="mb-3 text-center">
                        <Form.Label>{t('descriptionEN')}</Form.Label>
                        <Form.Control
                            value={descriptionEN.value}
                            onChange={e => descriptionEN.onChange(e)}
                            onBlur={e => descriptionEN.onBlur(e)}
                            as="textarea" rows={10}
                        />
                    </Form.Group>
                    {(descriptionEN.isDirty && descriptionEN.isEmpty) && <Error>{t(`${descriptionEN.errorMessages.isEmpty}`)}</Error>}


                    <Form.Group className="mb-3 text-center">
                        <Form.Label>{t('descriptionUA')}</Form.Label>
                        <Form.Control
                            value={descriptionUA.value}
                            onChange={e => descriptionUA.onChange(e)}
                            onBlur={e => descriptionUA.onBlur(e)}
                            as="textarea" rows={10}
                        />
                    </Form.Group>
                    {(descriptionUA.isDirty && descriptionUA.isEmpty) && <Error>{t(`${descriptionUA.errorMessages.isEmpty}`)}</Error>}


                    <Form.Group className="mb-3 text-center">
                        <Form.Label className="text-center">{t("form_select_department")}</Form.Label>
                        <Form.Select 
                            value={department}
                            onChange={e => setDepartment(e.target.value)}
                        >
                            <option value='option_department_univer'>{t('option_department_univer')}</option>
                            <option value='option_department_bio'>{t('option_department_bio')}</option>
                            <option value='option_department_geo'>{t('option_department_geo')}</option>
                            <option value='option_department_econ'>{t('option_department_econ')}</option>
                            <option value='option_department_engeneer'>{t('option_department_engeneer')}</option>
                            <option value='option_department_med'>{t('option_department_med')}</option>
                            <option value='option_department_med2'>{t('option_department_med2')}</option>
                            <option value='option_department_dentist'>{t('option_department_dentist')}</option>
                            <option value='option_department_sport'>{t('option_department_sport')}</option>
                            <option value='option_department_foregin'>{t('option_department_foregin')}</option>
                            <option value='option_department_it'>{t('option_department_it')}</option>
                            <option value='option_department_history'>{t('option_department_history')}</option>
                            <option value='option_department_math'>{t('option_department_math')}</option>
                            <option value='option_department_IER'>{t('option_department_IER')}</option>
                            <option value='option_department_social'>{t('option_department_social')}</option>
                            <option value='option_department_tourism'>{t('option_department_tourism')}</option>
                            <option value='option_department_phys'>{t('option_department_phys')}</option>
                            <option value='option_department_filology'>{t('option_department_filology')}</option>
                            <option value='option_department_chem'>{t('option_department_chem')}</option>
                            <option value='option_department_law'>{t('option_department_law')}</option>
                        </Form.Select>
                    </Form.Group>
                    
                    <Form.Group className='text-center mb-2'>
                        <Form.Label>{t("select_image")}</Form.Label>
                        <Form.Control
                            className='mt-2'
                            type='file'
                            onChange={selectFile}
                            id='select_image'
                        />
                    </Form.Group>

                    <Form.Group className="mb-3 text-center">
                        <Form.Label>{t('position_ua')}</Form.Label>
                        <Form.Control
                          value={positionUA.value}
                          onChange={e => positionUA.onChange(e)}
                          onBlur={e => positionUA.onBlur(e)}
                           inputplaceholder={"Голова профбюро біологічного факультету"}
                        />
                    </Form.Group>
                    {(positionUA.isDirty && positionUA.isEmpty) && <Error>{t(`${positionUA.errorMessages.isEmpty}`)}</Error>}


                    <Form.Group className="mb-3 text-center">
                        <Form.Label>{t('position_en')}</Form.Label>
                        <Form.Control
                           value={positionEN.value}
                           onChange={e => positionEN.onChange(e)}
                           onBlur={e => positionEN.onBlur(e)}
                           inputplaceholder={"Head of student goverment of Faculty of Biology"}
                        />
                    </Form.Group>
                    {(positionEN.isDirty && positionEN.isEmpty) && <Error>{t(`${positionEN.errorMessages.isEmpty}`)}</Error>}


                    <Form.Group className="mb-3 text-center">
                        <Form.Label>Instagram</Form.Label>
                        <Form.Control
                           value={instagram.value}
                           onChange={e => instagram.onChange(e)}
                           onBlur={e => instagram.onBlur(e)}
                           placeholder={"www.instagram.com/ukrposhta/"}
                        />
                    </Form.Group>
                    {(instagram.isDirty && instagram.isEmpty) && <Error>{t(`${instagram.errorMessages.isEmpty}`)}</Error>}


                    <Form.Group className="mb-3 text-center">
                        <Form.Label>Facebook</Form.Label>
                        <Form.Control
                            value={facebook.value}
                            onChange={e => facebook.onChange(e)}
                            onBlur={e => facebook.onBlur(e)}
                            placeholder={"www.facebook.com/ukrposhta/"}
                        />
                    </Form.Group>
                    {(facebook.isDirty && facebook.isEmpty) && <Error>{t(`${facebook.errorMessages.isEmpty}`)}</Error>}


                    <Form.Group className="mb-3 text-center">
                        <Form.Label>Telegram</Form.Label>
                        <Form.Control
                            value={telegram.value}
                            onChange={e => telegram.onChange(e)}
                            onBlur={e => telegram.onBlur(e)}
                            placeholder={"web.telegram.org/k/#@Kolobok0690"}
                        />
                    </Form.Group>
                    {(telegram.isDirty && telegram.isEmpty) && <Error>{t(`${telegram.errorMessages.isEmpty}`)}</Error>}
                </Form>


                <Button 
                    disabled={
                        !firstNameUA.inputValid || !firstNameEN.inputValid || !lastNameEN.inputValid || !lastNameUA.inputValid
                        || !email.inputValid || !phoneNumber.inputValid || !descriptionEN.inputValid || !descriptionUA.inputValid
                        || !positionEN.inputValid || !positionUA.inputValid || !telegram.inputValid || !facebook.inputValid || !instagram.inputValid
                        }
                    variant="outline-secondary" 
                    className='float-end mt-2 mb-4 mr-2' 
                    onClick={addTeamMember}
                >
                    {t('create')}
                </Button>
            </Container>
    );
};

export default CreateTeamMember;
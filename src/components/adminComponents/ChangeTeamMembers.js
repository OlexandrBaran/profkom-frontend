import { useContext, useEffect, useState } from "react"
import { Context } from "../.."
import {BiPencil, BiTrash} from 'react-icons/bi'
import styled from "styled-components"
import { useTranslation } from "react-i18next"
import CreateTeamMember from "./CreateTeamMember"
import { observer } from "mobx-react-lite"
import { fetchTeamMember, deleteTeamMember, updateTeamMember } from "../../http/teamMemberApi"
import Modal from '../Modal'
import UpdateTeamMember from "./UpdateTeamMember"

const LinearCard = styled.div`
display:flex;
justify-content:flex-start;
color: #B7B7B7;
padding:1.25rem 0.75rem;
margin:0 2rem;
border:1px solid #B7B7B7;

& .department{
    width:15%;
}
&:hover{
    color:white;
}

@media(max-width: 1410px){
    flex-direction:column;

    & .thead{
        display:none;
    }

    & .department{
        width:35%;
    }

    & .createBtn{
        text-align: center;
    }
}
`

const LinearCardItem = styled.span`
padding:0 0.5rem;

@media(max-width: 1410px){
    padding-top:7px;
    width:100%;
}

`
const LinearCardButton = styled.button`
    border:none;
    background-color:inherit;
    color:#B7B7B7;
    padding:0rem 0.5rem;
    margin:0rem 0.75rem;
    text-transform:uppercase;

    &:hover{
        color:white;
    }

    @media(max-width: 1450px){
        padding:0rem 0.25rem;
        margin:0rem 0.5rem;
        margin-top:10px;
    }
`
const ButtonsContainer = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-around;
`
const ModalButton = styled.button`
    background-color:inherit;
    padding: 0.5em 1.5em;
    border: 1px solid #B7B7B7;
    border-radius:10px;
    color:#B7B7B7;

    &:hover{
        background-color:#B7B7B7;
        color:white;
    }
`


const ChangeTeamMembers = observer(() => {

    const [isCreateBtnClicked, setIsCreateBtnClicked] = useState(false)
    const [isUpdateBtnClicked, setIsUpdateBtnClicked] = useState(false)
    const [modalActive, setModalActive] = useState(false)
    const [deletedItemData, setDeletedItemData] = useState({firstName:"", lastName:""})
    const [selectedItemToDelete, setSelectedItemToDelete] = useState(null)
    const [updatedItemID, setUpdatedItemID] = useState('')

    const {t} = useTranslation()
    const {teamMember} = useContext(Context)
    const {appTheme} = useContext(Context)
    const currenLanguageCode = localStorage.getItem('i18nextLng') || 'ua'

    useEffect(() => {
        fetchTeamMember().then(data => teamMember.setTeamMembers(data.rows));
        // eslint-disable-next-line
    }, [])
    
    const openDeleteModal = (item) => {
        (currenLanguageCode === 'ua' ?
            setDeletedItemData({firstName:item.firstNameUA, lastName:item.lastNameUA})
            :
            setDeletedItemData({firstName:item.firstNameEN, lastName:item.lastNameEN})
        
        )
        setModalActive(true) 
        setSelectedItemToDelete(item)   
    }
    const deleteItem = (item) => {  
        deleteTeamMember(item.id)
        .then(console.log(`themeMember with id ${item.id} succsesfyly deleted`))
        .catch(console.log(`problem`));
        setModalActive(false);
        setSelectedItemToDelete(null);
        window.location.reload();
    }

    const editTeamMember = (item) => {
        setUpdatedItemID(item)
       /* updateTeamMember(id, item)
        .then(console.log(`themeMember with id ${item.id} succsesfyly updated`))
        .catch(console.log(`problem`));*/
    }

    

    if (!isCreateBtnClicked && !isUpdateBtnClicked) {
        return (
            <div className="LinearCard-container">
                <LinearCard style={{backgroundColor:appTheme.themeVariant.sideBarColor}}>
                    <LinearCardItem className="thead" style={{width:"3%"}}>№</LinearCardItem>
                    <LinearCardItem className="thead" style={{width:"10%"}}>{t('firstName')}</LinearCardItem>
                    <LinearCardItem className="thead" style={{width:"15%"}}>{t('lastName')}</LinearCardItem>
                    <LinearCardItem className="thead" style={{width:"30%"}}>{t('email')}</LinearCardItem>
                    <LinearCardItem className="thead" style={{width:"15%"}}>{t('phoneNumber')}</LinearCardItem>
                    <LinearCardItem className="thead" style={{width:"15%"}}>{t('department')}</LinearCardItem>
                    <div className="createBtn">
                        <LinearCardButton 
                            style={{border:`2px solid grey`}}
                            onClick={() => setIsCreateBtnClicked(true)}
                        >
                            {t('create')}
                        </LinearCardButton>  
                    </div>
                </LinearCard>
                {
                    teamMember.teamMembers.map( (item, index) => {

                        return(
                            <LinearCard key={item.id} style={{backgroundColor:appTheme.themeVariant.sidebar, color:appTheme.themeVariant.textColor}}>
                            <LinearCardItem style={{width:"3%"}}>{index+1}</LinearCardItem>
                            <LinearCardItem style={{width:"10%"}}>{currenLanguageCode === 'ua' ? item.firstNameUA : item.firstNameEN}</LinearCardItem>
                            <LinearCardItem style={{width:"15%"}}>{currenLanguageCode === 'ua' ? item.lastNameUA : item.lastNameEN}</LinearCardItem>
                            <LinearCardItem style={{width:"30%"}}>{item.email}</LinearCardItem>
                            <LinearCardItem style={{width:"15%"}}>{item.phoneNumber}</LinearCardItem>
                            <LinearCardItem className="department">{item.department}</LinearCardItem>
                            <div>
                                    <LinearCardButton
                                        onClick={() => 
                                            {
                                                setIsUpdateBtnClicked(true)
                                                editTeamMember(item)
                                            }}
                                    >
                                        <BiPencil size={24}/>
                                    </LinearCardButton>
                                    <LinearCardButton onClick={e => openDeleteModal(item)}><BiTrash size={24}/></LinearCardButton>
                            </div>
                            </LinearCard>

                        )
                    })
                }
                <Modal 
                    active={modalActive} 
                    setActive={setModalActive} 
                >
                    <div>
                        <p>{`${t(`question_delete`)} ${deletedItemData.firstName + ' ' + deletedItemData.lastName}?`}</p>
                        <ButtonsContainer>
                            <ModalButton onClick={e => deleteItem(selectedItemToDelete)}>{t(`yes`)}</ModalButton>
                            <ModalButton
                                onClick={
                                    e => {
                                        setModalActive(false);
                                        setSelectedItemToDelete(null)
                                }}
                            >
                                {t(`no`)}
                            </ModalButton>
                        </ButtonsContainer>
                    </div>
                </Modal>
                
            </div>
        )
    }if (isCreateBtnClicked) {
        return (
            <CreateTeamMember isUpdate={false}/>
        )
    } else {
        return (
            <CreateTeamMember isUpdate={true} itemmmm={updatedItemID}/>
        )
    }
    
})

export default ChangeTeamMembers
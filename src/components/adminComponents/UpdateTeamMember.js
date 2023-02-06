import { useTranslation } from "react-i18next"

const UpdateTeamMember = () => {

    const {t} = useTranslation();

    
    return(
        
            <h3 className="text-center text-uppercase">{t(`UpdateTeamMember`)}</h3>

    )
}

export default UpdateTeamMember
import SidebarContent from "../components/SidebarContent/SidebarContent";
import {programs} from '../data/programsData'

const Programs = () => {
    return(
        <SidebarContent data={programs}/>
    );
}

export default Programs;
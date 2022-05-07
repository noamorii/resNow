import styles from './ProfilePage.module.scss'
import telephoneService from "../../../services/telephoneService";

export const ProfilePageClient = () =>{

    console.log(telephoneService.generator())

    return(
        <div>
            ProfilePage
        </div>
    )
}
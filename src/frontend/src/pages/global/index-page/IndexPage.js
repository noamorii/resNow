import {NabvarIndex} from "../../../parts";
import {HomeSection} from "./home-section/HomeSection";
import {AboutSection} from "./about-section/AboutSection";
import {PricingSection} from "./pricing-section/PricingSection";
import {ContactSection} from "./contact-section/ContactSection";

import styles from './index.module.scss'

export const IndexPage = () => {

    return (
        <div>
            <NabvarIndex/>
            <div className={styles.mainContainer}>
                <HomeSection/>
                <AboutSection/>
                <PricingSection/>
                <ContactSection/>
            </div>
        </div>
    )
}

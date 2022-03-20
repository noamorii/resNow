import { Button } from '../components/index'

const AboutUs = () => {

    document.querySelector('body').classList.add('black-ground')

    return (
        <div className={'presentation-container'}>
            <iframe
                src="https://docs.google.com/presentation/d/e/2PACX-1vRrcRGj9YI9psmWZ4alkZ47gHoq6-nRE47RHO7LpgxLUcfADH-kmPtdyxI0diCmvR0S-9jDH_jK1xCP/embed?start=false&loop=true&delayms=15000"
                width="1280" height="749" allowFullScreen="true" mozallowfullscreen="true"
                webkitallowfullscreen="true"/>
        </div>
    )
}

export default AboutUs
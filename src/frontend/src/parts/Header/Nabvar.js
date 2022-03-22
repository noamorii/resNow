import {Link} from "react-router-dom";
import logo from "../../assets/resnow1.png"

const Nabvar = () => {
    return (<div id={'top-nav'}>
        <img src={logo} alt={'logo'}/>
        <span>
                <Link to={'/beta'}>Home</Link>
                <Link to={'/About'}>About</Link>
                <Link to={'/Pricing'}>Pricing</Link>
                <Link to={'/Contact'}>Contact</Link>
                <span>
                    <Link to={'/Login'}>Login</Link>
                    <Link to={'/Register'}>Register</Link>
                </span>
            </span>
    </div>);
}

export default Nabvar;
import logo from "../rynary.png";

const Welcome = () => {
    return (
        <div className={'container'}>
            <img src={logo}/>
            <h2>Vítejte, brzy pro Vás vypustíme naší aplikaci</h2>
            <p>Více <a href='/about'>zde</a></p>
        </div>
    );
}

export default Welcome
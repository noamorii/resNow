import {useEffect} from "react";

const IndexPage = () => {

    useEffect(()=>{
        document.querySelector('body').className = '';
    })

    return (
        <div>
            Ahoj
        </div>
    )
}

export default IndexPage
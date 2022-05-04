const generator = () => {
    let tel = "";
    for (let i = 0; i < 9; i++) {
        if (i % 3 === 0 && i !== 0) tel += " "
        tel += (String(((Math.floor(Math.random() * 10)) % 8) + 1))
    }
    return tel;
}

const TelephoneService = {
    generator
}

export default TelephoneService
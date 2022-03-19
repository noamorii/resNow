const AboutUs = () => {

    document.querySelector('body').classList.add('black-ground')

    return (
        <div className={'presentation-container'}>
            <iframe
                src="https://docs.google.com/presentation/d/e/2PACX-1vQNQwzJ2L7JvDdvJ9spLJYgDuNbVHjyKQq8EcLgZazTt04vpb3FLF4B-RK4xRuTy76inHXppLzxCcE2/embed?start=true&loop=false&delayms=30000"
                frameBorder="0" width="1280" height="749" allowFullScreen="true" mozallowfullscreen="true"
                webkitallowfullscreen="true"/>
        </div>
    )
}

export default AboutUs
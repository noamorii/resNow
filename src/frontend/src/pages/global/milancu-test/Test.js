import myStyles from './Test.module.scss'

export const Test = () => {
    return (
        <div className={myStyles.contentContainer}>
            <h1 className={myStyles.topic}>Ahoj</h1>
            <button
                className="button-primary"
                onClick={() => {
                    alert("Test")
                }}
            >
                <a href="/beta">
                    Foo
                </a>
            </button>
        </div>
    )
}


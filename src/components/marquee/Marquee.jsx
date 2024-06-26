function Marquee({ text, extended = false }) {
    // Create array for each word
    const textArray = text.split(" ");

    return (
        <div className="marquee">
            {/* Double print each text array */}
            <ul className="marquee__content">
                {textArray.map((element, index) => {
                    return (
                        <li key={index}>{element}</li>
                    )
                })}
            </ul>

            <ul className="marquee__content">
                {textArray.map((element, index) => {
                    return (
                        <li key={index + textArray.length}>{element}</li>
                    )
                })}
            </ul>

            {extended
                ? <ul className="marquee__content">
                    {textArray.map((element, index) => {
                        return (
                            <li key={index + textArray.length * 2}>{element}</li>
                        )
                    })}
                </ul>
                : <></>}

        </div>
    )
}

export default Marquee
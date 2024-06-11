function Marquee({ text }) {
    // Create array for each word
    const textArray = text.split(" ");

    return (
        <div className="marquee">
            {/* Double print each text array */}
            <ul className="marquee__content">
                {textArray.map((element, index) => {
                    return (
                        <li index={index}>{element}</li>
                    )
                })}
            </ul>

            <ul className="marquee__content">
                {textArray.map((element, index) => {
                    return (
                        <li index={index * 9999}>{element}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Marquee
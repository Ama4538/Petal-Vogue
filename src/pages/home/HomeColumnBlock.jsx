function HomeColumnBlock({ section, data, clickEvent }) {
    return (
        <article
            className="home-column__block"
            style={{ backgroundImage: `url("./homeimage/${section}/${data.file}")` }}
            onClick={() => clickEvent(data.title.substring(0, data.title.indexOf(" ")))}
        >
            <div className="home-column__text-container">
                {/* Add if data exist */}
                {(data.title !== null && data.subtitle !== null) && <h1 className="home-column__text home-column__text-title">{data.title} <br /> {data.subtitle}</h1>}
                {((data.title !== null && data.subtitle === null)) && <h1 className="home-column__text home-column__text-title">{data.title}</h1>}
                {(data.statement !== null) && <h2 className="home-column__text home-column__text-statement">{data.statement}</h2>}
            </div>
        </article>
    )
}

export default HomeColumnBlock


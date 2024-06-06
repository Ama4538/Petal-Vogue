function HomeColumnBlock({ section, id }) {
    return (
        <article className="home-column__block" style={{ backgroundImage: `url("./homeimage/${section}/${id}.jpg")`}}></article>
    )
}

export default HomeColumnBlock
function HomeColumnBlock({ section, id }) {
    return (
        <article className="home-column__block" style={{ backgroundImage: `url("./homeimage/${section}/${id}")`}}></article>
    )
}

export default HomeColumnBlock


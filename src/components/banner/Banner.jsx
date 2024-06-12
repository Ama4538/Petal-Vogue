function Banner({ title, subtitle, section }) {
    return (
        <div className="banner" style={{ backgroundImage: `url("./bannerImage/${section}-banner.jpg")` }} >
            <div className="banner__text-container">
                <h2 className='banner__text-title'>{title}</h2>
                <h3 className='banner__text-subtitle'>{subtitle}</h3>
            </div>
        </div>
    )
}

export default Banner
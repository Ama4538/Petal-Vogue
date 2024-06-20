function EditMessageDisplay({ text, dataVisible }) {
    return (
        <div
            className="editmessagedisplay__container"
            data-visible={dataVisible}
        >
            <p>{text}</p>
        </div>
    )
}

export default EditMessageDisplay
function Actor(props) {
    return (
        <>
            <img 
                src={`https://image.tmdb.org/t/p/w500/${props.img}`}
                alt={props.name}
            />
            <span>{props.name}</span>
        </>
    )
}

export default Actor
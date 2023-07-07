const Title = ({title, className, description}) => {

    return (
        <div className={`Title_title ${className}`}>
			<h1>{title}</h1>
			<p>{description}</p>
		</div>
    )
}

export default Title

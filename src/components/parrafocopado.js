export default function ParrafoCopado(props) {
	let children= props.children;
	console.log("ParrafoCopado props",props)
	let style={fontSize: props.size=='big' ? '24pt' : 'inherit'}
	if (props.color) { style.color= props.color=="red" ? "#FF2020" : props.color }
	return (<>
		<p style={style}><span>Este parrafo es copado: </span>{children}</p>
	</>)
}



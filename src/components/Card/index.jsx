import "./styles.css"


export function Card(props) {
    return (
        <div className= {`card ${props.bg}`} >
            <img src={props.img} alt={props.name} />
            <span>#{props.id} {props.name}</span>
        </div>
    )
}
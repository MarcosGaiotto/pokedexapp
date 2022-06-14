import "./styles.css"


export function Card(props) {
    return (
        <div className="card">
            <img src={props.img} alt={props.name} />
            <span>{props.name}</span>
        </div>
    )
}
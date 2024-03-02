export default function(props){
    return(
        <li className={"list-item task "+props.taskType} key={props.id} id={props.id} draggable onDragStart={props.onDragStart} >
            <span>
                <span>{props.name}</span>
                <br></br>
            </span>
        </li>
    )
}
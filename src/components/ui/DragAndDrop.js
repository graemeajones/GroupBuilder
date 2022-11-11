export function Draggable(props) {
  // Methods -------------------------------------
  const handleDrag = (event) => {
console.log("[Draggable::handleDrag] id: " + event.target.id);
    event.dataTransfer.setData("text", event.target.id);
  };

  // View ----------------------------------------
  return (
    <div
      key={props.id}
      id={props.id}
      draggable="true"
      onDragStart={handleDrag}
      className={(('className' in props) && props.className)}
    >
      {props.children}
    </div>
  );
}

export function Droppable(props) {
  // Methods -------------------------------------
  const handleDrop = (event) => {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    const id = document.getElementById(data);
console.log("[Droppable::handleDrop] id: " + id + "(Event id: "+event.target.id);
    event.target.appendChild(id);
  };

  const allowDrop = (event) => {
    event.preventDefault();
  };
  
  // View ----------------------------------------
  return (
    <div
      id={props.id}
      onDrop={handleDrop}
      onDragOver={allowDrop}
      className={(('className' in props) && props.className)}
    >
      {props.children}
    </div>
  );
}
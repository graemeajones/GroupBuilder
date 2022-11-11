import './Card.scss';

function Card(props) {
  return (
    <div className={"card "+(('className' in props) && props.className)}>
      {props.children}
    </div>
  );
}

export default Card;
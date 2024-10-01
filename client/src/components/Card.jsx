//TODO: add patch functionality

function Card(props) {
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <div className="note-container">
        <p>{props.content}</p>
      </div>
      <button onClick={() => props.deleteFunc(props.id)}> delete</button>
    </div>
  );
}

export default Card;

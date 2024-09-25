function Card(props) {
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <div className="note-container">
        <p>{props.content}</p>
      </div>
      <button onClick={() => props.deleteFunc(props.index)}> delete</button>
    </div>
  );
}

export default Card;

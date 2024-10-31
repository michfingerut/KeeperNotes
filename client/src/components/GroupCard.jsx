import { CardStyle, CenteredHeader } from '../styles/styles';

function GroupCard(props) {
  ///////////////////// props /////////////////////
  const name = props.name;
  const onClick = props.onClick;
  ////////////////////////////////////////////////

  return (
    <CardStyle onClick={onClick}>
      {/* when title too long looks cut, TODO: add tooltip also TODO: scrolling prettier */}
      <CenteredHeader>
        <span style={{ overflowX: 'hidden' }}>{name}</span>
      </CenteredHeader>
    </CardStyle>
  );
}

export default GroupCard;

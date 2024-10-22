import { CardStyle, CenteredHeader } from '../styles/styles';

function GroupCard(props) {
  return (
    <CardStyle onClick={props.onClick}>
      {/* when title too long looks cut, TODO: add tooltip also TODO: scrolling prettier */}
      <CenteredHeader>
        <span style={{ overflowX: 'hidden' }}>{props.name}</span>
      </CenteredHeader>
    </CardStyle>
  );
}

export default GroupCard;

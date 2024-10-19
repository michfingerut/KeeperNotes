import { NoteStyle, NoteH1 } from '../styles/styles';
import styled from 'styled-components';

// Create a styled component for the header text
const CenteredHeader = styled.h3`
  text-align: center;
  margin: 0;
  width: 100%;
  font-size: 0.9em;
  line-height: 200px;
`;

const CardStyle = styled(NoteStyle)`
  background-color: #f5ba13;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: white;
  }
`;

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

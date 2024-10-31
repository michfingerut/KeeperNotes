// Internal modules
import { CardStyle, CenteredHeader } from '../styles/styles';
import KeeperMenu from './Menu';

function GroupCard(props) {
  ///////////////////// props /////////////////////
  const name = props.name;
  const onClick = props.onClick;
  ////////////////////////////////////////////////

  function handleEnter() {
    //TODO: transition not smooth
    onClick();
  }

  function handleEdit() {
    console.log('Edit');
  }

  function handleRemove() {
    console.log('Remove');
  }

  return (
    <CardStyle>
      {/* TODO: should be on the right corner (right now on the left) */}
      <KeeperMenu
        style={{
          position: 'absolute',
        }}
        menuItems={[
          { key: 1, itemName: 'Enter group', handleClick: handleEnter },
          { key: 2, itemName: 'Edit group', handleClick: handleEdit },
          { key: 3, itemName: 'Remove group', handleClick: handleRemove },
        ]}
      />

      {/* when title too long looks cut, TODO: add tooltip also TODO: scrolling prettier */}
      <CenteredHeader>
        <span style={{ overflowX: 'hidden' }}>{name}</span>
      </CenteredHeader>
    </CardStyle>
  );
}

export default GroupCard;

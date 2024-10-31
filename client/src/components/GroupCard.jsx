// Internal modules
import { CardStyle, CenteredHeader } from '../styles/styles';
import KeeperMenu from './Menu';
import backApi from '../services/backApi';

function GroupCard(props) {
  ///////////////////// props /////////////////////
  const name = props.name;
  const onClick = props.onClick;
  const groupId = props.groupId;
  const setGroups = props.setGroups;
  ////////////////////////////////////////////////

  function handleEnter() {
    //TODO: transition not smooth
    onClick();
  }

  function handleEdit() {
    //TODO ?
    // maybe this will be thwe option to add and remove members
  }

  async function handleRemove() {
    await backApi.deleteGroup(groupId);
    setGroups((prevGroups) => {
      const tmp = prevGroups.filter((group) => {
        return group.groupId !== groupId;
      });

      return [...tmp];
    });
  }

  return (
    <CardStyle>
      {/* TODO: should be on the right corner (right now on the left) */}
      <KeeperMenu
        style={{}}
        menuItems={[
          { key: 1, itemName: 'Enter group', handleClick: handleEnter },
          // { key: 2, itemName: 'Edit group', handleClick: handleEdit },
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

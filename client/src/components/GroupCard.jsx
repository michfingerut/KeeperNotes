// Internal modules
import { CardStyle, CenteredHeader } from '../styles/styles';
import KeeperMenu from './Menu';
import backApi from '../services/backApi';
import Tooltip from '@mui/material/Tooltip';

function GroupCard(props) {
  ///////////////////// props /////////////////////
  const { name, onClick, groupId, setGroups } = props;
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
      <KeeperMenu
        menuItems={[
          // { key: 2, itemName: 'Edit group', handleClick: handleEdit },
          { key: 3, itemName: 'Remove group', handleClick: handleRemove },
        ]}
      />

      <CenteredHeader onClick={handleEnter}>
        <Tooltip title={name}>
          <span style={{ overflowX: 'hidden' }}>{name}</span>
        </Tooltip>
      </CenteredHeader>
    </CardStyle>
  );
}

export default GroupCard;

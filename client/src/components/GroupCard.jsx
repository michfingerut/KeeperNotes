//External modules
import Tooltip from "@mui/material/Tooltip";

// Internal modules
import { CardStyle, CenteredHeader } from "../styles/styles";
import KeeperMenu from "./Menu";
import backApi from "../services/backApi";
import { showError } from "../utils/index";

function GroupCard(props) {
  ///////////////////// props /////////////////////
  const { name, onClick, groupId, setGroups } = props;
  ////////////////////////////////////////////////

  function handleEnter() {
    onClick();
  }

  function handleEdit() {
    console.log("handle edit");
    //TODO
    // the dialog will open
    // we will see all users that are not members
    // and all members
    // and i could control who to add and who to delete
  }

  async function handleRemove() {
    try {
      await backApi.deleteGroup(groupId);
      setGroups((prevGroups) => {
        const tmp = prevGroups.filter((group) => {
          return group.groupId !== groupId;
        });

        return [...tmp];
      });
    } catch (err) {
      showError("Something went wrong, please try again later");
    }
  }

  return (
    <CardStyle>
      <KeeperMenu
        menuItems={[
          { key: 2, itemName: "Edit group", handleClick: handleEdit },
          { key: 3, itemName: "Remove group", handleClick: handleRemove },
        ]}
      />

      <CenteredHeader onClick={handleEnter}>
        <Tooltip title={name}>
          <span style={{ overflowX: "hidden" }}>{name}</span>
        </Tooltip>
      </CenteredHeader>
    </CardStyle>
  );
}

export default GroupCard;

import React, { useState } from 'react';
import { CiMenuKebab } from 'react-icons/ci';
import { MenuItem, Menu } from '@mui/material';

/**
 * props
 * @param {Object[]} menuItems - array of menu items
 * @param {string} menuItem.itemName - the name of the manu item
 * @param {number} menuItem.key - key of item
 * @param {Function} menuItem.handleClick - the function that needs to be triggered
 */

//TODO: styling
function KeeperMenu(props) {
  const menuItems = props.menuItems;

  const [anchorEl, setAnchorEl] = useState(null);
  let open = Boolean(anchorEl);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleClickedItem(onClickFunc) {
    onClickFunc();
    handleClose();
  }

  return (
    <div>
      <CiMenuKebab onClick={handleClick} style={{ cursor: 'pointer' }} />
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {menuItems.map((item) => {
          return (
            <MenuItem
              key={item.key}
              onClick={() => handleClickedItem(item.handleClick)}
            >
              {item.itemName}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}

export default KeeperMenu;

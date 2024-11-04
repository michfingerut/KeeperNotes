import React, { useState } from 'react';
import { CiMenuKebab } from 'react-icons/ci';
import { MenuItem, Menu } from '@mui/material';
import { MenuStyle } from '../styles/styles';

/**
 * props
 * @param {Object[]} menuItems - array of menu items
 * @param {string} menuItem.itemName - the name of the manu item
 * @param {number} menuItem.key - key of item
 * @param {Function} menuItem.handleClick - the function that needs to be triggered
 */

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
    <MenuStyle>
      <CiMenuKebab onClick={handleClick} />
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {menuItems.map((item) => {
          return (
            <MenuItem
              key={item.key}
              onClick={() => handleClickedItem(item.handleClick)}
              style={{ fontSize: '0.875rem', fontWeight: 'bold' }}
            >
              {item.itemName}
            </MenuItem>
          );
        })}
      </Menu>
    </MenuStyle>
  );
}

export default KeeperMenu;

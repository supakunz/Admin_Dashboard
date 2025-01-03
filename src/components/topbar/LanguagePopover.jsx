import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import IconifyIcon from "../base/IconifyIcon";
import { ListItemIcon, Menu, Typography } from "@mui/material";

const languageItems = [
  {
    id: 0,
    value: "en",
    label: "English",
    icon: "twemoji:flag-england",
  },
  {
    id: 1,
    value: "th",
    label: "Thailand",
    icon: "twemoji:flag-thailand",
  },
];

const LanguagePopover = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0); // language on start
  const open = Boolean(anchorEl);

  const handleClickItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (id) => {
    setSelectedIndex(id);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        onClick={handleClickItem}
        color="inherit"
        aria-label="language"
        aria-controls={open ? "language-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <IconifyIcon icon={languageItems[selectedIndex].icon} />
      </IconButton>

      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {languageItems.map((languageItem) => (
          <MenuItem
            key={languageItem.id}
            selected={languageItem.id === selectedIndex}
            onClick={() => handleMenuItemClick(languageItem.id)}
          >
            <ListItemIcon>
              <IconifyIcon icon={languageItem.icon} />
            </ListItemIcon>
            <Typography variant="body2">{languageItem.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguagePopover;

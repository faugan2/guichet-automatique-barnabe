import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import { auth } from '../connexion_base';
import {useNavigate} from "react-router-dom";
export default function SimpleMenu() {
    const navigate=useNavigate ();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout=async ()=>{
      await auth.signOut();
      navigate("/");
  }

  const go_to_profil=()=>{
    navigate("/profil");
  }
  return (
    <div>
    <IconButton aria-label="display more actions" edge="end" color="inherit" onClick2={handleClick}>
        <MoreIcon />
    </IconButton>
      
      
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}

      >
        <MenuItem onClick={go_to_profil}>Profile</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

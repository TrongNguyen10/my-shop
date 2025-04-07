import { Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

const UserMenu = (props: any) => {
  return (
    <>
      <Menu
        id="basic-menu"
        anchorEl={props.open}
        open={!!props.open}
        onClose={props.onClose}
      >
        <Link
          style={{ all: "unset" }}
          to="/login"
          onClick={props.onClose}
          target="_blank"
        >
          <MenuItem>Quản lí hệ thống</MenuItem>
        </Link>
      </Menu>
    </>
  );
};

export default UserMenu;

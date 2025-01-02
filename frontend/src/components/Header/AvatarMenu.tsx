import { useLogoutMutation } from "@api/apis";
import { useGetUserByIdQuery } from "@apis/userAPI";
import { Avatar, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { AppRoutes } from "@routing/appRoutes";
import CustomModal from "@shared/CustomModal";
import { useAppStore } from "@stores/zustandStore";
import { useState } from "react";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import theme from "../../../theme";
import User from "../ModalContent/User/User";

const AvatarMenu = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const userId = useAppStore((state) => state.userId);
  const { data: userData } = useGetUserByIdQuery({
    userId: userId ?? "",
  });

  const [logout] = useLogoutMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    await logout().unwrap();
    navigate(AppRoutes.HOME);
    handleCloseUserMenu();
  };

  const handleUserInfo = () => {
    setIsModalOpen(true);
    handleCloseUserMenu();
  };

  const settings = [
    { label: t("profile"), action: handleUserInfo },
    { label: t("logout"), action: handleLogout },
  ];
  return (
    <>
      <Box sx={{ flexGrow: 0, ml: "auto" }}>
        <Tooltip title='Open settings'>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar
              sx={{
                bgcolor: theme.palette.secondary.light,
              }}
              alt={`${userData?.lastName?.charAt(0)} ${userData?.firstName?.charAt(0)}`}
              src={userData?.image}
            >
              {userData?.image
                ? null
                : `${userData?.lastName?.charAt(0)} ${userData?.firstName?.charAt(0)}`}
            </Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "50px" }}
          id='menu-appbar'
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem key={setting.label} onClick={setting.action}>
              <Typography sx={{ textAlign: "center" }}>
                {setting.label}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      {userData ? (
        <CustomModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={t("profile")}
        >
          <User userData={userData} />
        </CustomModal>
      ) : null}
    </>
  );
};

export default AvatarMenu;

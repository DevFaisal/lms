import React, { useState } from "react";
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  Badge,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PaymentIcon from "@mui/icons-material/Payment";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Link, useLocation } from "react-router-dom";
import useUserStore from "../../store/userStore";

interface MainLayoutProps {
  children: React.ReactNode;
}

const drawerWidth = 260;
const collapsedDrawerWidth = 72;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" && prop !== "collapsed" })<{
  open?: boolean;
  collapsed?: boolean;
}>(({ theme, open, collapsed }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  width: "100%",
  ...(open && {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: collapsed ? `${collapsedDrawerWidth}px` : `${drawerWidth}px`,
    width: collapsed ? `calc(100% - ${collapsedDrawerWidth}px)` : `calc(100% - ${drawerWidth}px)`,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBarStyled = styled(AppBar, { shouldForwardProp: (prop) => prop !== "open" && prop !== "collapsed" })<{
  open?: boolean;
  collapsed?: boolean;
}>(({ theme, open, collapsed }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: "100%",
  zIndex: theme.zIndex.drawer + 1,
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  borderBottom: "1px solid",
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  ...(open && {
    width: collapsed ? `calc(100% - ${collapsedDrawerWidth}px)` : `calc(100% - ${drawerWidth}px)`,
    marginLeft: collapsed ? collapsedDrawerWidth : drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const ListItemStyled = styled(ListItem)(({ theme }) => ({
  margin: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
  transition: "all 0.2s ease",
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    "& .MuiListItemIcon-root": {
      color: theme.palette.primary.contrastText,
    },
  },
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    transform: "translateY(-1px)",
    boxShadow: "0 4px 10px rgba(0,0,0,0.07)",
    "& .MuiListItemIcon-root": {
      color: theme.palette.primary.contrastText,
    },
  },
}));

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const userId = useUserStore((state) => state.userId);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Make Payment", icon: <PaymentIcon />, path: "/repayment" },
    { text: "Loan Account", icon: <AccountBalanceWalletIcon />, path: `/loan-account/${userId}` },
    { text: "Cards", icon: <CreditCardIcon />, path: "/cards" },
    { text: "Rewards", icon: <EmojiEventsIcon />, path: "/rewards" },
    { text: "Transactions", icon: <ReceiptIcon />, path: "/transactions" },
    { text: "Account", icon: <AccountCircleIcon />, path: `/account/${userId}` },
  ];

  const drawer = (
    <div>
      <DrawerHeader>
        {!collapsed && (
          <Typography className="flex items-center" variant="h6" component="div" sx={{ fontWeight: 700, ml: 1 }}>
            <span className="text-2xl pr-1">Flex</span>
            <span className="text-2xl font-bold text-green-800">Card</span>
            <span className="text-xs ml-1 px-2 py-1 bg-green-100 text-green-800 rounded">LMS</span>
          </Typography>
        )}
        {isMobile ? (
          <IconButton onClick={handleDrawerToggle}>
            <ChevronLeftIcon />
          </IconButton>
        ) : (
          <IconButton onClick={handleDrawerCollapse}>
            {collapsed ? <KeyboardDoubleArrowRightIcon /> : <KeyboardDoubleArrowLeftIcon />}
          </IconButton>
        )}
      </DrawerHeader>
      <Divider />
      <List sx={{ mt: 1 }}>
        {menuItems.map((item) => (
          <Tooltip title={collapsed ? item.text : ""} placement="right" key={item.text} arrow>
            <ListItemStyled
              button
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                justifyContent: collapsed ? "center" : "flex-start",
                px: collapsed ? 2 : 3,
                py: 1.5,
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path ? "inherit" : "text.secondary",
                  minWidth: collapsed ? 0 : 36,
                  mr: collapsed ? 0 : 2,
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              {!collapsed && <ListItemText primary={item.text} />}
            </ListItemStyled>
          </Tooltip>
        ))}
      </List>

      {!collapsed && (
        <Box sx={{ position: "absolute", bottom: 0, width: "100%", py: 2, px: 3 }}>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: "primary.main",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              U
            </Avatar>
            <Box sx={{ ml: 2 }}>
              <Typography variant="body2" fontWeight={600}>
                {user.name || "User Name"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user.email || "user@example.com"}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </div>
  );

  return (
    <Box sx={{ display: "" }}>
      <AppBarStyled position="fixed" open={!isMobile} collapsed={collapsed}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<PaymentIcon />}
              component={Link}
              to="/repayment"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                boxShadow: "0 2px 8px rgba(25, 118, 210, 0.3)",
                borderRadius: 8,
                px: 2,
              }}
            >
              Make Payment
            </Button>

            <Tooltip title="Notifications">
              <IconButton color="inherit" sx={{ mr: 1 }}>
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="Help">
              <IconButton color="inherit" sx={{ mr: 1 }}>
                <HelpOutlineIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Account settings">
              <IconButton
                onClick={handleMenuOpen}
                size="small"
                sx={{ ml: 1 }}
                aria-controls={Boolean(anchorEl) ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={Boolean(anchorEl) ? "true" : undefined}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: "primary.dark",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      transform: "scale(1.1)",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                    },
                  }}
                >
                  U
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            PaperProps={{
              elevation: 3,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))",
                mt: 1.5,
                width: 220,
                borderRadius: 2,
                "& .MuiMenuItem-root": {
                  px: 2,
                  py: 1.5,
                  borderRadius: 1,
                  mx: 1,
                  my: 0.5,
                  "&:hover": {
                    backgroundColor: "primary.light",
                    color: "primary.contrastText",
                  },
                },
              },
            }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="subtitle2" fontWeight={600}>
                {user.name || "User Name"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user.email || "user@example.com"}
              </Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <MenuItem onClick={handleMenuClose} component={Link} to={`/account/${userId}`}>
              <ListItemIcon>
                <AccountCircleIcon fontSize="small" />
              </ListItemIcon>
              My Account
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <Divider sx={{ my: 1 }} />
            <MenuItem onClick={() => (window.location.href = "/")}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBarStyled>

      <Box
        component="nav"
        sx={{
          width: { sm: collapsed ? collapsedDrawerWidth : drawerWidth },
          flexShrink: { sm: 0 },
        }}
      >
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: isMobile ? drawerWidth : collapsed ? collapsedDrawerWidth : drawerWidth,
              borderRight: "1px solid",
              borderColor: "divider",
              boxShadow: "0 0 20px rgba(0,0,0,0.05)",
              transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Main open={!isMobile} collapsed={collapsed}>
        <Toolbar />
        <Box className="bg-white w-full rounded-lg p-4 min-h-screen">{children}</Box>
      </Main>
    </Box>
  );
};

export default MainLayout;

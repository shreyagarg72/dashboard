import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {Collapse} from "@mui/material";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Image from "next/image";
import logo from "./logo.png";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard"
import QueryStatsIcon from "@mui/icons-material/QueryStats"
import PeopleAltIcon from "@mui/icons-material/PeopleAlt"
import WorkIcon from "@mui/icons-material/Work"
import LiveIcon from "@mui/icons-material/LiveHelp"
import  RecommendIcon  from "@mui/icons-material/RecommendRounded";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import path from "path";
import LibraryBooksIcon  from "@mui/icons-material/LibraryBooks";

const drawerWidth = 240;

function Layout(props) {
  const { window } = props;
  const { children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isCollapse, setIsCollapse] = React.useState(false);
  const router= useRouter();
  const pathname  = usePathname();

  console.log('Pathname',pathname);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  const drawer = (
    <div>
      <Toolbar >
        <Image src={logo} height={45} width={45} alt="logo" className="-ml-2 mr-2"/>
      <Typography variant="h6" noWrap component="div">
           Project
          </Typography>
      </Toolbar>
      <Divider />
      <List>
        {["Dashboard", "Analytics", "Users", "Projects"].map((text, index) => (
          <ListItem key={text} disablePadding
          className={pathname.startsWith("/"+text.toLowerCase())?"text-sky-600 bg-slate-100":"text-slate-700"}
          onClick={()=>router.push("/"+text.toLowerCase())}
          >

            <ListItemButton>
              <ListItemIcon className={pathname.startsWith("/"+text.toLowerCase())?"text-sky-600 bg-slate-100":"text-slate-700"}>
                {index === 0 && <SpaceDashboardIcon />}
                {index === 1 && <QueryStatsIcon />}
                {index === 2 && <PeopleAltIcon />}
                {index === 3 && <WorkIcon />}
                {index === 4 && <LiveIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
         <ListItem disablePadding onClick={handleCollapse} className={pathname.startsWith("/More")?"text-sky-600 bg-slate-100":"text-slate-700"}>
          <ListItemButton>
            <ListItemIcon className={pathname.startsWith("/More")?"text-sky-600 bg-slate-100":"text-slate-700"}> 
            <MailIcon />
            </ListItemIcon>
            <ListItemText primary="More" />
            {isCollapse? <ExpandMoreIcon/>:<ExpandLessIcon/>}
          </ListItemButton>
        </ListItem>
      </List>
      
      <Collapse in={isCollapse} timeout="auto" unamountOnExit>
      <List className="ml-4">
        {["Support", "Contact", "Docs"].map((text, index) => (
          <ListItem key={text} disablePadding className={pathname.startsWith("/More")?"text-sky-600 bg-slate-100":"text-slate-700"}>
            <ListItemButton>
              <ListItemIcon className={pathname.startsWith("/More")?"text-sky-600 bg-slate-100":"text-slate-700"}>
                {index === 0 && <LibraryBooksIcon/>}
                {index === 1 && <RecommendIcon/>}
                {index === 2 && <LiveIcon/>}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      </Collapse>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor:"#FFFFFF",
          color: "#2f2f2f",
        }}
      >
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
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
       <main>{children}</main>
      </Box>
    </Box>
  );
}

Layout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
  children:PropTypes.array,
};

export default Layout;

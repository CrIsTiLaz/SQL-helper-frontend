import Box from "@material-ui/core/Box";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import EmptyState from "../EmptyState";
import SidebarListItem from "./SidebarListItem";
import { DEFAULT_STRINGS, DRAWER_WIDTH } from "../../utils/constants/common";
import Proptypes from "prop-types";
import Book from "@material-ui/icons/Book";
import { getSyntaxMockData } from "../../utils/mockDataF";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import TableNameContext from "../../context/TableNameContext";
// SideBar Styles

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    [theme.breakpoints.up("sm")]: {
      position: "relative",
    },
    whiteSpace: "nowrap",
    height: "100%",
    width: DRAWER_WIDTH,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.short,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.short,
    }),
    width: 0,
  },
}));

// SideBar Component
const SideBar = ({ showDrawer = true, items = [] }) => {
  const classes = useStyles();
  //const { selectedTableName } = useContext(TableNameContext);
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(
          classes.drawerPaper,
          !showDrawer && classes.drawerPaperClose
        ),
      }}
      open={showDrawer}
    >
      <IconButton
        className={classes.menuButton}
        //onClick={onMenuButtonClick}
        disableRipple
        edge="start"
        aria-label="sidebar menu"
      >
        <MenuIcon />
      </IconButton>
      <Box p={2}>
        <Typography variant="h6">{DEFAULT_STRINGS.TABLES}</Typography>
      </Box>
      {items.length === 0 ? (
        <EmptyState
          title={DEFAULT_STRINGS.NO_TABLES_EXIST}
          titleVariant="h6"
          subtitle={DEFAULT_STRINGS.IMPORT_NEW_DATA_MESSAGE}
        />
      ) : (
        <List>
          {items.map((item, index) => (
            <SidebarListItem
              key={`${item.tableName}-${index}-table-metadata`}
              listItem={item}
            />
          ))}
        </List>
      )}
      <Box py={2}>
        <SidebarListItem
          listItem={getSyntaxMockData()}
          icon={<Book />}
          subtitle={"Queries"}
        />
      </Box>
    </Drawer>
  );
};

export default SideBar;

SideBar.propTypes = {
  items: Proptypes.array,
  showDrawer: Proptypes.bool.isRequired,
};

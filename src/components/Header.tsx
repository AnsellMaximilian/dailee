import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import React from "react";

import { NavLink } from "react-router-dom";
import { auth } from "../firebase/config";

const useStyles = makeStyles((theme) => ({
  link: {
    color: "inherit",
    cursor: "pointer",
    opacity: 0.75,
    textDecoration: "none",
    margin: theme.spacing(0, 1),
    "&:hover": {
      opacity: 1,
    },
  },

  activeLink: {
    opacity: 1,
  },

  toolbar: {
    flexWrap: "wrap",
  },

  userInfo: {
    flexGrow: 1,
    textAlign: "left",
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.userInfo}>
          {auth.currentUser?.email}
        </Typography>
        <nav>
          {!auth.currentUser ? (
            <>
              <NavLink
                to={process.env.PUBLIC_URL + "/signup"}
                className={classes.link}
                activeClassName={classes.activeLink}
              >
                Sign Up
              </NavLink>
              <NavLink
                to={process.env.PUBLIC_URL + "/signin"}
                className={classes.link}
                activeClassName={classes.activeLink}
              >
                Sign In
              </NavLink>
            </>
          ) : (
            <span
              color="inherit"
              className={classes.link}
              onClick={() => auth.signOut()}
            >
              Sign Out
            </span>
          )}
        </nav>
      </Toolbar>
    </AppBar>
  );
}

import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import React from "react";

import { NavLink } from "react-router-dom";
import { auth } from "../firebase/config";

import brandSVG from "../images/logo.svg";

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
    position: "relative",
  },

  userInfo: {
    flexGrow: 1,
    textAlign: "left",
  },

  brandContainer: {
    width: 100,
    height: "125%",
    position: "absolute",
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[4],
    borderRadius: "0 0 50% 50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: "0",
    left: "50%",
    transform: "translateX(-50%)",
    transition: "all 0.25s",
    "& img": {
      // height: "60%",
      width: "50%",
    },
    "&:hover": {
      height: "200%",
    },
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <NavLink
          to={process.env.PUBLIC_URL + "/"}
          className={classes.brandContainer}
        >
          <img src={brandSVG} alt="brand" />
        </NavLink>
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

import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  barContainer: {
    display: "inline",
  },
  bar: {},
}));

interface Props {
  importance: 1 | 2 | 3 | 4 | 5;
}

export default function ImportanceBar({ importance }: Props) {
  const classes = useStyles();
  return (
    <div className={classes.barContainer}>
      <svg viewBox="0 0 284 276" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="284" height="44" fill="#FF0000" />
        <rect x="25" y="58" width="234" height="44" fill="#FF6B00" />
        <rect x="49" y="116" width="186" height="44" fill="#FFBB37" />
        <rect x="74" y="174" width="136" height="44" fill="#1AC72C" />
        <rect x="98" y="232" width="88" height="44" fill="#2FEE1F" />
      </svg>
    </div>
  );
}

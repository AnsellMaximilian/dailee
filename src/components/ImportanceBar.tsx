import { makeStyles } from "@material-ui/core";
import React from "react";
import importanceValues from "../utils/importance";

const useStyles = makeStyles((theme) => ({
  barContainer: {
    display: "inline-block",
    height: "1.25rem",
    width: "1.25rem",
    padding: theme.spacing(1),
  },
  bar: {},
}));

interface Props {
  importance: 1 | 2 | 3 | 4 | 5;
}

export default function ImportanceBar({ importance }: Props) {
  const classes = useStyles();
  return (
    <div
      className={classes.barContainer}
      title={importanceValues[importance].label}
    >
      <svg viewBox="0 0 284 276" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect
          width="284"
          height="44"
          fill={importance > 4 ? importanceValues[5].color : "#C4C4C4"}
        />
        <rect
          x="25"
          y="58"
          width="234"
          height="44"
          fill={importance > 3 ? importanceValues[4].color : "#C4C4C4"}
        />
        <rect
          x="49"
          y="116"
          width="186"
          height="44"
          fill={importance > 2 ? importanceValues[3].color : "#C4C4C4"}
        />
        <rect
          x="74"
          y="174"
          width="136"
          height="44"
          fill={importance > 1 ? importanceValues[2].color : "#C4C4C4"}
        />
        <rect
          x="98"
          y="232"
          width="88"
          height="44"
          fill={importanceValues[1].color}
        />
      </svg>
    </div>
  );
}

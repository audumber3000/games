import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const useStyles = makeStyles((theme) => ({
  optionsContainer: {
    marginTop: "1rem",
    backgroundColor: "white",
    padding: theme.spacing(2),
    width: "96%",
    maxWidth: "100vw",
    textAlign: "center",
    overflowX: "auto",
  },
  option: {
    marginBottom: theme.spacing(1),
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    transition: "background-color 0.3s",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    boxSizing: "border-box",
    borderRadius: theme.spacing(1),
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  checkbox: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    alignSelf: "center",
    borderRight: "1px solid #ccc",
    paddingRight: theme.spacing(1),
  },
  label: {
    flexGrow: 1,
    paddingLeft: theme.spacing(1),
  },
  selectedOption: {
    backgroundColor: "#6A0DAD",
    color: "white",
  },
}));

const OptionsComponent = ({
  options,
  selectedOption,
  correctAnswer,
  onOptionSelect,
  onNextQuestion,
}) => {
  const classes = useStyles();

  const [isChecked, setIsChecked] = useState(options.map(() => false));

  const handleOptionToggle = (index) => {
    const newIsChecked = options.map((_, i) => i === index);
    setIsChecked(newIsChecked);
    onOptionSelect(options[index]);
    onNextQuestion();
  };

  return (
    <Paper className={classes.optionsContainer}>
      <List>
        {options.map((option, index) => {
          const isCheckedOption = isChecked[index];
          const isCorrectOption = option === correctAnswer;
          const optionClass = `${classes.option} ${
            isCheckedOption ? classes.selectedOption : ""
          }`;

          return (
            <ListItem
              key={index}
              className={optionClass}
              onClick={() => handleOptionToggle(index)}
            >
              <div className={classes.checkbox}>
                <Checkbox
                  checked={isCheckedOption}
                  color="secondary"
                />
              </div>
              <div className={classes.label}>{option}</div>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

export default OptionsComponent;

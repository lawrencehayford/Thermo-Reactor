import React from "react";
import { withStyles } from "@material-ui/core/styles";

import AreaChart from "../components/AreaChart";
import Colors from "../constants/Colors";

const styles = {
  root: {
    border: "1px #f00 dotted",
    margin: "2vw"
  }
};

function GraphView(props) {
  const { data, classes } = props;
  if (!data || !data.length) {
    return <div />;
  }

  let flattenedDataArr = [];
  let keyArr = [];
  let keyIndexArr = [];
  let keyColor = [];

  function remove_duplicates(arr) {
    let s = new Set(arr);
    let it = s.values();
    return Array.from(it);
  }

  function getColor(flattenedDataArr) {
    let colorArr = [];
    flattenedDataArr.forEach(element => {
      colorArr.push(Colors[element.reactorName]);
    });
    return colorArr;
  }

  data.forEach(element => {
    if (Object.keys(element.reactorData).length > 1) {
      for (let i = 0; i < Object.keys(element.reactorData).length; i++) {
        flattenedDataArr.push({
          timestamp: element.timestamp,
          reactorName: Object.keys(element.reactorData)[i],
          reactorValue: element.reactorData[Object.keys(element.reactorData)[i]]
        });
        keyArr.push(Object.keys(element.reactorData)[i]);
        keyIndexArr.push(i);
      }
    } else {
      flattenedDataArr.push({
        timestamp: element.timestamp,
        reactorName: Object.keys(element.reactorData)[0],
        reactorValue: element.reactorData[Object.keys(element.reactorData)[0]]
      });
      keyArr.push(Object.keys(element.reactorData)[0]);
      keyIndexArr.push(0);
    }
  });

  keyArr = remove_duplicates(keyArr);
  keyIndexArr = remove_duplicates(keyIndexArr);
  keyColor = getColor(flattenedDataArr);

  return (
    <div className={classes.root}>
      <AreaChart
        data={flattenedDataArr}
        keys={keyArr}
        keyIndex={keyIndexArr}
        size={[window.innerWidth, 500]}
        color={keyColor}
      />
    </div>
  );
}

export default withStyles(styles)(GraphView);

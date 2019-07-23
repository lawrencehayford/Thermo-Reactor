import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    border: '1px #f00 dotted',
    margin: '5vw',
  },
};

function GraphView(props) {
  const { data, classes } = props;
  if (!data || !data.length) {
    return <div />;
  }
  return (
    <div className={classes.root}>
      <marquee>Your work goes here!</marquee>
      {/*
        // You might find this helpful:
        <pre>{JSON.stringify(data, null, 4)}</pre>
      */}
    </div>
  );
}

export default withStyles(styles)(GraphView);

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import ReactorDataViewer from './ReactorDataViewer';

import logo from './logo-2x.png';

function App(props) {
  const { classes } = props;
  return (
    <>
      <div className={classes.headSection}>
        <img alt="Some weird spore thing" src={logo} className={classes.spore} />
        <Typography variant="headline" className={classes.mainHeader}>
          Thaumic Reactor Data Viewer
        </Typography>
      </div>
      <div className={classes.main}>
        <ReactorDataViewer />
      </div>
    </>
  );
}

const styles = {
  headSection: {
    alignItems: 'center',
    display: 'flex',
    height: '10vh',
    margin: '0 auto',
    padding: '12px',
    width: '90vw',
  },

  mainHeader: {
    color: '#fff',
  },

  spore: {
    height: '8vh',
    marginRight: '12px',
  },

  main: {
    background: '#f2f2f2',
    borderRadius: '4px',
    padding: '12px',
    margin: '0 auto 50px auto',
    height: '80vh',
    width: '90vw',
  },
};

export default withStyles(styles)(App);

import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import React, { useState, useCallback } from 'react';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

import Colors from './Colors';
import DataFetcher from './DataFetcher';

const REACTOR_COUNT = 12;

function ReactorDataViewer(props) {
  const [selectedReactors, setSelectedReactors] = useState(new Set([1]));

  const toggleAll = useCallback(() => {
    const newSelectedReactors = new Set();
    // If not all of the reactors are selected, select them all.
    // Otherwise, flip them all off.
    if (selectedReactors.size < REACTOR_COUNT) {
      for (let i = 1; i <= REACTOR_COUNT; i += 1) {
        newSelectedReactors.add(i);
      }
    }
    setSelectedReactors(newSelectedReactors);
  }, [selectedReactors]);

  const onToggleReactor = useCallback(
    idx => {
      const newSelectedReactors = new Set(selectedReactors.values());
      if (!newSelectedReactors.has(idx)) {
        newSelectedReactors.add(idx);
      } else {
        newSelectedReactors.delete(idx);
      }
      setSelectedReactors(newSelectedReactors);
    },
    [selectedReactors],
  );

  const { classes } = props;

  const items = [];
  for (let i = 1; i <= REACTOR_COUNT; i += 1) {
    const isSelected = selectedReactors.has(i);
    items.push(
      <MenuItem
        key={'reactor-' + i}
        onClick={() => {
          onToggleReactor(i);
        }}
      >
        <ListItemIcon>
          <Switch checked={isSelected} color="primary" />
        </ListItemIcon>
        <ListItemText primary={`Reactor ${i}`} />
        {selectedReactors.has(i) && (
          <div
            className={classes.swatch}
            style={{ backgroundColor: Colors['reactor-' + i] }}
          />
        )}
      </MenuItem>,
    );
  }

  const toggleButton = (
    <MenuItem onClick={toggleAll}>
      <ListItemIcon>
        <Switch checked={selectedReactors.size < REACTOR_COUNT} color="primary" />
      </ListItemIcon>
      <ListItemText primary="Toggle all" />
    </MenuItem>
  );

  return (
    <Grid container spacing={8} className={classes.grid}>
      <Grid item xs={3}>
        <MenuList>
          {toggleButton}
          <Divider />
          {items}
        </MenuList>
      </Grid>
      <Grid item xs={9} className={props.classes.mainContent}>
        <DataFetcher selectedReactors={selectedReactors} />
      </Grid>
    </Grid>
  );
}

const styles = {
  grid: {
    height: '100%',
  },
  mainContent: {
    background: '#fff',
    border: '1px #d2d2d2 solid',
    borderRadius: '4px',
    display: 'flex',
    flex: 1,
    overflow: 'scroll',
  },

  toggleOn: {
    color: '#56ae31',
  },

  toggleOff: {
    color: '#aaa',
  },

  swatch: {
    border: '1px #fff solid',
    borderRadius: '4px',
    display: 'inline-block',
    height: '15px',
    width: '15px',
  },
};

export default withStyles(styles)(ReactorDataViewer);

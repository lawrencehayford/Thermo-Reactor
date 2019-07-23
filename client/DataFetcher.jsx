import Button from '@material-ui/core/Button';
import PauseCircleFilled from '@material-ui/icons/PauseCircleFilled';
import PlayCircleFilled from '@material-ui/icons/PlayCircleFilled';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';

import fetchReactorData from './api';
import GraphView from './GraphView';

const POLLING_INTERVAL = 100;

function DataFetcher(props) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [continuousFetch, setContinuousFetch] = useState(true);
  const [loading, setLoading] = useState(false);
  const [reactorData, setReactorData] = useState([]);
  const reactorDataRef = useRef(reactorData);
  const { selectedReactors } = props;
  const reactorsRef = useRef(null);
  reactorsRef.current = selectedReactors;

  useEffect(() => {
    const data = [];
    setReactorData(data);
    reactorDataRef.current = data;
  }, [selectedReactors, setReactorData]);

  const fetchData = useCallback(() => {
    if (!continuousFetch) {
      return;
    }

    if (!selectedReactors.size) {
      setReactorData([]);
      return;
    }

    reactorsRef.current = selectedReactors;
    (async () => {
      setLoading(true);
      try {
        const responseData = await fetchReactorData(selectedReactors);
        // Don't apply the results of a request that was interrupted by
        // another request.
        if (reactorsRef.current !== selectedReactors) {
          return;
        }
        const currentData = reactorDataRef.current;
        const newData = [...currentData, responseData];
        setReactorData(newData);
        reactorDataRef.current = newData;

        setErrorMessage(null);
      } catch (e) {
        setErrorMessage(e.message);
      }
      setLoading(false);
    })();
  }, [setReactorData, selectedReactors, continuousFetch]);

  const toggleContinuousFetch = useCallback(() => {
    setContinuousFetch(!continuousFetch);
  }, [continuousFetch]);

  useEffect(() => {
    const timerId = setTimeout(fetchData, POLLING_INTERVAL);
    return () => {
      clearTimeout(timerId);
    };
  }, [selectedReactors, reactorData, loading, continuousFetch, fetchData]);

  const { classes } = props;
  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Button variant="outlined" onClick={toggleContinuousFetch}>
          {continuousFetch && (
            <>
              <PauseCircleFilled className={classes.icon} />
              Pause
            </>
          )}
          {!continuousFetch && (
            <>
              <PlayCircleFilled className={classes.icon} />
              Live
            </>
          )}
        </Button>
      </div>
      <GraphView data={reactorData} />
      {errorMessage !== null && (
        <div className={classes.error}>
          Error when fetching: {errorMessage}
          <br />
          <em>(Is the server running?)</em>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    margin: '12px',
  },
  controls: {
    flexGrow: 0,
    textAlign: 'right',
  },
  icon: {
    marginRight: '10px',
  },
  error: {
    border: '1px #c33 solid',
    borderRadius: '4px',
    color: '#c33',
    margin: '12px auto',
    padding: '12px',
    textAlign: 'center',
    width: '500px',
  },
};

export default withStyles(styles)(DataFetcher);

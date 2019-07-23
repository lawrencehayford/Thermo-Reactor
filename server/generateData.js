// This function is serving as the data source for the visualisation. Of
// course, in the real world, this data would be pulled from a device in a
// laboratory and funneled through a database. This is just meant to give a
// sense of what that data might look like.
//
// The data format here isn't anything special or off-limits. This is a full-
// stack takehome challenge after all.
const NUM_REACTORS = 12;
export default function generateData(reactorIds) {
  const timestamp = Date.now();
  const reactorData = {};
  reactorIds.forEach(reactorId => {
    reactorData['reactor-' + reactorId] = getValueForReactor(timestamp, reactorId);
  });

  return {
    timestamp,
    reactorData,
  };
}

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX //
//   Please do not modify this function. Assume these values are being read   //
//   straight from a thaumometer within a reactor.                            //
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX //
const thaumicWindow = 20;
function getValueForReactor(timestamp, reactorId) {
  const ts = timestamp + Math.pow(reactorId, 2);
  let thaums = (ts / 1000) % thaumicWindow;
  if (thaums > thaumicWindow / 2) {
    thaums = thaumicWindow / 2 + (thaumicWindow / 2 - thaums);
  }
  thaums = thaums * reactorId;
  const waveHeight = (reactorId / NUM_REACTORS) * 10 + thaums;
  const waveWidth = reactorId;
  return waveHeight + waveHeight * Math.sin(ts / 1000 + waveWidth);
}

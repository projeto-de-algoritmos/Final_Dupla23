const calculateBestPath = (paths) => {
  console.log('paths', paths);
  let currentValue;
  let bestPath = { route: null, value: -1 };

  for (const path of paths) {
    currentValue = path.result.reduce((acc, current) => acc + current.value, 0);
    if (currentValue > bestPath.value) {
      bestPath = { route: path.path, value: currentValue };
    }
  };

  return bestPath;
}

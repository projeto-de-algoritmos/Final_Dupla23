class Queue {
  constructor() {
    this.queue = [];
  }

  enqueue(elem) {
    return this.queue.push(elem)
  }

  dequeue() {
    return this.queue.shift()
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}


export const calculateKnapSack = (path, maxCapacity) => {
  const dp = [];
  const items = path.map(it => it.items).flat()

  for (let i = 0; i <= items.length; i++) {
    dp.push(new Array(maxCapacity + 1).fill(0));
  }

  for (let i = 1; i < items.length; i++) {
    for (let j = 0; j <= maxCapacity; j++) {
      if (items[i - 1].weight > j) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - items[i - 1].weight] + items[i - 1].value);
      }
    }
  }

  const result = [];
  let i = items.length;
  let j = maxCapacity;
  while (i > 0 && j > 0) {
    if (dp[i][j] !== dp[i - 1][j]) {
      result.unshift(items[i - 1]);
      j -= items[i - 1].weight;
    }
    i--;
  }

  return result;
};

export const calculateBestPath = (paths) => {
  let currentValue;
  let bestPath = { route: null, value: -1 };

  for (const path of paths) {
    currentValue = path.result.reduce((acc, current) => acc + current.value, 0);
    if (currentValue > bestPath.value) {
      bestPath = { route: path.path, value: currentValue };
    }
  };

  return bestPath;
};

export const BFS = (graph, start, end) => {
  let minimum = Infinity;
  let paths = [];
  const queue = new Queue();
  queue.enqueue([start]);

  while (!queue.isEmpty()) {
    const currentPath = queue.dequeue();
    const node = currentPath[currentPath.length - 1];

    if (node === end && currentPath.length <= minimum) {
      if (currentPath.length < minimum) {
        paths = [];
        minimum = currentPath.length;
      }

      paths.push(currentPath.map((vertice) => ({ vertice, items: graph.get(vertice)['items'] })));
      continue;
    }

    for (const nextNode of graph.get(node)['caminhos']) {
      if (!currentPath.includes(nextNode)) {
        queue.enqueue(currentPath.concat([nextNode]));
      }
    }
  }

  return paths;
}
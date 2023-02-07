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

export function calculateKnapSack(items, capacity) {
  items = items.map(it => it.items).flat();

  const n = items.length;
  let dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));
  let selected = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= capacity; j++) {
      if (j < items[i - 1].weight) {
        dp[i][j] = dp[i - 1][j];
      } else {
        if (dp[i - 1][j] > dp[i - 1][j - items[i - 1].weight] + items[i - 1].value) {
          dp[i][j] = dp[i - 1][j];
        } else {
          dp[i][j] = dp[i - 1][j - items[i - 1].weight] + items[i - 1].value;
          selected[i][j] = 1;
        }
      }
    }
  }

  let result = [];
  let i = n;
  let j = capacity;
  while (i > 0 && j > 0) {
    if (selected[i][j] === 1) {
      result.push(i);
      j -= items[i - 1].weight;
    }
    i -= 1;
  };

  result.reverse();

  return [dp[n][capacity], result.map(it => items[it - 1])];
}

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
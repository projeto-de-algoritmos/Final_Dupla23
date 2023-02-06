class Item {
  constructor(capacity = 10) {
    this.items = new Map()
    this.capacity = capacity;
  }

  createItem(id, name, weight, value) {
    this.items.set(id, { name, weight, value })
  }

  getItem(id) {
    return this.items.get(id);
  }

  calculateKnapSack(items) {
    const dp = [];
    items = items.map(it => it.items).flat()

    for (let i = 0; i <= items.length; i++) {
      dp.push(new Array(this.capacity + 1).fill(0));
    }

    for (let i = 1; i < items.length; i++) {
      for (let j = 0; j <= this.capacity; j++) {
        if (items[i - 1].weight > j) {
          dp[i][j] = dp[i - 1][j];
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - items[i - 1].weight] + items[i - 1].value);
        }
      }
    }

    const result = [];
    let i = items.length;
    let j = this.capacity;
    while (i > 0 && j > 0) {
      if (dp[i][j] !== dp[i - 1][j]) {
        result.unshift(items[i - 1]);
        j -= items[i - 1].weight;
      }
      i--;
    }

    return result;
  }
};

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

class Graph {
  constructor() {
    this.vertices = new Map();
  }

  addVertice(vertice) {
    this.vertices.set(vertice, { caminhos: [], items: [] });
  }

  addAresta(origem, destino) {
    this.vertices.get(origem)['caminhos'].push(destino);
    this.vertices.get(destino)['caminhos'].push(origem);
  }

  addItem(node, item) {
    this.vertices.get(node)['items'].push(item);
  }

  BFS(start, end) {
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

        paths.push(currentPath.map((vertice) => ({ vertice, items: this.vertices.get(vertice)['items'] })));
        continue;
      }

      for (const nextNode of this.vertices.get(node)['caminhos']) {
        if (!currentPath.includes(nextNode)) {
          queue.enqueue(currentPath.concat([nextNode]));
        }
      }
    }

    return paths;
  }
};


const calculateBestPath = (paths) => {
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

const item = new Item()
item.createItem(1, "Item A", 3, 15);
item.createItem(2, "Item B", 4, 21);
item.createItem(3, "Item C", 1, 3);
item.createItem(4, "Item D", 5, 27);
item.createItem(5, "Item E", 8, 40);
item.createItem(6, "Item F", 9, 43);
item.createItem(7, "Item G", 6, 31);

const graph = new Graph()
graph.addVertice('A');
graph.addVertice('B');
graph.addVertice('C');
graph.addVertice('D');
graph.addVertice('E');
graph.addVertice('F');
graph.addVertice('G');

graph.addItem('B', item.getItem(2));
graph.addItem('B', item.getItem(4));
graph.addItem('C', item.getItem(5));
graph.addItem('C', item.getItem(6));
graph.addItem('D', item.getItem(3));
graph.addItem('D', item.getItem(1));
graph.addItem('E', item.getItem(3));
graph.addItem('E', item.getItem(5));
graph.addItem('F', item.getItem(7));

// A
graph.addAresta('A', 'B');
graph.addAresta('A', 'C');
// B
graph.addAresta('B', 'D');
graph.addAresta('B', 'F');
// C
graph.addAresta('C', 'D');
graph.addAresta('C', 'E');
// D
graph.addAresta('D', 'G');
graph.addAresta('D', 'E');
graph.addAresta('D', 'F');
// F
graph.addAresta('F', 'G');
// E
graph.addAresta('E', 'G');


const minimumPaths = graph.BFS('A', 'G')

const results = []
for (path of minimumPaths) {
  results.push({
    path,
    result: item.calculateKnapSack(path)
  })
}

console.log(calculateBestPath(results))

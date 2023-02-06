class Items {
  constructor(knapsackSize = 10) {
    this.items = []
    this.knapsackSize = knapsackSize;
  }

  addItem(name, weight, value, avaliableOn) {
    this.items.push({ name, weight, value, avaliableOn });
  }
}

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
    this.vertices.set(vertice, []);
  }

  addAresta(origem, destino) {
    this.vertices.get(origem).push(destino);
    this.vertices.get(destino).push(origem);
  }

  BFS(start, end) {
    const paths = [];
    const queue = new Queue();
    queue.enqueue([start]);

    while (!queue.isEmpty()) {
      const currentPath = queue.dequeue();
      const node = currentPath[currentPath.length - 1];

      if (node === end) {
        paths.push(currentPath);
        continue;
      }

      for (const nextNode of this.vertices.get(node)) {
        if (!currentPath.includes(nextNode)) {
          queue.enqueue(currentPath.concat([nextNode]));
        }
      }
    }

    return paths;
  }
}

const items = new Items()
items.addItem("Item A", 3, 15, []);
items.addItem("Item B", 4, 21, []);
items.addItem("Item C", 1, 3, []);
items.addItem("Item D", 5, 27, []);
items.addItem("Item E", 8, 39, []);
items.addItem("Item F", 9, 43, []);
items.addItem("Item G", 6, 31, []);

const graph = new Graph()

graph.addVertice('A')
graph.addVertice('B')
graph.addVertice('C')
graph.addVertice('D')
graph.addAresta('A', 'B')
graph.addAresta('A', 'C')
graph.addAresta('C', 'D')
graph.addAresta('B', 'D')
console.log(graph.BFS('A', 'D'));


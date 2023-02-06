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

export class Graph {
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
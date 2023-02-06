class Items {
  constructor(knapsackSize) {
    this.items = []
    this.knapsackSize = knapsackSize;
  }
  
  addItem(weight, value, avaliableOn) {
    this.items.push({ weight, value, avaliableOn });
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
}
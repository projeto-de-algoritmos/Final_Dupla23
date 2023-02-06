export class Item {
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

  calculateKnapSack(path) {
    const dp = [];
    const items = path.map(it => it.items).flat() 

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
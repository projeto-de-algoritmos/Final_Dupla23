import { useEffect, useRef, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';

import { Item } from './utils/item';
import { Graph } from './utils/graph';

import './App.css';

import * as Style from './style';

const item = new Item();
const graph = new Graph();

item.createItem(1, "Item A", 3, 15);
item.createItem(2, "Item B", 4, 21);
item.createItem(3, "Item C", 1, 3);
item.createItem(4, "Item D", 5, 27);
item.createItem(5, "Item E", 8, 40);
item.createItem(6, "Item F", 9, 43);
item.createItem(7, "Item G", 6, 31);

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


function App() {
  const [minimumPaths, setMinimumPaths] = useState(null);
  const [bestPath, setBestPath] = useState(null);

  // const [elements, setElements] = useState([]);

  const itemNameInputRef = useRef(null);
  const itemWeightInputRef = useRef(null);
  const itemValueInputRef = useRef(null);

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


  const createItem = () => {
    item.createItem(
      item.items.size + 1,
      itemNameInputRef.current.value,
      itemWeightInputRef.current.value,
      itemValueInputRef.current.value
    );
  };

  const getPaths = () => {
    const results = [];
    const mp = graph.BFS('A', 'G');

    for (const path of mp) {
      results.push({
        path,
        result: item.calculateKnapSack(path)
      })
    }

    setMinimumPaths(mp);
    setBestPath(calculateBestPath(results));
  }

  // useEffect(() => {
  //   if (graph.vertices.size) {
  //     let elem = [];
  //     // Adiciona os vertices
  //     graph.vertices.forEach((nodeVal, nodeId) => {
  //       let randX = Math.random() * (500 - 0);
  //       let randY = Math.random() * (500 - 0);
  //       elem.push({ data: { id: nodeId, label: `Node ${nodeId}` }, position: { x: randX, y: randY } })
  //     });
  //     // Adiciona as arestas
  //     graph.vertices.forEach((nodeVal, nodeId) => {
  //       nodeVal.caminhos.forEach((target) => {
  //         elem.push({ data: { source: nodeId, target: target, label: `Edge from ${nodeId} to ${target}` } })
  //       })
  //     });
  //     setElements(elem);
  //   }
  // }, [graph.vertices]);

  return (
    <Style.Container className="App">
      <div>
        <Style.SectionName>Itens disponíveis:</Style.SectionName>
        <Style.ItemsSection>
          {graph.vertices.size ? (
            <Style.ItemTable>
              <Style.ItemTableHeader>
                <tr>
                  <td>Nome</td>
                  <td>Peso</td>
                  <td>Raridade</td>
                </tr>
              </Style.ItemTableHeader>
              <tbody>
                {Array.from(item.items.entries()).map(([key, value]) => ({ key, value })).map(item => {
                  return (
                    <tr key={item.key}>
                      <td>{item.value.name}</td>
                      <td>{item.value.weight}</td>
                      <td>{item.value.value}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Style.ItemTable>
          ) : (
            <h4>Nenhum item cadastrado</h4>
          )}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor=''>Nome:</label>
            <input id='item-name-input' type="text" ref={itemNameInputRef} />
            <label htmlFor=''>Peso:</label>
            <input id='item-weight-input' type="number" ref={itemWeightInputRef} />
            <label htmlFor=''>Valor:</label>
            <input id='item-value-input' type="number" ref={itemValueInputRef} />
            <button onClick={createItem} style={{ marginTop: '1rem' }}>Criar</button>
          </div>
        </Style.ItemsSection>
      </div>
      <div>
        <Style.SectionName>Grafo:</Style.SectionName>
        <Style.GraphSection>
          <div style={{ width: '350px' }}>
            <h1> GRAFO </h1>
          </div>


          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor=''>Nome:</label>
              <input id='item-name-input' type="text" ref={itemNameInputRef} />
              <label htmlFor=''>Peso:</label>
              <input id='item-weight-input' type="number" ref={itemWeightInputRef} />
              <label htmlFor=''>Valor:</label>
              <input id='item-value-input' type="number" ref={itemValueInputRef} />
              <button onClick={createItem} style={{ marginTop: '1rem' }}>Criar</button>
            </div>
          </div>
        </Style.GraphSection>

      </div>

      {!bestPath && !minimumPaths ? (
        <Style.CalculateButton onClick={getPaths}>Calcular melhor caminho</Style.CalculateButton>
      ) : (
        <div>
          <h3>Menores caminhos de A até G</h3>
          {minimumPaths.map((path, idx) => {
            return <h5 key={idx}>{path.map((a) => a.vertice).join(' -> ')}</h5>
          })}
          <h3>Melhor caminho geral</h3>
          <h5>{bestPath.route.map(it => it.vertice).join(' -> ')}</h5>
          <span>{bestPath.value}</span>
        </div>
      )}
    </Style.Container>
  );
}

export default App;

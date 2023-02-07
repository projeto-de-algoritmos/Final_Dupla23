import { useEffect, useState } from 'react';
import { calculateKnapSack, BFS } from './utils/calcFunctions';

import './App.css';

import * as Style from './style';

function App() {
  const [minimumPaths, setMinimumPaths] = useState(null);
  const [bestPath, setBestPath] = useState(null);

  const [capacity, setCapacity] = useState(10);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const [itemName, setItemName] = useState("");
  const [itemWeight, setItemWeight] = useState(0);
  const [itemValue, setItemValue] = useState(0);

  const [vertexName, setVertexName] = useState("");

  const [selectedItem, setSelectedItem] = useState("");
  const [selectedVertex, setSelectedVertex] = useState("");

  const [itensList, setItensList] = useState(new Map());
  const [graph, setGraph] = useState(new Map());

  const createItem = () => {
    setItensList((currState) => {
      const newItem = new Map();

      newItem.set(currState.size + 1, {
        name: itemName,
        weight: itemWeight,
        value: itemValue
      })

      const newState = new Map([...currState, ...newItem]);

      setItemName("");
      setItemWeight(0);
      setItemValue(0);

      return newState;
    })
  };

  const createVertex = () => {
    if (graph.get(vertexName)) {
      alert("Um vertice com esse nome ja foi criado");
      return;
    };

    setGraph((currState) => {
      const newItem = new Map();
      newItem.set(vertexName.toUpperCase(), { caminhos: [], items: [] })
      const newState = new Map([...currState, ...newItem]);
      setVertexName("");
      return newState;
    })
  };

  const getMinimumPaths = () => {
    if (graph.size === 0) {
      alert('Nenhum vertice cadastrado');
      return;
    }

    if (!graph.get(from)) {
      alert("Origem invalida");
      return;
    }

    if (!graph.get(to)) {
      alert("Destino invalido");
      return;
    }

    if (to === from) {
      alert("Origem e destino iguais");
      return;
    }

    if (!minimumPaths) {
      const mp = BFS(graph, from, to);
      setMinimumPaths(mp);
      getBestPath(mp);
    } else {
      getBestPath(minimumPaths);
    }
  }

  const getBestPath = (mp) => {
    const results = [];

    for (const path of mp) {
      results.push({
        route: path,
        result: calculateKnapSack(path, Number.parseInt(capacity, 10))
      })
    };

    setBestPath(results.reduce((acc, curr) => acc.result[0] > curr.result[0] ? acc : curr));
  };

  const addItem = (vertexId) => {
    const item = itensList.get(Number.parseInt(selectedItem));
    graph.get(vertexId)['items'].push(item)

    setGraph((currState) => {
      const newState = new Map(Array.from(currState, ([key, value]) => [key, value]));
      setSelectedItem("");
      return newState;
    });
  };

  const addConection = (from) => {
    graph.get(from)['caminhos'].push(selectedVertex)
    graph.get(selectedVertex)['caminhos'].push(from)

    setGraph((currState) => {
      const newState = new Map(Array.from(currState, ([key, value]) => [key, value]));
      setSelectedVertex("");
      return newState;
    });
  };

  const quickRegister = () => {
    const i = new Map([
      [1, { name: "Lanterna", weight: 3, value: 15 }],
      [2, { name: "Rádio", weight: 4, value: 21 }],
      [3, { name: "Mapa", weight: 1, value: 3 }],
      [4, { name: "Espada", weight: 5, value: 27 }],
      [5, { name: "Diamante", weight: 8, value: 40 }],
      [6, { name: "Cajado Mágico", weight: 9, value: 43 }],
      [7, { name: "Joia", weight: 6, value: 31 }]
    ]);

    const g = new Map([
      ['A', { caminhos: ['B', 'C'], items: [] }],
      ['B', { caminhos: ['A', 'D', 'F'], items: [i.get(2), i.get(4)] }],
      ['C', { caminhos: ['A', 'D', 'E'], items: [i.get(5), i.get(6)] }],
      ['D', { caminhos: ['B', 'C', 'G', 'E', 'F'], items: [i.get(3), i.get(1)] }],
      ['E', { caminhos: ['C', 'D', 'G'], items: [i.get(3), i.get(5)] }],
      ['F', { caminhos: ['B', 'D', 'G'], items: [i.get(7)] }],
      ['G', { caminhos: ['D', 'E', 'F'], items: [] }],
    ]);

    setItensList(i);
    setGraph(g);
  };

  useEffect(() => {
    setBestPath(null)
  }, [capacity]);

  useEffect(() => {
    setMinimumPaths(null);
  }, [from, to])

  return (
    <Style.Container className="App">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <label>Máxima Capacidade:</label>
          <input value={capacity} onChange={(e) => setCapacity(e.target.value)} type="number" />
        </div>
        <div>
          <label>Origem:</label>
          <input value={from} onChange={(e) => setFrom(e.target.value.toUpperCase())} type="text" />
          <label>Destino:</label>
          <input value={to} onChange={(e) => setTo(e.target.value.toUpperCase())} type="text" />
        </div>
        <button onClick={quickRegister}>Cadastro Rapido</button>
      </div>

      <div>
        <Style.SectionName>Itens disponíveis:</Style.SectionName>
        <Style.ItemsSection>
          {itensList.size ? (
            <Style.ItemTable>
              <Style.ItemTableHeader>
                <tr>
                  <td>Nome</td>
                  <td>Peso</td>
                  <td>Raridade</td>
                </tr>
              </Style.ItemTableHeader>
              <tbody>
                {Array.from(itensList.entries()).map(([key, value]) => ({ key, value })).map(item => {
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
            <input value={itemName} type="text" onChange={(e) => setItemName(e.target.value)} />
            <label htmlFor=''>Peso:</label>
            <input value={itemWeight} type="number" onChange={(e) => setItemWeight(e.target.value)} />
            <label htmlFor=''>Valor:</label>
            <input value={itemValue} type="number" onChange={(e) => setItemValue(e.target.value)} />
            <Style.CreateButton
              onClick={createItem}
              style={{ marginTop: '1rem' }}
              disabled={!itemName || !itemWeight || !itemValue}
            >
              Criar
            </Style.CreateButton>
          </div>
        </Style.ItemsSection>
      </div>
      <div>
        <Style.SectionName>Grafo:</Style.SectionName>
        <Style.GraphSection>
          {graph.size ? (
            <table>
              <thead>
                <tr>
                  <td style={{ width: '20%' }}>Identificador</td>
                  <td style={{ width: '40%' }}>Conexões</td>
                  <td style={{ width: '40%' }}>Itens</td>
                </tr>
              </thead>
              <tbody>
                {Array.from(graph.entries()).map(([key, value]) => ({ key, value })).map((item, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{item.key}</td>
                      {/* VERTEX */}
                      <td>
                        <Style.VertexSelect value={selectedVertex} onChange={(e) => setSelectedVertex(e.target.value)}>
                          <option value=""></option>
                          {Array.from(graph.entries())
                            .map(([key, value]) => ({ key, value }))
                            .filter(it => it.key !== item.key && !item.value.caminhos.includes(it.key))
                            .map((item, idx) => {
                              return <option key={idx} value={item.key}>{item.key}</option>;
                            })}
                        </Style.VertexSelect>
                        <Style.ConfirmButton onClick={() => addConection(item.key)} disabled={!selectedVertex}>+</Style.ConfirmButton>
                      </td>
                      {/* ITEM */}
                      <td>
                        <Style.VertexSelect value={selectedItem} onChange={(e) => setSelectedItem(e.target.value)}>
                          <option value=""></option>
                          {Array.from(itensList.entries())
                            .map(([key, value]) => ({ key, value }))
                            .map((item, idx) => {
                              return <option key={idx} value={item.key}>{item.value.name}</option>;
                            })}
                        </Style.VertexSelect>
                        <Style.ConfirmButton onClick={() => addItem(item.key)} disabled={!selectedItem}>+</Style.ConfirmButton>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          ) : (
            <h4>Nenhum vertice cadastrado</h4>
          )}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor=''>Identificador:</label>
            <input value={vertexName} onChange={(e) => setVertexName(e.target.value.toUpperCase())} type="text" />
            <Style.CreateButton
              onClick={createVertex}
              disabled={!vertexName}
            >
              Criar
            </Style.CreateButton>
          </div>
        </Style.GraphSection>

      </div>

      {(!bestPath || !minimumPaths) ? (
        <Style.CalculateButton onClick={getMinimumPaths}>Calcular melhor caminho</Style.CalculateButton>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <h3>Menores caminhos de {from} até {to}</h3>
            {minimumPaths.map((path, idx) => {
              return <h5 key={idx}>{path.map((a) => a.vertice).join(' -> ')}</h5>
            })}
          </div>
          <div>
            <h3>Melhor caminho geral</h3>
            <h5>{bestPath.route.map(it => it.vertice).join(' -> ')}</h5>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3 style={{ maxWidth: '40%' }}>Com esse caminho é possivel obter um total de {bestPath.result[0]} pontos de raridade.</h3>
              <table>
                <thead>
                  <tr>
                    <td>Nome</td>
                    <td>Peso</td>
                    <td>Raridade</td>
                  </tr>
                </thead>
                <tbody>
                  {bestPath.result[1].map((item, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{item.name}</td>
                        <td>{item.weight}</td>
                        <td>{item.value}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
      }
    </Style.Container >
  );
}

export default App;

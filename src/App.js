import { Box } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

function App() {
  const [formData, setFormData] = useState({ nome: '', mesa: '', codigoMusica: '' });
  const [listaEspera, setListaEspera] = useState([]);
  const [selecionado, setSelecionado] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Faça uma solicitação POST para o endpoint "/lista" com formData
    // Use fetch ou uma biblioteca como Axios
    const response = await fetch('https://warm-sands-33423-56316c27dc95.herokuapp.com/lista', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Atualize a lista de espera após a adição
    if (response.status === 201) {
      setListaEspera([...listaEspera, formData]);
    }

    setFormData({ nome: '', mesa: '', codigoMusica: '' })
  };

  const handleItemClick = (item) => {
    // Manipulador de eventos para selecionar um item da lista
    setSelecionado(item);
  };

  const handleExcluir = async () => {
    if (selecionado) {

      const response = await fetch(`https://warm-sands-33423-56316c27dc95.herokuapp.com/lista/${selecionado.nome}`, {
        method: 'DELETE',
      });
      // Faça uma solicitação DELETE para o endpoint `/lista/${selecionado.nome}`
      // Use fetch ou uma biblioteca como Axios

      // Atualize a lista de espera após a exclusão
      setListaEspera(listaEspera.filter((item) => item !== selecionado));
    }
  };

  useEffect(() => {
    // Faça uma solicitação GET para o endpoint "/lista" para buscar a lista de espera
    // Use fetch ou uma biblioteca como Axios
    const fetchData = async () => {
      const response = await fetch('https://warm-sands-33423-56316c27dc95.herokuapp.com/lista');
      if (response.status === 200) {
        const data = await response.json();
        setListaEspera(data);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <Box w="100%" p={4} color="black" align="center">
        <header>
          <h1>{listaEspera.length > 0 ? listaEspera[0].nome + " Mesa:" + listaEspera[0].mesa : "Nome do Karaoke"}</h1>
        </header>
      </Box>
      <div className="main-content">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          />
          <br/>
          <input
            type="text"
            placeholder="Mesa"
            value={formData.mesa}
            onChange={(e) => setFormData({ ...formData, mesa: e.target.value })}
          />
          <br/>
          <input
            type="text"
            placeholder="Código da Música"
            value={formData.codigoMusica}
            onChange={(e) => setFormData({ ...formData, codigoMusica: e.target.value })}
          />
          <br/>
          <button type="submit">Adicionar</button>
        </form>
      </div>

      <div>
        <ul>
          {listaEspera.map((item) => (
            <li
              key={item.nome}
              onClick={() => handleItemClick(item)} // Adicione o manipulador de eventos de clique
              style={{ cursor: 'pointer', backgroundColor: selecionado === item ? 'lightgray' : 'white' }} // Estilos para indicar seleção
            >
              {item.nome}, Mesa {item.mesa}, Código de Música {item.codigoMusica}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <button onClick={handleExcluir}>Excluir</button>
      </div>
    </div>
  );
}

export default App;

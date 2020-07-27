import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api
      .get("/repositories")
      .then((response) => setRepositories([...response.data]));
  }, []);
  
  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      title: `New Repository ${Date.now()}`,
      url: "https://github.com/Fenrir-GoStack/GoStack",
      techs: ["React.js"],
    });
    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

  const newListRepo = repositories.filter(repository => repository.id !== id)

    setRepositories([...newListRepo]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            <div>
              <h3>{repository.title}</h3>
              <h3>{repository.url}</h3>
            </div>

            <div>
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

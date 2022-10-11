import './App.css';
import gitHub from './db';
import { useEffect, useState, useCallback } from 'react';
import gitHubQuery from './query';
import RepoInfo from './RepoInfo';

function App() {
  const [userName, setUserName] = useState('');
  const [repoList, setRepoList] = useState([]);

  const fetchGithubUsers = useCallback(() => {
    fetch(gitHub.baseURL, {
      method: "POST",
      headers: gitHub.headers,
      body: JSON.stringify(gitHubQuery)
    })
      .then(data => data.json())
      .then(data => {
        const githubData = data.data;
        setUserName(githubData.viewer.name);
        setRepoList(githubData.search.nodes);
        console.log(data);
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    fetchGithubUsers();
  }, [fetchGithubUsers])

  return (
    <div className="App container mt-5">
      <h1 className="text-primary">
        <i className="bi bi-diagram-2-fill"></i> Repos
      </h1>
      <p>User Name : {userName}</p>
      {
        repoList.length && <ul className='list-group list-group-flush'>
          {
            repoList.map(repo => (
              <RepoInfo key={repo.id} repo={repo} />
            ))
          }
        </ul>
      }
    </div>
  );
}

export default App;

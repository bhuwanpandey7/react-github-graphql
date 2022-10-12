import './App.css';
import gitHub from './db';
import { useEffect, useState, useCallback } from 'react';
import gitHubQuery from './query';
import RepoInfo from './RepoInfo';
import SearchBox from './SearchBox';

function App() {
  const [userName, setUserName] = useState('');
  const [repoList, setRepoList] = useState([]);
  const [pageCount, setPageCount] = useState(20);
  const [queryString, setQueryString] = useState('');
  const [totalCount, setTotalCount] = useState(0);


  const fetchGithubUsers = useCallback(() => {

    const queryText = JSON.stringify(gitHubQuery(pageCount, queryString));

    fetch(gitHub.baseURL, {
      method: "POST",
      headers: gitHub.headers,
      body: queryText
    })
      .then(data => data.json())
      .then(data => {
        const githubData = data.data;
        const totalRepoCount = githubData.search.repositoryCount;
        setUserName(githubData.viewer.name);
        setRepoList(githubData.search.nodes);
        setTotalCount(totalRepoCount);
        console.log(data, totalRepoCount);
      })
      .catch(err => console.log(err))
  }, [pageCount, queryString])

  useEffect(() => {
    fetchGithubUsers();
  }, [fetchGithubUsers])

  return (
    <div className="App container mt-5">
      <h1 className="text-primary">
        <i className="bi bi-diagram-2-fill"></i> Repos
      </h1>
      <p>User Name : {userName}</p>
      <div>
        <SearchBox
          totalCount={totalCount}
          pageCount={pageCount}
          queryString={queryString}
          onQueryChange={(newQueryString) => { setQueryString(newQueryString) }}
          onTotalChange={(newTotal) => { setPageCount(newTotal) }}
        />
      </div>
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

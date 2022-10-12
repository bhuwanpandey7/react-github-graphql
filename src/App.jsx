import './App.css';
import gitHub from './db';
import { useEffect, useState, useCallback } from 'react';
import gitHubQuery from './query';
import RepoInfo from './RepoInfo';
import SearchBox from './SearchBox';
import NavButtons from './NavButtons';

function App() {
  const [userName, setUserName] = useState('');
  const [repoList, setRepoList] = useState([]);
  const [pageCount, setPageCount] = useState(5);
  const [queryString, setQueryString] = useState('');
  const [totalCount, setTotalCount] = useState(0);

  const [startCursor, setStartCursor] = useState(null);
  const [endCursor, setEndCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [paginationKeyword, setPaginationKeyword] = useState("first");
  const [paginationString, setPaginationString] = useState("");


  const fetchGithubUsers = useCallback(() => {

    const queryText = JSON.stringify(gitHubQuery(pageCount, queryString, paginationKeyword, paginationString));

    fetch(gitHub.baseURL, {
      method: "POST",
      headers: gitHub.headers,
      body: queryText
    })
      .then(data => data.json())
      .then(data => {
        const githubData = data.data;
        const totalRepoCount = githubData.search.repositoryCount;
        const start = githubData.search.pageInfo?.startCursor;
        const end = githubData.search.pageInfo?.endCursor;
        const hasNextPage = githubData.search.pageInfo?.hasNextPage;
        const hasPreviousPage = githubData.search.pageInfo?.hasPreviousPage;

        setStartCursor(start);
        setEndCursor(end);
        setHasNextPage(hasNextPage);
        setHasPreviousPage(hasPreviousPage);

        setUserName(githubData.viewer.name);
        setRepoList(githubData.search.edges);
        setTotalCount(totalRepoCount);
        console.log(queryText);
      })
      .catch(err => console.log(err))
  }, [pageCount, queryString, paginationKeyword, paginationString])

  useEffect(() => {
    fetchGithubUsers();
  }, [fetchGithubUsers])

  return (
    <div className="App container mt-5">
      <h1 className="text-primary">
        <i className="bi bi-diagram-2-fill"></i> Repos
      </h1>
      <p>User Name : {userName}</p>
      <SearchBox
        totalCount={totalCount}
        pageCount={pageCount}
        queryString={queryString}
        onQueryChange={(newQueryString) => { setQueryString(newQueryString) }}
        onTotalChange={(newTotal) => { setPageCount(newTotal) }}
      />
      <NavButtons
        start={startCursor}
        end={endCursor}
        next={hasNextPage}
        previous={hasPreviousPage}
        onPage={(keyword, string) => {
          setPaginationKeyword(keyword);
          setPaginationString(string);
        }}
      />
      {
        repoList.length && <ul className='list-group list-group-flush'>
          {
            repoList.map(repo => (
              <RepoInfo key={repo.node.id} repo={repo.node} />
            ))
          }
        </ul>
      }
    </div>
  );
}

export default App;

const gitHubQuery = (pageCount, queryString) => {
  return {
    query: `
    {
            viewer {
              name
            }
            search(query: "${queryString}user:bhuwanpandey7 sort:updated-desc", type: REPOSITORY, first: ${pageCount}) {
              repositoryCount
              nodes {
                ... on Repository {
                  id
                  name
                  description
                  url
                  viewerSubscription
                  licenseInfo {
                    spdxId
                  }
                }
              }
            }
    }
    `
  }
}


export default gitHubQuery;
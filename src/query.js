const gitHubQuery = (pageCount, queryString, paginationKeyword, paginationString) => {
  return {
    query: `
    {
            viewer {
              name
            }
            search(query: "${queryString}user:bhuwanpandey7 sort:updated-desc", type: REPOSITORY, ${paginationKeyword}: ${pageCount}, ${paginationString}) {
              repositoryCount
              edges {
                cursor
                node {
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
              pageInfo {
                startCursor
                endCursor
                hasNextPage
                hasPreviousPage
              }
            }
    }
    `
  }
}


export default gitHubQuery;
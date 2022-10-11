const gitHubQuery = {
    query: `
    {
            viewer {
              name
            }
            search(query: "user:bhuwanpandey7 sort:updated-desc", type: REPOSITORY, first: 20) {
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


export default gitHubQuery;
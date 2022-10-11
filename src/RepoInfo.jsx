import React from "react";

function RepoInfo(props) {
    const repo = props.repo;
    let license;
    switch (repo.licenseInfo?.spdxId) {
        case undefined | null | "NOASSERTION":
            license = <span
                className="px-1 py-0 ms-1d-inline-block btn btn-sm btn-danger"
                style={{ fontSize: "0.6em" }}
            >No License</span>
            break;
        default:
            license = <span
                className="px-1 py-0 ms-1d-inline-block btn btn-sm btn-outline-success"
                style={{ fontSize: "0.6em" }}
            >{repo.licenseInfo?.spdxId}</span>
            break;
    }

    return (
        <li className='list-group-item' style={{ backgroundColor: "whitesmoke", borderRadius: "0.2em" }} key={repo.id}>
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column">
                    <a target="_blank" rel="noopener noreferrer" className='d-flex text-start h5 mb-1 text-decoration-none' href={repo.url}>
                        {repo.name}
                    </a>
                    <p className='small'>{repo.description}</p>
                </div>
                <div className="text-nowrap ms-3">
                    {license && <span className="px-1 py-0 ms-1d-inline-block btn btn-sm btn-outline-danger small">No License</span>}
                    <span className={
                        "px-1 py-1 ms-1 d-inline-block btn btn-sm " +
                        (
                            repo.viewerSubscription === "SUBSCRIBED" ?
                                "btn-success" :
                                "btn-outline-secondary"
                        )
                    }
                        style={{ fontSize: "0.6em" }}>
                        {repo.viewerSubscription}
                    </span>
                </div>
            </div>
        </li>
    );
}

export default RepoInfo;

export const fetchFromEndpoint = async (endpoint) => {
    const data = await fetch(endpoint)

    if (!data.ok) {
        throw Error(`Error during fetching data from ${endpoint}`)
    }

    return data.json()
}

export const fetchFromEndpointID = async (endpoint, ID) => {
    const data = await fetch(`${endpoint}${ID}`)

    if (!data.ok) {
        throw Error(`Error during fetching data from ${endpoint}`)
    }

    return data.json()
}


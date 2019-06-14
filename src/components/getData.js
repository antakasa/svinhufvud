const appUrl = "http://svinhufvudinmuistosäätiö.fi/wp-json/wp/v2/";

const getPosts = `${appUrl}posts`;

const timelineData = `http://www.svinhufvudinmuistosaatio.fi/wp-json/acf/v3/pages`;

const fetchData = (callback) => {
    return fetch(timelineData)
        .then(data => data.json())
        .then(data => {
            return Promise.resolve(data)
        })
}

export { appUrl, getPosts, fetchData }

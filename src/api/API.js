import axios from 'axios'

const fetch = async (url, options = {
    method: 'GET',
    body: {}
}) => {
    const request = {
        baseURL: 'https://search.bossjob.com/api/v1/',
        method: options.method,
        timeout: 500000,
        url,
        headers: options.head
    };
    if (request.method === 'POST') request.data = options.body;
    const res = await axios(request);
    if (res.status === 200) {
        return res.data
    } else {
        throw res
    }
};

export default {
    //  SEARCH
    searchJobCompany: (size, query, page) => {
        return fetch('search/job_filter?size='+ size +'&query='+ query +'&page='+ page, {
            method: 'GET',
            head: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
    },
}

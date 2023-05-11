
export enum FetchAPIRequest {
    GET= "GET",
    POST= "POST",
}

export default async function fetchAPI<T>(url:string, method:FetchAPIRequest, body?:any): Promise<T> {

    if(FetchAPIRequest[method]) {
        const server = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : process.env.SERVER_URL;

        return await fetch(`${server}/${url}`, {
            body: body,
            method: method,
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(() => {
                    throw new Error('Failed to make a request to API: ' + url);
                })
            }
            return response.json() as Promise<T>
        })
        .then((data) => {
            return data
        })
        .catch((error: Error) => {
            throw error
        })
    }
    else {
        throw new Error("fetchAPI post method is not valid");
    }

}
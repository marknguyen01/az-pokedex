
export enum FetchAPIRequest {
    GET= "GET",
    POST= "POST",
}

export default async function fetchAPI<T = any>(url:string, method:FetchAPIRequest, body?:any): Promise<T> {

    if(FetchAPIRequest[method]) {
        const server = (!process.env.SERVER_URL || process.env.NODE_ENV !== 'production') ? 'http://localhost:3000' : process.env.SERVER_URL;

        const res = await fetch(`${server}/${url}`, {
            body: body,
            method: method,
        });

        if(!res.ok) {
            throw new Error('Failed to make a request to API: ' + url);
        }

        return res.json() as Promise<T>;
    }
    else {
        throw new Error("fetchAPI post method is not valid");
    }

}
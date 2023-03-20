// General
export const badRequest: Status = {
    status: 400,
    headers: {
        "Content-Type" : "application/json"
    }
}

export const creationSuccess: Status = {
    status: 201,
    headers: {
        "Content-Type" : "application/json"
    }
}

export const fetchFail: Status = {
    status: 500,
    headers: {
        "Content-Type" : "application/json"
    }
}

export const notFoundRequest: Status = {
    status: 404,
    headers: {
        "Content-Type" : "application/json"
    }
}

export const responseSuccess: Status = {
    status: 200,
    headers: {
        "Content-Type" : "application/json"
    }
}

export function failedResponse(err: Error, statusObj: Status): Response{
    return new Response(JSON.stringify(`Error: ${err.message}`), statusObj)
}

export class NotFound extends Error {
    constructor(message: string){
        super(message)
        this.name = this.constructor.name
    }
}
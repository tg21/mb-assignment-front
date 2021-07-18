export type signInRequestModel = {
    email : String,
    password: String,
}

export type signInResponseModel = {
    authenticated: boolean,
    firstName : String  | undefined | null,
    lastName: String  | undefined | null,
    details: any | undefined | null,
}

export type crudResponse = {
    response: boolean,
    details: string,
}
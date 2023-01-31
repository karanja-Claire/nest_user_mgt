export interface RegisterResponse{
    username:string;
    email:string;
    first_name:string;
    last_name:string;
    address:string;
    phone_no:string;
}

export interface loginResponse{
    accessToken:string;
}
export interface updateUser{
    username:string;
    phone_no:string;
}
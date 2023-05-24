export interface User {
    email:string;
    password:string;
    firstName:string;
    lastName:string;
    rol:'admin'|'user';
    userId:string;
    
}

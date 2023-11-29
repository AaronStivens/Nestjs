//NODEJS.processEnv

declare namespace Nodejs{
    interface processEnv{
       
        PORT:number;
        DB_HOST:string;
        DB_PORT:number;
        DB_USER:string;
        DB_PASSWORD:string;
        DB_NAME:string;
        HASH_SALT:Number;
        JWT_SECRET:string;
    }
}
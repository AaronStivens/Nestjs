import {PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";

export abstract class BaseEntity{

    @PrimaryGeneratedColumn(`uuid`)//Se genera un valor unico
    id:string;

    @CreateDateColumn({type:"timestamp",name: "created:_at"}) //Fecha y hora que se creo
    createdAt:Date;

    @UpdateDateColumn({type:"timestamp",name: "updated:_at"})//Fehc y hora que se actualizo
    updatedAt:Date;
}
import {PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";

export abstract class BaseEntity{

    @PrimaryGeneratedColumn(`uuid`)
    id:string;

    @CreateDateColumn({type:"timestamp",name: "created:_at"})
    createdAt:Date;

    @UpdateDateColumn({type:"timestamp",name: "updated:_at"})
    updatedAt:Date;
}
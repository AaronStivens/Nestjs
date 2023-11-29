import { IProject } from "../../interfaces/project.interface";
import { IUser } from "../../interfaces/user.interface";
import { UsersProjecEntity } from "../../users/entity/usersproject.entity";
import {BaseEntity,PrimaryColumn,Column,Entity,OneToMany} from "typeorm";

@Entity({name:"projects"})
export class Projectentity extends BaseEntity implements IProject {

    @PrimaryColumn()
    nombre: string;
    
    @Column()
    descripcion: string;
    
    @OneToMany(()=>UsersProjecEntity,(usersProjects)=>usersProjects.project)
    userInclude:UsersProjecEntity[]
}
import { BaseEntity } from "../../config/base.entity";
import { ACCESS_LEVEL } from "../../constants/roles";
import {Column, Entity,ManyToOne} from "typeorm";
import { UsersEntity } from "./users.entity";
import { Projectentity } from "../../projects/entity/projects.entity";


@Entity({name:"users_projects"})
export class UsersProjecEntity extends BaseEntity{

    @Column({type:`enum`, enum:ACCESS_LEVEL})
    accessLevel:ACCESS_LEVEL

    @ManyToOne(()=>UsersEntity, (user)=>user.projectsInclude)
    user:UsersEntity

    @ManyToOne(()=>Projectentity, (projects)=>projects.userInclude)
    project:Projectentity
}


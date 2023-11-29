import { MigrationInterface, QueryRunner } from "typeorm";

export class Primeramigracion1700686488614 implements MigrationInterface {
    name = 'Primeramigracion1700686488614'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP FOREIGN KEY \`FK_c28f58af52ab259367bc1ed35a2\``);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(255) NOT NULL, \`apellido\` varchar(255) NOT NULL, \`edad\` int NOT NULL, \`email\` varchar(255) NOT NULL, \`usuario\` varchar(255) NOT NULL, \`contraseña\` varchar(255) NOT NULL, \`rol\` enum ('BASIC', 'ADMIN') NOT NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_f06f84f3f2bc0696d00882fcfa\` (\`usuario\`), PRIMARY KEY (\`id\`, \`nombre\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP FOREIGN KEY \`FK_2f664c8e3bfbbe619173f1c625b\``);
        await queryRunner.query(`ALTER TABLE \`users_projects\` CHANGE \`user_nombre\` \`user_nombre\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` CHANGE \`project_nombre\` \`project_nombre\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD CONSTRAINT \`FK_1bd25a5e64fbfc81c23f5fcff07\` FOREIGN KEY (\`user_id\`, \`user_nombre\`) REFERENCES \`users\`(\`id\`,\`nombre\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD CONSTRAINT \`FK_2f664c8e3bfbbe619173f1c625b\` FOREIGN KEY (\`project_nombre\`) REFERENCES \`projects\`(\`nombre\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP FOREIGN KEY \`FK_2f664c8e3bfbbe619173f1c625b\``);
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP FOREIGN KEY \`FK_1bd25a5e64fbfc81c23f5fcff07\``);
        await queryRunner.query(`ALTER TABLE \`users_projects\` CHANGE \`project_nombre\` \`project_nombre\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` CHANGE \`user_nombre\` \`user_nombre\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD CONSTRAINT \`FK_2f664c8e3bfbbe619173f1c625b\` FOREIGN KEY (\`project_nombre\`) REFERENCES \`projects\`(\`nombre\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`DROP INDEX \`IDX_f06f84f3f2bc0696d00882fcfa\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD CONSTRAINT \`FK_c28f58af52ab259367bc1ed35a2\` FOREIGN KEY (\`user_nombre\`) REFERENCES \`users\`(\`nombre\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

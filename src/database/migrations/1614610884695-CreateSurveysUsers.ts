import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSurveysUsers1614610884695 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "surveys_users",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true
                    },
                    {
                        name: "user_id",
                        type: "varchar"
                    },
                    {
                        name: "survey_id",
                        type: "varchar"
                    },
                    {
                        name: "value",
                        type: "int",
                        isNullable: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "NOW()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "NOW()",
                    },
                ],
                foreignKeys: [
                    {
                        name: "FK_user_id",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    },
                    {
                        name: "FK_survey_id",
                        referencedTableName: "surveys",
                        referencedColumnNames: ["id"],
                        columnNames: ["survey_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    },

                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("surveys_users")
    }

}

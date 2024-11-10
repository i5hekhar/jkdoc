import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';

@Table({ tableName: 'roles' })
export class Role extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.TEXT)
    public id!: number; // (PK)

    @Column(DataType.TEXT)
    public name: string;

    @Column(DataType.TEXT)
    public code: string;

    @Column(DataType.BOOLEAN)
    public isAllow: boolean;

}

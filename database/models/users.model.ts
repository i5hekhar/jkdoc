import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';
// import { Role } from './role.model';

@Table({ tableName: 'users' })
export class User extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column
    public id!: number; // (PK)

    @Column(DataType.TEXT)
    public username: string;

    @Column(DataType.TEXT)
    public name: string;

    @Column(DataType.TEXT)
    public email: string;

    @Column(DataType.TEXT)
    public phone: string;

    @Column(DataType.TEXT)
    public password: string;

    @Column(DataType.TEXT)
    public status: string;

    // @ForeignKey(() => Role) // FK
    @Column(DataType.TEXT)
    public roleId: number;
    // @BelongsTo(() => Role, 'roleId')
    // role: Role;

}
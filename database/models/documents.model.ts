import { Table, Column, Model, PrimaryKey, AutoIncrement, Default, ForeignKey, DataType, BelongsTo } from 'sequelize-typescript';

@Table({ tableName: 'documents' })
export class Document extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column
    public id!: number; // (PK)

    @Column(DataType.TEXT)
    public title: string;

    @Column(DataType.TEXT)
    public path: string;

    @Column(DataType.TEXT)
    public content: string;

    @Column(DataType.TEXT)
    public author: string;

    @Column(DataType.TEXT)
    public category: string;

}
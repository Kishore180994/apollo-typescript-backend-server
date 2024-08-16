import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Embedding {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column("text")
  text: string | undefined;

  @Column("float", { array: true })
  vector: number[] | undefined;
}

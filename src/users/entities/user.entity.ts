import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import userRoleEnum from '../enums/userRoleEnum';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  mobile: string;

  @Column({ nullable: false })
  display_name: string;

  @Column({ nullable: true })
  password: string;

  @Column({
    type: 'enum',
    enum: userRoleEnum,
    default: userRoleEnum.NoramlUser,
  })
  role: userRoleEnum;

  @Column()
  creaditAt: Date;

  @Column()
  updateAt: Date;
}

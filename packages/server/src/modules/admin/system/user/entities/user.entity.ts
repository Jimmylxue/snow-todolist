import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user', { schema: 'snow-server' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'username', length: 45 })
  username: string;

  @Column('varchar', { name: 'avatar', length: 200 })
  avatar: string;

  @Column('int', { name: 'sex', nullable: true })
  sex: number | null;

  @Column('varchar', { name: 'phone', length: 45 })
  phone: string;

  @Column('varchar', { name: 'createTime', length: 45 })
  createTime: string;

  @Column('varchar', {
    name: 'password',
    length: 200,
    default: () => "'111111'",
  })
  password: string;
}

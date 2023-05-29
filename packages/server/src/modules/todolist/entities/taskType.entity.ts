import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('taskType', { schema: 'snow-server' })
export class TaskType {
  @PrimaryGeneratedColumn({ type: 'int', name: 'typeId' })
  typeId: number;

  @Column('int', { name: 'userId' })
  userId: number;

  @Column('varchar', { name: 'typeName', length: 45 })
  typeName: string;

  @Column('text', { name: 'desc' })
  desc: string;

  @Column('varchar', { name: 'createTime', length: 45 })
  createTime: string;

  @Column('varchar', { name: 'updateTime', length: 45 })
  updateTime: string;
}

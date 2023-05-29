import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('task', { schema: 'snow-server' })
export class Task {
  @PrimaryGeneratedColumn({ type: 'int', name: 'taskId' })
  taskId: number;

  @Column('int', { name: 'typeId' })
  typeId: number;

  @Column('int', { name: 'userId' })
  userId: number;

  @Column('int', { name: 'status' })
  status: number;

  @Column('varchar', { name: 'taskName', length: 45 })
  taskName: string;

  @Column('text', { name: 'taskContent' })
  taskContent: string;

  @Column('varchar', { name: 'createTime', length: 45 })
  createTime: string;

  @Column('varchar', { name: 'completeTime', length: 45 })
  completeTime: string;

  @Column('varchar', { name: 'updateTime', length: 45 })
  updateTime: string;
}

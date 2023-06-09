import { TaskItem } from '@/api/todolist/task/type';
import {
  DeleteOutlined,
  QuestionCircleOutlined,
  CarryOutOutlined,
  ProjectOutlined,
} from '@ant-design/icons';
import { getDayCountByTimeStamp } from '../SliderBar/core';
import { Tooltip } from 'antd';
import dayjs from 'dayjs';

enum TaskCompleteEnum {
  '未设置时间&未完成',
  '未设置时间&已完成',
  '已设置时间&未完成&未超时',
  '已设置时间&未完成&已超时',
  '已设置时间&已完成&已超时',
  '已设置时间&已完成&未超时',
}

export function getTaskCompleteMsg(task: TaskItem) {
  const { completeTime, status, expectTime } = task;
  const hasOverTime = +completeTime > +expectTime! || 0;
  if (!expectTime && !status) {
    return TaskCompleteEnum['未设置时间&未完成'];
  }
  if (!expectTime && status) {
    return TaskCompleteEnum['未设置时间&已完成'];
  }
  if (expectTime && !status && hasOverTime) {
    return TaskCompleteEnum['已设置时间&未完成&已超时'];
  }
  if (expectTime && !status && !hasOverTime) {
    return TaskCompleteEnum['已设置时间&未完成&未超时'];
  }
  if (expectTime && status && hasOverTime) {
    return TaskCompleteEnum['已设置时间&已完成&已超时'];
  }
  if (expectTime && status && !hasOverTime) {
    return TaskCompleteEnum['已设置时间&已完成&未超时'];
  }
}

export function getExpectNodeByTaskEnum(
  status: TaskCompleteEnum,
  task: TaskItem,
) {
  const { expectTime, completeTime } = task;
  switch (status) {
    case TaskCompleteEnum['未设置时间&未完成']:
      return (
        <Tooltip title={<span>点击任务名称可编辑完成时间</span>}>
          <div>
            <ProjectOutlined className='mr-1' /> 未设置具体时间
          </div>
        </Tooltip>
      );
    case TaskCompleteEnum['未设置时间&已完成']:
      return (
        <Tooltip
          title={
            <span>
              任务完成于：
              {dayjs(+completeTime).format('YYYY-MM-DD - h:mm:ss')}
            </span>
          }>
          <div>
            <ProjectOutlined className='mr-1' /> -
          </div>
        </Tooltip>
      );
    case TaskCompleteEnum['已设置时间&未完成&未超时']:
      return (
        <Tooltip
          title={
            <span>
              任务完成目标：
              {dayjs(+expectTime!).format('YYYY-MM-DD')}
            </span>
          }>
          <div>
            <ProjectOutlined className='mr-1' />
            剩余{getDayCountByTimeStamp(+expectTime!, Date.now())}天
          </div>
        </Tooltip>
      );
    case TaskCompleteEnum['已设置时间&未完成&已超时']:
      return (
        <Tooltip
          title={
            <span>
              任务完成目标：
              {dayjs(+expectTime!).format('YYYY-MM-DD - h:mm:ss')}
            </span>
          }>
          <div>
            <ProjectOutlined className='mr-1' />
            当前已超时{getDayCountByTimeStamp(Date.now(), +expectTime!)}天
          </div>
        </Tooltip>
      );
    case TaskCompleteEnum['已设置时间&已完成&已超时']:
      return (
        <Tooltip
          title={
            <span>
              任务完成于：
              {dayjs(+completeTime).format('YYYY-MM-DD - h:mm:ss')}
            </span>
          }>
          <div>
            <ProjectOutlined className='mr-1' />
            任务已超时{getDayCountByTimeStamp(+completeTime!, +expectTime!)}天
          </div>
        </Tooltip>
      );
    case TaskCompleteEnum['已设置时间&已完成&未超时']:
      return (
        <Tooltip
          title={
            <span>
              任务完成于：
              {dayjs(+completeTime).format('YYYY-MM-DD - h:mm:ss')}
            </span>
          }>
          <div>
            <ProjectOutlined className='mr-1' />
            提前{getDayCountByTimeStamp(+expectTime!, +completeTime!)}天
          </div>
        </Tooltip>
      );
  }
}

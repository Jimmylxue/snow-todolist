import { TaskItem } from '@/api/todolist/task/type';
import { Progress } from 'antd';
import dayjs from 'dayjs';
import './style.less';

type TProps = {
  position: 'left' | 'right';
  taskData: TaskItem[];
};

function getStats(tasks: TaskItem[]) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 1).length;
  const incomplete = total - completed;
  const rate = total ? Math.round((completed / total) * 100) : 0;
  const isToday = (ts: string) => dayjs(+ts).isSame(dayjs(), 'day');
  const todayTotal = tasks.filter((t) => isToday(t.createTime)).length;
  const todayCompleted = tasks.filter(
    (t) => isToday(t.createTime) && t.status === 1,
  ).length;
  return {
    total,
    completed,
    incomplete,
    rate,
    todayTotal,
    todayCompleted,
  };
}

export function SideDecor({ position, taskData }: TProps) {
  const stats = getStats(taskData);

  if (position === 'left') {
    return (
      <div className='snow-side-decor'>
        <div className='snow-side-card snow-side-gradient'>
          <div className='flex items-center justify-between mb-2'>
            <div className='snow-side-title'>每日灵感</div>
            <div className='text-xl'>💡</div>
          </div>
          <div className='snow-side-desc text-sm italic opacity-80'>
            “种一棵树最好的时间是十年前，其次是现在。”
          </div>
          <div className='snow-divider my-3 opacity-20'></div>
          <div className='snow-side-tags'>
            <div className='snow-kbd-hint'>
              <span className='kbd'>⌘ K</span> 搜索
            </div>
            <div className='snow-kbd-hint'>
              <span className='kbd'>Esc</span> 关闭
            </div>
          </div>
        </div>
        <div className='snow-side-card'>
          <div className='snow-side-title'>今日</div>
          <div className='snow-side-metrics'>
            <div className='snow-side-metric'>
              <div className='snow-side-metric-key'>新增</div>
              <div className='snow-side-metric-val'>{stats.todayTotal}</div>
            </div>
            <div className='snow-side-metric'>
              <div className='snow-side-metric-key'>完成</div>
              <div className='snow-side-metric-val'>{stats.todayCompleted}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='snow-side-decor'>
      <div className='snow-side-card'>
        <div className='snow-side-title'>统计概览</div>
        <div className='snow-side-progress'>
          <Progress
            type='circle'
            percent={stats.rate}
            width={80}
            strokeColor={{ from: '#DB4C3F', to: '#e58938' }}
          />
          <div className='snow-side-progress-text'>
            完成率
            <div className='snow-side-progress-sub'>
              {stats.completed}/{stats.total}
            </div>
          </div>
        </div>
        <div className='snow-side-metrics'>
          <div className='snow-side-metric'>
            <div className='snow-side-metric-key'>未完成</div>
            <div className='snow-side-metric-val'>{stats.incomplete}</div>
          </div>
          <div className='snow-side-metric'>
            <div className='snow-side-metric-key'>总计</div>
            <div className='snow-side-metric-val'>{stats.total}</div>
          </div>
        </div>
      </div>
      <div className='snow-side-card snow-side-tip'>
        <div className='snow-side-title'>提示</div>
        <div className='snow-side-desc'>保持专注，一次只做一件事</div>
      </div>
    </div>
  );
}

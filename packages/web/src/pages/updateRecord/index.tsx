import { Divider } from 'antd';
import { useUpdateMessage } from './core/useRecord';
import classNames from 'classnames';

export function UpdateRecord() {
  const { changeLog } = useUpdateMessage();
  console.log('aaaaaaaaaaaaa', Object.entries(changeLog));
  return (
    <div
      className=' overflow-auto'
      style={{
        height: 'calc(100vh - 50px)',
      }}>
      <div className=' mx-auto' style={{ width: 800 }}>
        <img
          className=' w-full rounded-md mt-4'
          src='https://image.jimmyxuexue.top/img/202308192008619.png'
          alt=''
        />
        <div className=' text-2xl font-semibold mt-4 mb-2'>更新日志</div>
        <div>
          {Object.entries(changeLog).map((item, index) => (
            <div key={index}>
              <div className=' text-lg font-semibold'>{item?.[0]}</div>
              {item[1].map((it, idx) => (
                <div key={idx} className=' flex items-center ml-6 mt-2'>
                  <div
                    className={classNames(' w-2 h-2  rounded-full', {
                      'bg-green-500': index === 0,
                      'bg-red-500': index === 1,
                      'bg-orange-500': index === 2,
                      ' bg-yellow-500': index === 3,
                    })}></div>
                  <div className=' ml-2 flex items-center'>
                    {it.commit.message}{' '}
                    <a href={it.html_url}>
                      （
                      {it.html_url.slice(
                        it.html_url.length - 6,
                        it.html_url.length,
                      )}
                      ）
                    </a>
                    <div className=' text-xs text-gray-400'>
                      {it.commit.author.date}
                    </div>
                  </div>
                </div>
              ))}
              <Divider />

              {/* <div className=' flex items-center ml-6 mt-2'>
                <div className=' w-2 h-2 bg-green-500 rounded-full'></div>
                <div className=' ml-2'>新增更新日志</div>
              </div> */}
            </div>
          ))}

          {/* <div className='mt-10'>
            <div className=' text-lg font-semibold'>💄 UI and style</div>
            <div className=' flex items-center ml-6 mt-2'>
              <div className=' w-2 h-2 bg-orange-400 rounded-full'></div>
              <div className=' ml-2'>设置模态框样式更新</div>
            </div>
          </div>
          <div className='mt-10'>
            <div className=' text-lg font-semibold'>🐛 Fix a bug</div>
            <div className=' flex items-center ml-6 mt-2'>
              <div className=' w-2 h-2 bg-red-400 rounded-full'></div>
              <div className=' ml-2'>完成任务后未及时更新内容</div>
            </div>
          </div>
          <Divider /> */}
        </div>
        {/* <div>
          <div className=' text-base text-gray-400'>2023-08-19</div>
          <div>
            <div className=' text-lg font-semibold'>✨ new features</div>
            <div className=' flex items-center ml-6 mt-2'>
              <div className=' w-2 h-2 bg-green-500 rounded-full'></div>
              <div className=' ml-2'>新增主题设置</div>
            </div>
            <div className=' flex items-center ml-6 mt-2'>
              <div className=' w-2 h-2 bg-green-500 rounded-full'></div>
              <div className=' ml-2'>新增更新日志</div>
            </div>
          </div>
          <div className='mt-10'>
            <div className=' text-lg font-semibold'>💄 UI and style</div>
            <div className=' flex items-center ml-6 mt-2'>
              <div className=' w-2 h-2 bg-orange-400 rounded-full'></div>
              <div className=' ml-2'>设置模态框样式更新</div>
            </div>
          </div>
          <div className='mt-10'>
            <div className=' text-lg font-semibold'>🐛 Fix a bug</div>
            <div className=' flex items-center ml-6 mt-2'>
              <div className=' w-2 h-2 bg-red-400 rounded-full'></div>
              <div className=' ml-2'>完成任务后未及时更新内容</div>
            </div>
          </div>
          <Divider />
        </div> */}
      </div>
    </div>
  );
}

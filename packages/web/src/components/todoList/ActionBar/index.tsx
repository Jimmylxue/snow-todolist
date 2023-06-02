import { GithubOutlined } from '@ant-design/icons';

export function ActionBar() {
  return (
    <div className='github absolute right-5 bottom-3'>
      <GithubOutlined
        className=' text-lg'
        onClick={() => {
          window.open(
            'https://github.com/Jimmylxue/snow-todolist',
            'snow-todoList',
          );
        }}
      />
    </div>
  );
}

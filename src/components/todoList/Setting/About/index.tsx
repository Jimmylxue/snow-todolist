import { QqOutlined, WechatOutlined } from '@ant-design/icons';

export function About() {
  return (
    <div>
      <h3>Hi, 感谢使用 Snow-TodoList!</h3>
      <div className=' text-gray-500'>
        使用中遇到任何问题，或者对我们有什么建议，你可以发送 反馈
        或者直接发送邮件到{' '}
        <a href='mailto:1002661758@qq.com'>1002661758@qq.com</a> 联系我。
      </div>

      <h4 className=' mt-3'>其他联系方式</h4>

      <div className=' text-gray-500'>
        <p>
          <QqOutlined /> 1002661758
        </p>
        <p>
          <WechatOutlined /> ysh15120
        </p>
      </div>
    </div>
  );
}

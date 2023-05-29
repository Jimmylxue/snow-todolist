import React from 'react';
import { render } from '@testing-library/react';
import Title from '../Title';

/**
 * toMatchSnapshot 首次会创建一个快照文件。 快照即是一个真正渲染时的一个DOM文件，
 *  使用快照的好处是，下次再执行测试用例的时候会不断的与这个测试快照进行对比， 以防止我们的组件不小心被我进行修改导致与最终的效果不一致的情况出现
 *  我们也可以使用  jest --updateSnapshot 来进行更新快照文件
 *
 *  Jest 的快照可不仅仅能记录 DOM 结构，还能记录 一切能被序列化 的内容，比如纯文本、JSON、XML 等等。
 */

describe('>>> Title', () => {
  it('可以正确渲染字体大字', () => {
    const { baseElement } = render(<Title type='large' title='大字'></Title>);
    expect(baseElement).toMatchSnapshot();
  });

  it('可以正确渲染字体小字', () => {
    const { baseElement } = render(<Title type='small' title='小字'></Title>);
    expect(baseElement).toMatchSnapshot();
  });
});

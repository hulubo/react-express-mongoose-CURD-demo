/**
 * Created by ocean on 18/3/1.
 */
import React from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import './style.css';

export default () => {
  return (
    <div className="navbar">
      <ul mode="horizontal" className="barstyle">
        <li className="logostyle" key="logo">
          <Icon className="Iconstyle" type="api" />
          <a rel="noopener noreferrer" target="_blank">react · 学习平台</a>
        </li>
        <li key="全部">
          <Link to="/all">全部</Link>
        </li>
        <li key="精华">
          <Link to="/good">精华</Link>
        </li>
        <li key="分享">
          <Link to="/share">分享</Link>
        </li>
        <li key="问答">
          <Link to="/ask">问答</Link>
        </li>
      </ul>
    </div>
  );
};

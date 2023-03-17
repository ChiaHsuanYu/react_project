import React from 'react';

// Component 用 import 或是直接寫在這邊都可以
const Home = () => (
  <label>Hello Home</label>
);

import About from './About';
import Game from './Game';

const routes = [
  {
    path: '/',
    title: '首頁',
    exact: true,
    component: <Home />
  },
  {
    path: '/about',
    title: '關於React',
    exact: true,
    component: <About />,
    // children: [
    //   {
    //     path: '/user/profile',
    //     title: '個人資訊',
    //     exact: true,
    //     component: profile
    //   }
    // ]
  },
  {
    path: '/game',
    title: '井字遊戲',
    exact: true,
    component: <Game />
  }
]

export default routes;
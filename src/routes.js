import SignalPage from './pages/signal.vue';
import ChannelPage from './pages/channel.vue';
import AnalizePage from './pages/analize.vue';
import MonitorPage from './pages/monitor.vue';
import AnaliticsPage from './pages/analitics.vue';
import AllnewsPage from './pages/allnews.vue';
import NewsPage from './pages/news.vue';
import NotFoundPage from './pages/not-found.vue';

import Tabbar from './components/tabbar.vue';


export default [
  {
    path: '/',
    component: SignalPage,
  },
  {
    path: '/signal/',
    component: SignalPage,
  },
  {
    path: '/channel/:vttname/',
    component: ChannelPage,
    props: true,
  },
  {
    path: '/analize/:taskid/',
    component: AnalizePage,
    props: true,
  },
  {
    path: '/monitor/',
    component: MonitorPage,
  },
  {
    path: '/analitics/',
    component: AnaliticsPage,
  },
  {
    path: '/allnews/',
    component: AllnewsPage,
  },
  {
    path: '/news/:newsid/',
    component: NewsPage,
    props: true,
  },


  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

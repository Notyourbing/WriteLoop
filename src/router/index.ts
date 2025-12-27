import { createRouter, createWebHistory } from 'vue-router';
import Editor from '../components/Editor.vue';
import GenerateTasks from '../components/GenerateTasks.vue';
import EssayList from '../components/EssayList.vue';
import EssayDetail from '../components/EssayDetail.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Editor',
      component: Editor,
    },
    {
      path: '/generate-tasks',
      name: 'GenerateTasks',
      component: GenerateTasks,
      props: (route) => ({ text: route.query.text || '' }),
    },
    {
      path: '/essays',
      name: 'EssayList',
      component: EssayList,
    },
    {
      path: '/essays/:id',
      name: 'EssayDetail',
      component: EssayDetail,
    },
  ],
});

export default router;


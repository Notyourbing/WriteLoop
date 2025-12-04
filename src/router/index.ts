import { createRouter, createWebHistory } from 'vue-router';
import Editor from '../components/Editor.vue';
import GenerateTasks from '../components/GenerateTasks.vue';

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
  ],
});

export default router;


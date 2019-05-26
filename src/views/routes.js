import Tasks from './tasks'
import tasksChildrenRoutes from './tasks/routes'

export default [
  {
    path: '/',
    redirect: 'tasks',
  },
  {
    path: '/tasks',
    component: Tasks,
    children: tasksChildrenRoutes,
  }
]

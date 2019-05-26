import TasksAll from './all'
import TasksSingle from './single'

import TasksAllChildrenRoutes from './all/routes'

export default [
  {
    path: '',
    component: TasksAll,
    children: TasksAllChildrenRoutes
  },
  {
    path: ':id',
    props: true,
    name: 'tasks-single',
    component: TasksSingle,
  }
]

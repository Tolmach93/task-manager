import axios from 'axios'
import { DEFAULT_GROUP, LOCAL_STORAGE, STORE_MODULES } from '@/constants'

export function getDefaultTaskProps () {
  const now = Date.now()
  return {
    id: now,
    createdAt: now,
    updatedAt: now,
    completed: false,
    groupId: DEFAULT_GROUP.id,
    title: '',
    body: '',
  }
}

export function getTasksFromLocalStorageOrApi (commit) {
  const jsonTasks = localStorage.getItem(LOCAL_STORAGE.TASKS)
  if (jsonTasks) return Promise.resolve(JSON.parse(jsonTasks))
  return axios.get('/todos')
    .then(tasks => {
      const defaultTaskProps = getDefaultTaskProps()
      commit(`${STORE_MODULES.GROUPS}/editGroup`, {
        id: defaultTaskProps.groupId,
        tasks: tasks.map(task => task.id),
      }, { root: true })
      tasks = tasks.reduce((tasks, task) => {
        tasks[task.id] = {
          ...defaultTaskProps,
          ...task
        }
        return tasks
      }, {})
      return tasks
    })
}

export function addLeadingZero (time) {
  if (time > 9) return time.toString()
  return `0${time}`
}

export function getDate (time) {
  const date = new Date(time)
  return `${addLeadingZero(date.getMonth() + 1)}/${addLeadingZero(date.getDate())}/${date.getFullYear()} ${addLeadingZero(date.getHours())}:${addLeadingZero(date.getMinutes())}:${addLeadingZero(date.getSeconds())}`
}

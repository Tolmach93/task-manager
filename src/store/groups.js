import { DEFAULT_GROUP, LOCAL_STORAGE } from '@/constants'
import Vue from 'vue'

function getLocalState () {
  const stateJSON = localStorage.getItem(LOCAL_STORAGE.GROUPS)
  return stateJSON ? JSON.parse(stateJSON) : {
    data: {
      [DEFAULT_GROUP.id]: DEFAULT_GROUP
    },
    list: [DEFAULT_GROUP.id]
  }
}

export default {
  namespaced: true,
  state: getLocalState(),
  mutations: {
    updateGroups (state, groups) {
      state.data = groups
      localStorage.setItem(LOCAL_STORAGE.GROUPS, JSON.stringify(state))
    },
    addGroup (state, group) {
      Vue.set(state.data, group.id, group)
      state.list = state.list.concat(group.id)
      localStorage.setItem(LOCAL_STORAGE.GROUPS, JSON.stringify(state))
    },
    addTaskToGroup (state, { groupId, taskId }) {
      const group = state.data[groupId]
      const tasks = group.tasks
      tasks.push(taskId)
      Vue.set(group, 'tasks', tasks)
      localStorage.setItem(LOCAL_STORAGE.GROUPS, JSON.stringify(state))
    },
    removeTaskInGroup (state, taskId) {
      state.list.some(groupId => {
        const group = state.data[groupId]
        const position = group.tasks.indexOf(taskId)
        if (!~position) return false
        group.tasks.splice(position, 1)
        Vue.set(group, 'tasks', group.tasks)
        localStorage.setItem(LOCAL_STORAGE.GROUPS, JSON.stringify(state))
        return true
      })
    },
    removeGroup (state, id) {
      const list = state.list.slice()
      list.splice(list.indexOf(id), 1)
      state.list = list
      const groups = state.data
      delete groups[id]
      state.data = groups
      localStorage.setItem(LOCAL_STORAGE.GROUPS, JSON.stringify(state))
    },
    editGroup (state, group) {
      Vue.set(state.data, group.id, {
        ...state.data[group.id],
        ...group
      })
      localStorage.setItem(LOCAL_STORAGE.GROUPS, JSON.stringify(state))
    }
  },
  getters: {
    getGroupsWithTasks: (state, getters, rootState) => state.list.map(groupId => {
      return {
        ...state.data[groupId],
        tasks: state.data[groupId].tasks.map(taskId => rootState.tasks.data[taskId])
      }
    }),
  }
}

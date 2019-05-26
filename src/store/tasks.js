import { getTasksFromLocalStorageOrApi } from '@/utils'
import { LOCAL_STORAGE, STORE_MODULES } from '@/constants'
import Vue from 'vue'

export default {
  namespaced: true,
  state: () => {
    let sortTasksBy = localStorage.getItem(LOCAL_STORAGE.SORT_TASKS_BY)
    if (!sortTasksBy) {
      sortTasksBy = 'title'
      localStorage.setItem(LOCAL_STORAGE.SORT_TASKS_BY, sortTasksBy)
    }
    let sortTasksDirectionUpToDown = localStorage.getItem(LOCAL_STORAGE.SORT_TASKS_DIRECTION_UP_TO_DOWN)
    if (!sortTasksDirectionUpToDown) {
      sortTasksDirectionUpToDown = false
      localStorage.setItem(LOCAL_STORAGE.SORT_TASKS_DIRECTION_UP_TO_DOWN, sortTasksDirectionUpToDown)
    } else {
      sortTasksDirectionUpToDown = JSON.parse(sortTasksDirectionUpToDown)
    }
    return {
      data: null,
      loading: false,
      error: null,
      sortTasksBy,
      sortTasksDirectionUpToDown,
    }
  },
  actions: {
    load ({ state, commit }) {
      if (state.loading) return Promise.reject(new Error('Is loading'))
      commit('setLoading', true)
      commit('setError', null)
      return getTasksFromLocalStorageOrApi(commit)
        .then(data => {
          commit('setData', data)
          commit('setLoading', false)
          return data
        })
        .catch(error => {
          commit('setError', error)
          commit('setLoading', false)
        })
    },
  },
  mutations: {
    setData (state, data) {
      state.data = data
      localStorage.setItem(LOCAL_STORAGE.TASKS, JSON.stringify(state.data))
    },
    setLoading (state, loading) {
      state.loading = loading
    },
    setError (state, error) {
      state.error = error
    },
    setTask (state, task) {
      Vue.set(state.data, task.id, {
        ...task,
        updatedAt: Date.now()
      })
      localStorage.setItem(LOCAL_STORAGE.TASKS, JSON.stringify(state.data))
    },
    removeTask (state, id) {
      const data = state.data
      delete data[id]
      state.data = data
      localStorage.setItem(LOCAL_STORAGE.TASKS, JSON.stringify(state.data))
    },
    setSort (state, { sortTasksBy, sortTasksDirectionUpToDown }) {
      state.sortTasksBy = sortTasksBy
      state.sortTasksDirectionUpToDown = sortTasksDirectionUpToDown
      localStorage.setItem(LOCAL_STORAGE.SORT_TASKS_BY, sortTasksBy)
      localStorage.setItem(LOCAL_STORAGE.SORT_TASKS_DIRECTION_UP_TO_DOWN, sortTasksDirectionUpToDown)
    }
  },
  getters: {
    getTasksList (state) {
      return Object.keys(state.data).map(taskId => state.data[taskId])
    },
    getTasksWithGroupTitle (state, getters, rootState) {
      const groups = rootState[STORE_MODULES.GROUPS].data
      return getters.getTasksList.map(task => ({
        ...task,
        groupTitle: groups[task.groupId].title
      }))
    },
    sortedTasks (state, getters) {
      const sortTasksBy = state.sortTasksBy
      const sortTasksDirectionUpToDown = state.sortTasksDirectionUpToDown
      return getters.getTasksWithGroupTitle.sort((taskA, taskB) => {
        if (sortTasksDirectionUpToDown) {
          if (taskA[sortTasksBy] > taskB[sortTasksBy]) return -1
          if (taskA[sortTasksBy] < taskB[sortTasksBy]) return 1
        } else {
          if (taskA[sortTasksBy] < taskB[sortTasksBy]) return -1
          if (taskA[sortTasksBy] > taskB[sortTasksBy]) return 1
        }
      })
    }
  }
}

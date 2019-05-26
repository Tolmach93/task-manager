<template>
  <div class="tasks-table">
    <div class="head line">
      <div
        class="title"
        :class="getClasses('title')"
        @click="changeSort('title')">Title</div>
      <div
        class="group"
        :class="getClasses('groupTitle')"
        @click="changeSort('groupTitle')">Group</div>
      <div
        class="created-at"
        :class="getClasses('createdAt')"
        @click="changeSort('createdAt')">Created at</div>
      <div
        class="updated-at"
        :class="getClasses('updatedAt')"
        @click="changeSort('updatedAt')">Updated at</div>
      <div
        class="completed"
        :class="getClasses('completed')"
        @click="changeSort('completed')">Completed</div>
    </div>
    <div
      v-for="task in tasks"
      :key="task.id"
      class="line">
      <div class="title">
        <router-link class="link" :to="{name: 'tasks-single', params: {id: task.id}}">{{ task.title }}</router-link>
      </div>
      <div class="group">{{ task.groupTitle }}</div>
      <div class="created-at">{{ getDate(task.createdAt) }}</div>
      <div class="updated-at">{{ getDate(task.updatedAt) }}</div>
      <div class="completed">{{ task.completed ? '+' : '-' }}</div>
    </div>
  </div>
</template>
<script>

import { getDate } from '@/utils'

export default {
  name: 'tasks-table-view',
  props: {
    tasks: {
      type: Array,
      required: true,
    },
    sortTasksBy: {
      type: String,
      required: true,
    },
    sortTasksDirectionUpToDown: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    getDate,
    changeSort (key) {
      this.$emit('change-sort', {
        sortTasksBy: key,
        sortTasksDirectionUpToDown: this.sortTasksBy === key ? !this.sortTasksDirectionUpToDown : false,
      })
    },
    getClasses (key) {
      return {
        active: key === this.sortTasksBy,
        'direction-up-to-down': this.sortTasksDirectionUpToDown
      }
    }
  }
}
</script>
<style scoped lang="scss">
.tasks-table {
  padding: 15px;
  min-width: 900px;

  .head {
    cursor: pointer;
    font-weight: 700;
    text-align: center;
    border-top: 1px solid gray;
    .active {
      color: green;
      &:after{
        content: '↓';
        font-size: 18px;
        padding-left: 3px;
      }
      &.direction-up-to-down:after{
        content: '↑';
      }
    }
  }

  .line {
    display: flex;
    border-bottom: 1px solid gray;

    > div {
      padding: 5px 10px;
      border-left: 1px solid gray;

      &:last-of-type {
        border-right: 1px solid gray;
      }
    }

    .title {
      flex-grow: 1;
      min-width: 0;

      .link {
        color: inherit;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .group {
      width: 120px;
      min-width: 120px;
    }

    .title,
    .group {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .created-at,
    .updated-at {
      width: 160px;
      min-width: 160px;
      text-align: center;
    }

    .completed {
      width: 95px;
      min-width: 95px;
      text-align: center;
    }
  }
}
</style>

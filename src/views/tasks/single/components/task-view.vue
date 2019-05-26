<template>
  <div class="task">
    <div class="content-container">
      <div class="head">
        <transition appear :css="false" @enter="enterInput">
          <input
            v-if="titleEditing"
            class="input"
            type="text"
            v-model="localTask.title"
            @blur="titleEditing = false">
        </transition>
        <template v-if="!titleEditing">
          <div class="title" @click="titleEditing = true">{{ localTask.title ? localTask.title : 'Untitled' }}</div>
          <remove-button
            class="remove-button"
            @click.stop="$emit('remove-task', localTask.id)"/>
        </template>
      </div>
      <div class="taber">
        <div class="taber-item" :class="{ active: !localTask.body.map }" @click="localTask.body = ''">Description</div>
        <div class="taber-item disabled">or</div>
        <div class="taber-item" :class="{ active: localTask.body.map }" @click="localTask.body = []">List</div>
      </div>
      <ol v-if="localTask.body.map" class="list">
        <li
          v-for="(item, index) in localTask.body"
          :key="index">
          <div>
            <input
              v-model="localTask.body[index]"
              class="input"
              type="text">
            <remove-button
              class="remove-button"
              @click.stop="localTask.body.splice(index, 1)"/>
          </div>
        </li>
        <li>
          <div>
            <v-button text="Add item" @click="localTask.body.push('')"/>
          </div>
        </li>
      </ol>
      <textarea v-else class="body" v-model="localTask.body"></textarea>
      <div class="select-field">
        <div class="select-title">Group</div>
        <select class="select" v-model="localTask.groupId">
          <option
            v-for="groupId in groups.list"
            :key="groupId"
            :value="groupId">{{ groups.data[groupId].title }}
          </option>
        </select>
      </div>
      <div class="select-field">
        <div class="select-title">Completed</div>
        <select class="select" v-model="localTask.completed">
          <option :value="true">Yes</option>
          <option :value="false">No</option>
        </select>
      </div>
      <div class="date"><span>Created at:</span> {{ getDate(task.createdAt) }}</div>
      <div class="date"><span>Updated at:</span> {{ getDate(task.updatedAt) }}</div>
      <div class="buttons">
        <v-button :disabled="!edited" class="button" text="save" @click="setTask"/>
        <v-button class="button" text="cancel" color="red" @click="cancel"/>
      </div>
    </div>
  </div>
</template>

<script>

import cloneDeep from 'lodash/cloneDeep'
import RemoveButton from '@/components/remove-button'
import VButton from '@/components/v-button'
import { getDate } from '@/utils'

export default {
  name: 'task-view',
  components: { VButton, RemoveButton },
  data () {
    return {
      localTask: cloneDeep(this.task),
      titleEditing: false,
    }
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
    groups: {
      type: Object,
      required: true,
    }
  },
  computed: {
    edited () {
      if (this.localTask.title !== this.task.title) return true
      if (this.localTask.groupId !== this.task.groupId) return true
      if (this.localTask.completed !== this.task.completed) return true
      if (this.localTask.body.some) {
        return !this.localTask.body.every((el, index) => el === this.task.body[index])
      } else {
        if (this.localTask.body !== this.task.body) return true
      }
      return false
    }
  },
  methods: {
    getDate,
    enterInput (el) {
      if (el.tagName !== 'INPUT') return
      el.focus()
    },
    cancel () {
      this.$router.push({
        name: 'tasks-board'
      })
    },
    setTask () {
      this.$emit('set-task', cloneDeep(this.localTask))
    }
  },
}
</script>
<style scoped lang="scss">
.task {
  margin: 10px 0;
  padding: 0 10px;

  .content-container {
    margin: 0 auto;
    max-width: 700px;
    background: #e2e2e0;
    padding: 10px;
    border-radius: 5px;

    .input {
      font-size: 18px;
      padding: 3px 5px;
      width: 100%;
    }

    .remove-button {
      margin-left: 10px;
    }

    .head {
      margin: 10px 0;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .title {
        font-weight: 600;
      }
    }

    .taber {
      display: flex;
      justify-content: flex-start;

      .taber-item {
        font-weight: 600;
        margin-right: 5px;
        cursor: pointer;

        &.active {
          color: green;
        }

        &.disabled {
          cursor: default;
          font-weight: 400;
        }

        &:last-of-type {
          margin-right: 0;
        }
      }
    }

    .list {
      padding-left: 25px;
      li > div {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 5px 0;
      }
    }

    .body {
      box-sizing: border-box;
      padding: 3px 5px;
      margin: 10px auto;
      width: 100%;
      min-height: 200px;
      display: block;
    }

    .select-field {
      margin: 10px 0;
    }

    .buttons {
      margin: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .button {
        margin-left: 10px;

        &:first-of-type {
          margin-left: 0;
        }
      }
    }
  }
}
</style>

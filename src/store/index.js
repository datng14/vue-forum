import { createStore } from 'vuex'
import sourceData from '@/data.json'
import { findById, upsert } from '@/helpers'

export default createStore({
  state: {
    ...sourceData,
    authId: 'rpbB8C6ifrYmNDufMERWfQUoa202'
  },
  getters: {
    authUser: (state, getters) => {
      return getters.user(state.authId)
    },
    user: state => {
      return (id) => {
        const user = findById(state.users, id)
        if (!user) {
          return null
        }
        return {
          ...user,
          get posts () {
            return state.posts.filter(post => post.userId === user.id)
          },
          get postsCount () {
            return this.posts.length
          },
          get threads () {
            return state.threads.filter(thread => thread.userId === user.id)
          },
          get threadsCount () {
            return this.threads.length
          }
        }
      }
    },
    thread: state => {
      return (id) => {
        const thread = findById(state.threads, id)
        return {
          ...thread,
          // get property only trigger when we use it, instead of always call it as normal prop
          get author () {
            return findById(state.users, thread.userId)
          },
          get repliesCount () {
            return thread.posts.length - 1
          },
          get contributorsCount () {
            return thread.contributors.length
          }
        }
      }
    }
  },
  actions: {
    createPost ({ commit, state }, post) {
      post.id = Math.random() + 'post'
      post.publishedAt = Math.floor(Date.now() / 1000)
      post.userId = state.authId

      commit('setPost', { post })
      commit('appendPostToThread', { childId: post.id, parentId: post.threadId })
      commit('appendContributorToThread', { childId: state.authId, parentId: post.threadId })
    },

    async createThread ({ commit, state, dispatch }, { text, title, forumId }) {
      const id = Math.random() + 'thread'
      const userId = state.authId
      const publishedAt = Math.floor(Date.now() / 1000)
      const thread = {
        forumId,
        publishedAt,
        title,
        userId,
        id
      }
      commit('setThread', { thread })
      commit('appendThreadToForum', { parentId: forumId, childId: id })
      commit('appendThreadToUser', { parentId: userId, childId: id })
      dispatch('createPost', { text, threadId: id })
      return findById(state.threads, id)
    },

    async updateThread ({ commit, state }, { title, text, id }) {
      const thread = findById(state.threads, id)
      const post = findById(state.posts, thread.posts[0])
      const newThread = { ...thread, title }
      const newPost = { ...post, text }
      commit('setThread', { thread: newThread })
      commit('setPost', { post: newPost })
      return newThread
    },

    updateUser ({ commit }, user) {
      commit('setUser', { user, userId: user.id })
    }
  },
  mutations: {
    setUser (state, { user, userId }) {
      const userIndex = state.users.findIndex(user => user.id === userId)
      state.users[userIndex] = user
    },

    setPost (state, { post }) {
      upsert(state.posts, post)
    },

    setThread (state, { thread }) {
      upsert(state.threads, thread)
    },

    appendPostToThread: makeAppendChildToParentMutation({ parent: 'threads', child: 'posts' }),

    appendThreadToForum: makeAppendChildToParentMutation({ parent: 'forums', child: 'threads' }),

    appendThreadToUser: makeAppendChildToParentMutation({ parent: 'users', child: 'threads' }),

    appendContributorToThread: makeAppendChildToParentMutation({ parent: 'threads', child: 'contributors' })
  }
})

function makeAppendChildToParentMutation ({ parent, child }) {
  return (state, { childId, parentId }) => {
    const resource = findById(state[parent], parentId)
    resource[child] = resource[child] || []
    if (!resource[child].includes(childId)) {
      resource[child].push(childId)
    }
  }
}

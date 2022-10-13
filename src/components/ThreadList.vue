<template>
    <div class="col-full push-top">
      <div class="thread-list">
          <h2 class="list-title">Threads</h2>

          <div v-for="thread in threads" :key="thread.id" class="thread">
              <div>
                  <p>
                    <!-- use object router here will get a benefit:  -->
                    <!-- when changing path, we don't need to change here, only to change in router file -->
                      <router-link :to="{name: 'ThreadShow', params: {id: thread.id}}">{{ thread.title }}</router-link>
                  </p>
                  <p class="text-faded text-xsmall">
                      By <a href="profile.html">{{ userById(thread.userId).name }}</a>, <AppDate :timestamp='thread.publishedAt'/>
                  </p>
              </div>

              <div class="activity">
                  <p class="replies-count">
                      {{thread.repliesCount}} replies
                  </p>

                  <img class="avatar-medium"
                      :src="userById(thread.userId).avatar"
                      alt="">

                  <div>
                      <p class="text-xsmall">
                          <a href="profile.html">{{userById(thread.userId).name}}</a>
                      </p>
                      <p class="text-xsmall text-faded">
                        <AppDate :timestamp='thread.publishedAt'/></p>
                  </div>
              </div>
          </div>

      </div>
    </div>
</template>

<script>
import { findById } from '@/helpers'
export default {
  props: {
    threads: {
      type: Array,
      required: true
    }
  },
  computed: {
    posts () {
      return this.$store.state.posts
    },
    users () {
      return this.$store.state.users
    }
  },
  methods: {
    postById (postId) {
      return findById(this.posts, postId)
    },
    userById (userId) {
      return findById(this.users, userId)
    }
  }
}
</script>

<style lang="css" scoped>

</style>

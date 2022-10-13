<template>
  <div class="post-list">
      <div v-for="post in posts" :key="post.id" class="post">

        <div class="user-info">
          <a href="#profile.html#profile-details" class="user-name">{{
            userById(post.userId).name
          }}</a>
          <a href="#"><img class="avatar-large" :src="userById(post.userId).avatar" alt="avatar"></a>
          <p class="desktop-only">{{ userById(post.userId).postsCount }} posts</p>
          <p class="desktop-only">{{ userById(post.userId).threadsCount }} threads</p>

        </div>

        <div class="post-content">
          <div>
            <p>{{ post.text }}</p>
          </div>
        </div>

        <div class="post-date text-faded">
          <AppDate :timestamp='post.publishedAt' />
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      users: this.$store.state.users
    }
  },
  props: {
    posts: {
      type: Array,
      required: true
    }
  },
  methods: {
    userById (userId) {
      return this.$store.getters.user(userId)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

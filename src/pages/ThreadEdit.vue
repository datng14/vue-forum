<template>
  <div class="col-full push-top">

    <h1>Editing a thread</h1>

    <ThreadEditor :title='thread.title' :text='thread.text' @save='save' @cancel='cancel' />
  </div>
</template>

<script>
import ThreadEditor from '@/components/ThreadEditor.vue'
import { findById } from '@/helpers'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: { ThreadEditor },
  computed: {
    thread () {
      return findById(this.$store.state.threads, this.id)
    },
    text () {
      return findById(this.$store.state.posts, this.thread.posts[0]).text
    }
  },
  methods: {
    cancel () {
      this.$router.push({ name: 'ThreadShow', params: { id: this.id } })
    },
    async save ({ title, text }) {
      const thread = await this.$store.dispatch('updateThread', {
        id: this.id,
        title,
        text
      })
      this.$router.push({ name: 'ThreadShow', params: { id: thread.id } })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

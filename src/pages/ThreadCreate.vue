<template>
  <div class="col-full push-top">

    <h1>Create new thread in <i>{{ forum.name }}</i></h1>

    <ThreadEditor @save='save' @cancel='cancel' />
  </div>
</template>

<script>
import ThreadEditor from '@/components/ThreadEditor.vue'
import { findById } from '@/helpers'
export default {
  props: {
    forumId: {
      type: String,
      required: true
    }
  },
  components: { ThreadEditor },
  computed: {
    forum () {
      return findById(this.$store.state.forums, this.forumId)
    }
  },
  methods: {
    cancel () {
      this.$router.push({ name: 'Forum', params: { id: this.forumId } })
    },
    async save ({ title, text }) {
      const thread = await this.$store.dispatch('createThread', {
        forumId: this.forumId,
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

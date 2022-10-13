<template>
  <ForumList
    v-for='category in categories'
    :key='category.id'
    :forums='getForumForCategory(category)'
    :title='category.name'
    :categoryId='category.id'
  />
</template>

<script>
import ForumList from '@/components/ForumList.vue'

export default {
  components: { ForumList },
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  methods: {
    getForumForCategory (category) {
      return this.$store.state.forums.filter(forum => forum.categoryId === category.id)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

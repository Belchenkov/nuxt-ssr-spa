<template>
  <div class="posts-page">
    <section class="posts-list">
      <PostList :posts="loadedPosts" />
    </section>
  </div>
</template>

<script>
    export default {
      name: "index",
      components: {
      },
      computed: {
        loadedPosts() {
          return this.$store.getters.loadedPosts;
        }
      }
    }
</script>

<style scoped>
  .posts-page {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

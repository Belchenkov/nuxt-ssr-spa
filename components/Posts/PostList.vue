<template>
  <section class="posts-list">
    <PostPreview
      id="1"
      title="Post One"
      previewText="This is first post"
      thumbnail="https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
    />
    <PostPreview
      id="2"
      title="Post Two"
      previewText="This is second post"
      thumbnail="https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
    />
    <PostPreview
      id="3"
      title="Post Three"
      previewText="This is third post"
      thumbnail="https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
    />
  </section>
</template>

<script>
  import PostPreview from "../../components/Posts/PostPreview";

  export default {
    name: "PostList",
    components: {
      PostPreview
    }
  }
</script>

<style scoped>
  .posts-list {
    display: flex;
    padding: 20px;
    box-sizing: border-box;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
</style>

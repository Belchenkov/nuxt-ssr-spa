<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm
        :post="loadedPost"
        @submit="onSubmit"
      />
    </section>
  </div>
</template>

<script>
  import AdminPostForm from "../../../components/Admin/AdminPostForm";
  import axios from "axios";

  export default {
    layout: 'admin',
    data() {
      return {
        loadedPost: {
          author: 'Aleksey Belchenkov',
          title: 'My awesome Post',
          content: 'Super amazing, thanks for that!',
          thumbnailLink: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
        }
      }
    },
    name: "index",
    components: {
      AdminPostForm
    },
    methods: {
      onSubmit(editedPost) {
        axios.put(
          `https://nuxt-ssr-spa.firebaseio.com/posts/${context.params.postId}.json`,
          editedPost
        ).then(res => {
          this.$router.push('/admin');
        }).catch(err => console.error(err));
      }
    }
  }
</script>

<style scoped>
  .update-form {
    width: 90%;
    margin: 20px auto;
  }

  @media (min-width: 768px) {
    .update-form {
      width: 500px;
    }
  }
</style>

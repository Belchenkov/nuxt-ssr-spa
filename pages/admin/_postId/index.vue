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
    asyncData(context) {
      return axios.get(
        `${process.env.baseUrl}/posts/${context.params.postId}.json`
      ).then(res => {
        return {
          loadedPost: { ...res.data, id: context.params.postId }
        };
      }).catch(err => context.error(err));
    },
    name: "index",
    middleware: ['check-auth', 'auth'],
    components: {
      AdminPostForm
    },
    methods: {
      onSubmit(editedPost) {
        this.$store.dispatch('editedPost', editedPost)
          .then(() => {
            this.$router.push('/admin');
          });
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

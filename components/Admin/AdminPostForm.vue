<template>
  <form @submit.prevent="onSave">
    <AppControlInput v-model="editedPost.author">Author Name</AppControlInput>

    <AppControlInput v-model="editedPost.title">Title</AppControlInput>

    <AppControlInput v-model="editedPost.thumbnailLink">Thumbnail Link</AppControlInput>

    <AppControlInput
      control-type="textarea"
      v-model="editedPost.content">Content</AppControlInput>

    <AppButton type="submit">Save</AppButton>

    <AppButton
      type="button"
      style="margin-left: 10px"
      btn-style="cancel"
      @click="onCancel">Cancel
    </AppButton>
  </form>
</template>

<script>
  import AppControlInput from "../../pages/UI/AppControlInput";
  import AppButton from "../../pages/UI/AppButton";

  export default {
    props: {
      post: {
        type: Object,
        required: false
      }
    },
    name: "AdminPostForm",
    data() {
      return {
        editedPost: this.post ? { ...this.post } : {
          author: '',
          title: '',
          thumbnailLink: '',
          content: ''
        }
      }
    },
    methods: {
      onCancel() {
        this.$router.push('/admin');
      },
      onSave() {

      }
    },
    components: {
      AppControlInput,
      AppButton
    }
  }
</script>

<style scoped>

</style>

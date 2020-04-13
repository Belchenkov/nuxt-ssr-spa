<template>
  <div class="posts-page">
    <section class="posts-list">
      <PostList posts="loadedPosts" />
    </section>
  </div>
</template>

<script>
    import PostList from "../../components/Posts/PostList";

    export default {
      name: "index",
      components: {
        PostList
      },
      asyncData(context) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({
              loadedPosts: [
                {
                  id: 1,
                  title: `First Post`,
                  previewText: 'Preview Text',
                  author: 'Aleksey Belchekov',
                  updatedDate: new Date(),
                  content: 'Some dummy content',
                  thumbnail: ''
                }
              ]
            });
          });
        }).then(data => {
            return data;
          })
          .catch(e => {
          context.error(new Error());
        });
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

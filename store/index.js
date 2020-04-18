import Vuex from 'vuex';
import axios from 'axios';

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPost: []
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPost = posts;
      },
      addPost(state, post) {
        state.loadedPost.push(post);
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPost.findIndex(post => post.id === editedPost.id);

        state.loadedPost[postIndex] = editedPost;
      },
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return axios.get(`${process.env.baseUrl}/posts.json`)
          .then(res => {
            const postsArray = [];

            for (const key in res.data) {
              postsArray.push({ ...res.data[key], id: key});
            }
            console.log(postsArray)
            vuexContext.commit('setPosts', postsArray);
          })
          .catch(err => {
            context.error(err, 'store');
          });
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit('setPosts', posts);
      },
      addPost(vuexContext, post) {
        const createdPost = {
          ...post,
          updatedDate: new Date()
        };

        return axios.post(
          `${process.env.baseUrl}/posts.json`,
          createdPost
        ).then(res => {
          vuexContext.commit('addPost', { ...createdPost, id: res.data.name});
        }).catch(err => {
          console.log(err);
        });
      },
      editedPost(vuexContext, post) {
        return axios.put(
          `${process.env.baseUrl}/posts/${post.id}.json`,
          post
        ).then(res => {
          console.log(res)
          vuexContext.commit('editPost', post);
        }).catch(err => console.error(err));
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPost;
      }
    }
  });
};

export default createStore;

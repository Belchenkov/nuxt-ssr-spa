import Vuex from 'vuex';
import axios from 'axios';

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPost: [],
      token: null
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
      setToken(state, token) {
        state.token = token;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return axios.get(`${process.env.baseUrl}/posts.json`)
          .then(res => {
            const postsArray = [];

            for (const key in res.data) {
              postsArray.push({ ...res.data[key], id: key});
            }
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
          `${process.env.baseUrl}/posts.json?auth=${vuexContext.state.token}`,
          createdPost
        ).then(res => {
          vuexContext.commit('addPost', { ...createdPost, id: res.data.name});
        }).catch(err => {
          console.log(err);
        });
      },
      editedPost(vuexContext, post) {
        return axios.put(
          `${process.env.baseUrl}/posts/${post.id}.json?auth=${vuexContext.state.token}`,
          post
        ).then(res => {
          vuexContext.commit('editPost', post);
        }).catch(err => console.error(err));
      },
      authenticateUser(vuexContext, authData) {
        let authUrl =
          "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
          process.env.fbAPIKey;

        if (!authData.isLogin) {
          authUrl =
            "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" +
            process.env.fbAPIKey;
        }

        return this.$axios.$post(authUrl, {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
          .then(result => {
            vuexContext.commit('setToken', result.idToken);
          }).catch(err => {
          console.log(err);
        });
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPost;
      },
      isAuthenticated(state) {
        return state.token != null;
      }
    }
  });
};

export default createStore;

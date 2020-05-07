import Vuex from 'vuex';
import Cookie from 'js-cookie';

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
      },
      clearToken(state) {
        state.token = null;
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
            const expirationDate = new Date().getTime() + Number.parseInt(result.expiresIn) * 1000;
            vuexContext.commit('setToken', result.idToken);

            Cookie.set('jwt', result.idToken);
            Cookie.set('expirationDate', expirationDate);

            localStorage.setItem('token', result.idToken);
            localStorage.setItem(
              'tokenExpiration',
              expirationDate
            );
          }).catch(err => {
          console.log(err);
        });
      },
      initAuth(vuexContext, req) {
        let token;
        let expirationDate;

        if (req) {
          if (!req.headers.cookie) {
            return null;
          }

          const jwtCookie = req.headers.cookie.split(';')
            .find(c => c.trim().startsWith('jwt='));
          if (!jwtCookie) return null;
          token = jwtCookie.split('=')[1];

          const jwtExpirationDate = req.headers.cookie.split(';')
            .find(c => c.trim().startsWith('expirationDate='))
            .split("=")[1];
          if (!jwtExpirationDate) return null;

        } else {
          token = localStorage.getItem('token');
          expirationDate = localStorage.getItem('tokenExpiration')
        }

        if (new Date().getTime() > expirationDate || !token) {
          console.log('No token or invalid token');
          vuexContext.dispatch('logout');
          return null;
        }

        vuexContext.commit('setToken', token);
      },
      logout(vuexContext) {
        vuexContext.commit('clearToken');

        Cookie.remove('token');
        Cookie.remove('jwt');
        Cookie.remove('expirationDate');

        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
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

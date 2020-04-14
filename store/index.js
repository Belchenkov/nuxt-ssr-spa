import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPost: []
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPost = posts;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
              vuexContext.commit('setPosts', [
                {
                  id: "1",
                  title: 'First Post',
                  previewText: "preview text",
                  thumbnail: ''
                },
                {
                  id: "2",
                  title: 'Second Post',
                  previewText: "preview text",
                  thumbnail: ''
                },
                {
                  id: "3",
                  title: 'Third Post',
                  previewText: "preview text",
                  thumbnail: ''
                }
              ]);
              resolve();
            }, 2000);
        });
      },

      setPosts(vuexContext, posts) {
        vuexContext.commit('setPosts', posts);
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

export const namespaced = true

export const state = {
    article: {
        comments: [],
        tags: [],
        statistic: {
            likes: 0,
            views: 0,
        },
    },
    commentSuccess: false,
    likeIt: true,
    errors: [],
}
export const actions = {
    getArticleData({commit}, payload) {
        console.log(payload);
        axios.get('/api/article-json', {params: {slug: payload}}).then((response) => {
            commit('SET_ARTICLE', response.data.data)
        }).catch((Err) => {
            console.log('Error');
        })
    },
    viewsIncrement({commit}, payload) {
        setTimeout(() => {
            axios.put('/api/article-views-increment', {slug: payload}).then((response) => {
                commit('SET_ARTICLE', response.data.data)
            }).catch((Err) => {
                console.log('Error');
            })
        }, 5000)

    },
    addLike({commit, state}, payload) {
        axios.put('/api/article-likes-increment', {
            slug: payload.slug,
            increment: payload.increment
        }).then((response) => {
            commit('SET_ARTICLE', response.data.data)
            commit('SET_LIKE', !state.likeIt)
        }).catch((Err) => {
            console.log('Ошибка addLike');
        });

        console.log('После клика по кнопке', state.likeIt)

    },

    addComment(context, payload) {
        axios.post('/api/article-add-comment', {
            subject: payload.subject,
            body: payload.body,
            article_id: payload.article_id
        }).then((response) => {
            context.commit('SET_COMMENT_SUCCESS', !context.state.commentSuccess)
            context.dispatch('getArticleData', context.rootState.slug)
        }).catch((error) => {
            if (error.response.status === 422) {
                context.state.errors = error.response.data.errors
            }
        });
    }
}

export const mutations = {
    SET_ARTICLE(state, payload) {
        return state.article = payload;
    },

    SET_LIKE(state, payload) {
        return state.likeIt = payload;
    },
    SET_COMMENT_SUCCESS(state, payload) {
        return state.commentSuccess = payload
    },


}
export const getters = {
    articleViews(state) {
        return state.article.statistic.views
    },
    articleLikes(state) {
        return state.article.statistic.likes
    },

}


export const state = () => ({
  meeting: {
    id: null,
    date: null,
    group: null,
    numberOfMembers: null,
    numberOfGuests: null,
    speeches: [],
    activeSpeech: null
  }
})

export const mutations = {
  setActiveSpeech (ind) {
    state.activeSpeech = ind
  },
}

export const actions = {
}

export const getters = {
  activeSpeech: state => state.activeSpeech,
  speechName: (state) => { return state.speeches.find(speech => speech.id === state.activeSpeech).name },
  speechNeeds: (state) => { return state.speeches.find(speech => speech.id === state.activeSpeech).needs },
  speechRecommendations: (state) => { return state.speeches.find(speech => speech.id === state.activeSpeech).recommendations }
}

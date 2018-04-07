export const state = () => ({
  meeting: {
    id: null,
    date: null,
    group: null,
    numberOfMembers: null,
    numberOfGuests: null,
    speeches: [],
    activeSpeechInd: null
  }
})

export const mutations = {
  setActiveSpeech (state, ind) {
    state.activeSpeech = ind
  },
}

export const getters = {
  activeSpeech: state => state.activeSpeech,
  speechName: (state) => { return state.speeches.find(speech => speech.id === state.activeSpeech).name },
  speechNeeds: (state) => { return state.speeches.find(speech => speech.id === state.activeSpeech).needs },
  speechRecommendations: (state) => { return state.speeches.find(speech => speech.id === state.activeSpeech).recommendations }
}


export const actions = {

}

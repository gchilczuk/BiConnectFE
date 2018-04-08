export const state = () => ({
  meeting: {
    id: null,
    date: null,
    group: null,
    numberOfMembers: null,
    numberOfGuests: null,
    speeches: [],
    activeSpeechInd: 1
  }
})

export const getters = {
  activeSpeechInd: state => state.activeSpeechInd,
  speechName: state => state.speeches.find(speech => speech.id === state.activeSpeech).name ,
  speechNeeds: state => state.speeches.find(speech => speech.id === state.activeSpeech).needs,
  speechRecommendations: state => state.speeches.find(speech => speech.id === state.activeSpeech).recommendations
}

export const mutations = {
  setActiveSpeech (state, ind) {
    state.activeSpeech = ind
  },
}

export const actions = {
}

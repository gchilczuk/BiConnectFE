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
  }
}

export const getters = {
}

export const actions = {

}

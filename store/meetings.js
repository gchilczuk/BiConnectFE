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
  activeSpeechInd: state => state.meeting.activeSpeechInd,
 }

export const mutations = {
  setActiveSpeech (state, ind) {
    state.activeSpeech = ind
  },
}

export const actions = {
}

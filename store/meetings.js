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
  }
}

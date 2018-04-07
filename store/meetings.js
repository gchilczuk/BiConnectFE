export const state = () => ({
  speeches: [],
  activeSpeech: null
})

export const mutations = {
  setActiveSpeech (ind) {
    state.activeSpeech = ind
  }
}

export const state = () => ({
  activeMeetingInd: null,
  meeting: {
    id: null,
    date: null,
    count_members: null,
    count_guests: null,
    group: null,
    speeches: []
  },
  meetings: [],
  activeSpeechInd: null
})

export const getters = {
  activeMeetingInd: state => state.activeMeetingInd,
  activeSpeechInd: state => state.activeSpeechInd,
  speeches: state => state.meeting.speeches,
  meetings: state => state.meetings,
  meeting: state => state.meeting
}

export const mutations = {
  SET_ACTIVE_SPEECH(state, ind) {
    state.activeSpeechInd = ind
  },
  SET_SPEECHES(state, speeches) {
    state.meetings.find(me => me.id === state.currMeetingInd).speeches = speeches
  },
  SET_SPEECH(state, speech) {
    let spe = state.meeting.speeches.find(sp => sp.id === speech.id)
    spe.name = speech.name
    spe.surname = speech.surname
    spe.guest = speech.guest
    spe.needs = speech.needs.slice()
    spe.recommendations = speech.recommendations.slice()

  },
  REMOVE_SPEECH(state, ind) {
    state.meeting.speeches.pop()
  },
  ADD_MEETING(state, meeting) {
    state.meetings.push(meeting)
  },
  SET_MEETINGS(state, meetings) {
    state.meetings = meetings
  },
  SET_MEETING(state, meeting) {
    state.meeting = meeting
  },
  SET_CURR_MEETING(state, ind) {
    state.meeting = state.meetings.find(me => me.id === ind)
    state.activeSpeechInd = null
  },
  ADD_NEW_SPEECH(state) {
    state.meeting.speeches.push({
      id: state.meeting.speeches.length + 1,
      name: '',
      surname: '',
      needs: [],
      recommendations: []
    });
  }
}

export const actions = {
  setActiveSpeech({commit}, ind) {
    commit('SET_ACTIVE_SPEECH', ind)
  },
  addNewSpeech({commit}) {
    commit('ADD_NEW_SPEECH')
  },
  removeSpeechById({commit}, ind) {
    commit('REMOVE_SPEECH', ind)
  },
  setSpeeches({commit}, speeches) {
    commit('SET_SPEECHES', speeches)
  },
  setSpeech({commit}, speech) {
    commit('SET_SPEECH', speech)
  },
  async addMeeting({dispatch, commit}, date) {
    const meeting = await this.$axios.post('http://biconnect.herokuapp.com/groups/1/meetings', {
      date: date
    })
    commit('ADD_MEETING', meeting.data)
  },
  async fetchMeetings({commit}) {
    const meetings = await this.$axios.get('http://biconnect.herokuapp.com/groups/1/meetings')
    commit('SET_MEETINGS', meetings.data)
  },
  async removeMeeting({dispatch, commit}, index) {
    await this.$axios.delete(`http://biconnect.herokuapp.com/groups/1/meetings/${index}`)
    dispatch('fetchMeetings')
  },
  async fetchMeeting({commit, getters}, index) {
    let meeting = await this.$axios.get(`http://biconnect.herokuapp.com/groups/1/meetings/${index}`)
    commit('SET_MEETING', meeting.data)
    return Promise.resolve()
  },
  setCurrMeeting({commit}, ind) {
    commit('SET_CURR_MEETING', ind)
    return Promise.resolve()
  },
  setCurrMeeting({commit}, ind) {
    commit('SET_CURR_MEETING', ind)
  },
  updateMeetingDate({commit}, date) {
    console.log('tutaj będzie request czy cokolwiek..', date)
  }
}

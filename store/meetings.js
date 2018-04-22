export const state = () => ({
  activeMeetingEntityInd: null,
  activeSpeechEntityInd: null,
  activeSpeechTableInd: null,
  meetings: [],
  people: [],
  meeting: {
    id: null,
    date: null,
    count_members: null,
    count_guests: null,
    group: null,
    speeches: []
  }
})

export const getters = {
  activeMeetingEntityInd: state => state.activeMeetingEntityInd,
  activeSpeechEntityInd: state => state.activeSpeechEntityInd,
  activeSpeechTableInd: state => state.activeSpeechTableInd,
  meetings: state => state.meetings,
  activeMeeting: state => state.meeting,
  speeches: state => state.meeting.speeches,
  activeSpeech: state => state.meeting != null && state.activeSpeechTableInd != null &&
    JSON.parse(JSON.stringify(state.meeting.speeches[state.activeSpeechTableInd])),
  people: state => state.people,
}

export const mutations = {
  SET_ACTIVE_SPEECH_TABLE_IND(state, ind) {
    state.activeSpeechTableInd = ind
  },
  SET_ACTIVE_SPEECH_ENTITY_IND(state, ind) {
    state.activeSpeechEntityInd = ind
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
  SET_PEOPLE(state, people) {
    state.people= people
  },
  SET_MEETING(state, meeting) {
    state.meeting = meeting
  },
  SET_ACTIVE_MEETING_ENTITY_IND(state, meetingId) {
    state.meeting = state.meetings.find(me => me.id === meetingId)
    state.activeMeetingEntityInd = meetingId
    state.activeSpeechTableInd = null
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
  setActiveSpeechTableInd({commit}, tableIndex) {
    commit('SET_ACTIVE_SPEECH_TABLE_IND', tableIndex)
  },
  setActiveSpeechEntityInd({commit}, entityIndex) {
    commit('SET_ACTIVE_SPEECH_ENTITY_IND', entityIndex)
  },
  setActiveSpeech({commit}, speech) {
    commit('SET_ACTIVE_SPEECH', speech)
  },
  addNewSpeech({commit}) {
    commit('ADD_NEW_SPEECH')
  },
  removeSpeechById({commit}, ind) {
    commit('REMOVE_SPEECH', ind)
  },
  async updateSpeech({dispatch, commit}, {meetingId, speechId, speech}) {
    await this.$axios.put(`http://biconnect.herokuapp.com/groups/1/meetings/${meetingId}/speeches/${speechId}`, speech)
    dispatch('fetchMeeting', meetingId)
    return Promise.resolve()
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
  async fetchPeople({commit}) {
    const people = await this.$axios.get('http://biconnect.herokuapp.com/people')
    commit('SET_PEOPLE', people.data)
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
  setActiveMeetingEntityInd({commit}, entityIndex) {
    commit('SET_ACTIVE_MEETING_ENTITY_IND', entityIndex)
    return Promise.resolve()
  },
  updateMeetingDate({commit}, date) {
    console.log('tutaj będzie request czy cokolwiek..', date)
  }
}

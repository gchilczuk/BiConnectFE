import Vue from 'vue'

export const state = () => ({
  meeting: {
    id: null,
    date: "2021-12-21",
    group: null,
    numberOfMembers: null,
    numberOfGuests: null,
    speeches: [],
    activeSpeechInd: null
  },
  meetings: [],
  lol: '123'
})

export const getters = {
  activeSpeechInd: state => state.meeting.activeSpeechInd,
  speeches: state => state.meeting.speeches,
  meetings: state => state.meetings,
  meeting: state => state.meeting
}

export const mutations = {
  SET_ACTIVE_SPEECH(state, ind) {
    state.meeting.activeSpeechInd = ind
  },
  SET_SPEECHES(state, speeches) {
    state.meeting.speeches = speeches
  },
  SET_SPEECH(state, speech) {
    let spe = state.meeting.speeches.find(sp => sp.id === speech.id)
    let index = state.meeting.speeches.indexOf(spe)
    Vue.set(state.meeting.speeches, index, speech)
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
  fetchData({commit}) {
    const speeches = [{
      id: 1,
      name: 'Jan',
      surname: 'Kowalski',
      needs: ['Jan Kowalski potrzeba 1', 'Jego druga potrzeba'],
      recommendations: ['Kowalski, rekomendacja'],
      guest: false

    }, {
      id: 2,
      name: 'Paweł',
      surname: 'Nowak',
      needs: ['Mało towaru mi się sprzedaje, potrzebuję reklamy', 'Chcę obniżyć koszty dostawy'],
      recommendations: ['Polecam moją księgarnię internetową!'],
      guest: true
    }, {
      id: 3,
      name: 'Anna',
      surname: 'Nowak',
      needs: ['Alfa potrzeba'],
      recommendations: [],
      guest: false
    }, {
      id: 4,
      name: 'Kazimierz',
      surname: 'Prawdziwy',
      needs: ['Chcę tańszej mąki!'],
      recommendations: ['Polecam wszystkim moje wypieki!'],
      guest: false
    }]
    commit('SET_SPEECHES', speeches)
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
    }).data
    commit('ADD_MEETING', meeting)
  },
  async fetchMeetings({commit}) {
    const meetings = await this.$axios.get('http://biconnect.herokuapp.com/groups/1/meetings').data
    // -> coś nie tak z tym bo tu powinny być dane z backednu, a to wyżej chyba wykonuje się później console.log(meetings)
    // commit('SET_MEETINGS', meetings)
  },
  updateMeetingDate({commit}, date) {
    console.log('tutaj będzie request czy cokolwiek..', date)
  }
}

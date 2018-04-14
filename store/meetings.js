import Vue from 'vue'

export const state = () => ({
  meeting: {
    id: null,
    date: null,
    group: null,
    numberOfMembers: null,
    numberOfGuests: null,
    speeches: [],
    activeSpeechInd: null
  },
  meetings: [],
  currMeetingInd: null
})

export const getters = {
  activeSpeechInd: state => state.meeting.activeSpeechInd,
  currMeetingInd: state => state.currMeetingInd,
  speeches: state => state.meetings[state.currMeetingInd].speeches,
  meetings: state => state.meetings
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
  SET_MEETINGS(state, meetings) {
    state.meetings = meetings
  },
  ADD_NEW_MEETING(state, date) {
    state.meetings.push({id: 100, date: date, members: 0, guests: 0})
  },
  SET_CURR_MEETING_IND(state, ind) {
    state.currMeetingInd = ind
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
  fetchMeetings({commit}) {
    const meetings = [{
      id: 0,
      date: '05-04-2018',
      members: 4,
      guests: 1,
      speeches: []
    }, {
      id: 1,
      date: '29-03-2018',
      members: 0,
      guests: 0,
      speeches:[{
        id: 1,
        name: 'Jan',
        surname: 'Kowalski',
        needs: ['Jan Kowalski potrzeba 1', 'Jego druga potrzeba'],
        recommendations: ['Kowalski, rekomendacja'],
        guest: false}]
    }, {
      id: 2,
      date: '15-03-2018',
      members: 0,
      guests: 0,
      speeches: [{
        id: 2,
        name: 'Paweł',
        surname: 'Nowak',
        needs: ['Mało towaru mi się sprzedaje, potrzebuję reklamy', 'Chcę obniżyć koszty dostawy'],
        recommendations: ['Polecam moją księgarnię internetową!'],
        guest: true
      }]
    }, {
      id: 3,
      date: '5-03-2018',
      members: 0,
      guests: 0,
      speeches:[{
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
      }]
    }]
    commit('SET_MEETINGS', meetings)
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
  setMeetings({commit}, meetings) {
    commit('SET_MEETINGS', meetings)
  },
  addNewMeeting({commit}, date) {
    commit('ADD_NEW_MEETING', date)
  },
  setCurrMeetingInd({commit}, ind) {
    commit('SET_CURR_MEETING_IND', ind)
  }
}

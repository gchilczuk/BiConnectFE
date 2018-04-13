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
  meetings: [{
    id: 1,
    date: '05-04-2018',
    members: 15,
    guests: 1
  }, {
    id: 2,
    date: '29-03-2018',
    members: 35,
    guests: 0
  }, {
    id: 3,
    date: '15-03-2018',
    members: 25,
    guests: 2
  }, {
    id: 4,
    date: '5-03-2018',
    members: 35,
    guests: 0
  }]
})

export const getters = {
  activeSpeechInd: state => state.meeting.activeSpeechInd,
  speeches: state => state.meeting.speeches,
  meetings: state => state.meetings
}

export const mutations = {
  SET_ACTIVE_SPEECH(state, ind) {
    state.meeting.activeSpeechInd = ind
  },
  SET_SPEECHES(state, speeches) {
    state.meeting.speeches = speeches
  },

  //TODO sensowne wstawianie
  ADD_NEW_MEETING(state, date) {
    state.meetings.push({id: 100, date: date, members: 0, guests: 0});
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
      needs: ['OTo moja potrzeba1', 'Moja druga potrzeba'],
      recommendations: ['jeden recommend']
    }, {
      id: 2,
      name: 'Paweł',
      surname: 'Nowak',
      needs: ['OTo moja potrzeba1', 'Moja druga potrzeba'],
      recommendations: ['jeden recommend']
    }, {
      id: 3,
      name: 'Anna',
      surname: 'Nowak',
      needs: ['OTo moja potrzeba1', 'Moja druga potrzeba'],
      recommendations: ['jeden recommend']
    }, {
      id: 4,
      name: 'Kazimierz',
      surname: 'Prawdziwy',
      needs: ['OTo moja potrzeba1', 'Moja druga potrzeba'],
      recommendations: ['jeden recommend']
    }]
    commit('SET_SPEECHES', speeches)
  },
  addNewSpeech({commit}) {
    const speeches = [{
      id: 1,
      name: 'Jan',
      surname: 'Kowalski',
      needs: ['OTo moja potrzeba1', 'Moja druga potrzeba'],
      recommendations: ['jeden recommend']
    }, {
      id: 2,
      name: 'Paweł',
      surname: 'Nowak',
      needs: ['OTo moja potrzeba1', 'Moja druga potrzeba'],
      recommendations: ['jeden recommend']
    }, {
      id: 3,
      name: 'Anna',
      surname: 'Nowak',
      needs: ['OTo moja potrzeba1', 'Moja druga potrzeba'],
      recommendations: ['jeden recommend']
    }, {
      id: 4,
      name: 'Kazimierz',
      surname: 'Prawdziwy',
      needs: ['OTo moja potrzeba1', 'Moja druga potrzeba'],
      recommendations: ['jeden recommend']
    }]
    commit('SET_SPEECHES', speeches)
  },
  removeSpeechById({commit}, ind) {
    const speeches = [{
      id: 1,
      name: 'Jan',
      surname: 'Kowalski',
      needs: ['OTo moja potrzeba1', 'Moja druga potrzeba'],
      recommendations: ['jeden recommend']
    }, {
      id: 2,
      name: 'Paweł',
      surname: 'Nowak',
      needs: ['OTo moja potrzeba1', 'Moja druga potrzeba'],
      recommendations: ['jeden recommend']
    }, {
      id: 3,
      name: 'Anna',
      surname: 'Nowak',
      needs: ['OTo moja potrzeba1', 'Moja druga potrzeba'],
      recommendations: ['jeden recommend']
    }]
    commit('SET_SPEECHES', speeches)
  },
  setSpeeches({commit}, speeches) {
    commit('SET_SPEECHES', speeches)
  },
  setSpeechName({commit}, name) {
    commit('setSpeechName', name)
  },
  setSpeechNeeds({commit}, name) {
    commit('setSpeechNeeds', name)
  },
  setSpeechRecommendations({commit}, name) {
    commit('setSpeechRecommendations', name)
  },
  addNewMeeting({commit}, date) {
    commit('ADD_NEW_MEETING', date)
  }
}

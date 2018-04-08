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

export const getters = {
  activeSpeechInd: state => state.meeting.activeSpeechInd,
  speeches: state => state.meeting.speeches
}

export const mutations = {
  SET_ACTIVE_SPEECH (state, ind) {
    state.meeting.activeSpeechInd = ind
  },
  SET_SPEECHES (state, speeches) {
    state.meeting.speeches = speeches
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
  setSpeeches({commit}, speeches){
    commit('SET_SPEECHES', speeches)
  }
}

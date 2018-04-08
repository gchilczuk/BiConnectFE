export const state = () => ({
  meeting: {
    id: null,
    date: null,
    group: null,
    numberOfMembers: null,
    numberOfGuests: null,
    speeches: [{
      id: 1,
      name: 'Jan Nowak',
      needs: ['OTo moja potrzeba1', 'Moja druga potrzeba'],
      recommendations: ['jeden recommend']
    }],
    activeSpeechInd: 1
  }
})

export const getters = {
  activeSpeechInd: state => state.meeting.activeSpeechInd,
  speechName: state => state.meeting.speeches.find(speech => speech.id === state.meeting.activeSpeechInd).name,
  speechNeeds: state => state.meeting.speeches.find(speech => speech.id === state.meeting.activeSpeechInd).needs,
  speechRecommendations: state => state.meeting.speeches.find(speech => speech.id === state.meeting.activeSpeechInd).recommendations,
}

export const mutations = {
  setActiveSpeech(state, ind) {
    state.meeting.activeSpeech = ind
  },
  setSpeechName(state, name){
    var speech = state.meeting.speeches.find(speech => speech.id === state.meeting.activeSpeechInd)
    speech.name = name
  },
  setSpeechNeeds(state, needs){
    var speech = state.meeting.speeches.find(speech => speech.id === state.meeting.activeSpeechInd)
    speech.needs = needs
  },
  setSpeechRecommendations(state, recomm){
    var speech = state.meeting.speeches.find(speech => speech.id === state.meeting.activeSpeechInd)
    speech.recommendations = recomm
  }
}

export const actions = {
  setSpeechName(context, name){
    context.commit('setSpeechName', name)
  },
  setSpeechNeeds(context, name){
    context.commit('setSpeechNeeds', name)
  },
  setSpeechRecommendations(context, name){
    context.commit('setSpeechRecommendations', name)
  }
}

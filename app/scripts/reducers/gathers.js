const initialState = {
  current: [],
  recent: [],
  terrains: [],
  places: []
};

export default function(state = initialState, action) {
  switch(action.type) {
    case 'GATHER_SEND': {
      let current = [...state.current, {
        terrain: action.terrain,
        slavesSent: action.slaves,
        slavesAlive: action.slaves,
        sentAt: action.time
      }];
      let terrains = state.terrains.filter((t) => t !== action.terrain);
      return {...state, current, terrains};
    }
    case 'GATHER_FINISH': {
      let recent = [...state.recent, action.exploration];
      let current = state.current.filter((e) => e !== action.exploration);
      let places = [...state.places, chance.place(action.exploration.terrain)];
      return {...state, recent, current, places};
    }
  }
  return state;
}

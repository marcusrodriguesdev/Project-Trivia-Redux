const SET_NAME = 'SET_NAME';
const SET_EMAIL = 'SET_EMAIL';
const SET_IMGPATH = 'SET_IMGPATH';

const INITIAL_STATE = {
  name: '',
  imgPath: '',
  email: '',
};

function playerReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case SET_NAME:
    return { ...state, name: payload };
  case SET_EMAIL:
    return { ...state, email: payload };
  case SET_IMGPATH:
    return { ...state, imgPath: payload };
  default:
    return state;
  }
}

export default playerReducer;

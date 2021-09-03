const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
const TOKEN_FAIL = 'TOKEN_FAIL';
const QUESTION_SUCCESS = 'QUESTION_SUCCESS';
const QUESTION_FAIL = 'QUESTION_FAIL';

export const fetchTokenSuccess = (payload) => ({
  type: TOKEN_SUCCESS,
  payload,
});

export const fetchTokenFail = (payload) => ({
  type: TOKEN_FAIL,
  payload,
});

export const fetchQuestionSuccess = (payload) => ({
  type: QUESTION_SUCCESS,
  payload,
})

export const fetchQuestionFail = (payload) => ({
  type : QUESTION_FAIL,
  payload,
})


export const fetchTokenThunk = () => async (dispatch) => {
  try {
    const fetchApi = await fetch('https://opentdb.com/api_token.php?command=request');
    const json = await fetchApi.json();
    const { token } = json;
    return dispatch(fetchTokenSuccess(token));
  } catch (error) {
    return dispatch(fetchTokenFail(error));
  }
};

export const fetchQuestionThunk = (token) => async (dispatch) => {
  try {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const data = await response.json();
  return dispatch(fetchQuestionSuccess(data.results))
  } catch (error) {

    return dispatch(fetchQuestionFail(error));
  }
};

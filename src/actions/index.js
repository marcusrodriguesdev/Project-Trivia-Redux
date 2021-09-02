const actionLogin = (user, email) => ({
  type: 'ACTION_LOGIN',
  payload: {
    user,
    email,
  },
});

export const beginFetch = () => ({
  type: 'BEGIN_FETCH',
});

export const sucessFetch = (response) => ({
  type: 'SUCESS_FETCH',
  payload: {
    response,
  },
});

export const failFetch = (error) => ({
  type: 'FAIL_FETCH',
  error,
});

export const fetchApi = (token) => async (dispatch) => {
  dispatch(beginFetch());
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const asnews = await response.json();
    dispatch(sucessFetch(asnews));
  } catch (error) {
    dispatch(failFetch(error));
  }
};

export default actionLogin;

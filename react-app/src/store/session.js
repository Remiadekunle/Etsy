// constants
const SET_USER = 'session/SET_USER';
const SET_EXAMPLES = 'session/exampleUsers'
const REMOVE_USER = 'session/REMOVE_USER';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});
export const setExamples = (users) => {
  return {
    type:SET_EXAMPLES,
    users
  }
}

const removeUser = () => ({
  type: REMOVE_USER,
})

const initialState = { user: null, examples:{} };

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

export const fetchExamples = () => async (dispatch) => {
    const response = await fetch('/api/users/');
    if (response.ok) {
      const responseData = await response.json();
      console.log('checking', responseData.users)
      dispatch(setExamples(responseData.users))
    }
}

export const addUserImage = (id, formData) => async dispatch => {
  const res = await fetch(`/api/users/${id}/images`, {
      method: "POST",
      body: formData
  })

  if (res.ok){
      const body = await res.json()
      dispatch(setUser(body))
      return
  }
  else{
    const body = await res.json()
    return body.errors
}
}

export const addFavorite = (product_id) => async (dispatch) => {
  const res = await fetch('/api/users/favorties', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      product_id
    })
  });

  if (res.ok){
    const body = await res.json()
    dispatch(setUser(body))
  }
}
export const removeFavorite = (product_id) => async (dispatch) => {
  const res = await fetch('/api/users/favorties', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      product_id
    })
  });

  if (res.ok){
    const body = await res.json()
    dispatch(setUser(body))
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (username, email, password, url) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
      profile_img:url
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const updateInfo = (email, password, username, id, profile_img) => async (dispatch) => {
  console.log(profile_img, 'hiiiiiiiiiii')
  const res = await fetch(`/api/users/${id}`,{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
      profile_img
    }),
  })

  if (res.ok){
    const data = await res.json();
    dispatch(setUser(data))
  }
  else if (res.status < 500) {
    console.log('hi again')
      const data = await res.json();
      if (data.errors) {
        return data.errors;
    }
  }
}

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_USER:
      return { user: action.payload, examples:{...state.examples} }
    case REMOVE_USER:
      return { user: null, examples:{...state.examples} }
    case SET_EXAMPLES:
      newState = Object.assign({}, state);
      newState.examples = {...state.examples}
      const examples = action.users
      // console.log(examples)
      examples.forEach(item => {
        console.log(item)
        console.log(typeof item.id)
        newState.examples[item.id] = item
      })
      return newState
    default:
      return state;
  }
}

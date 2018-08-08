import { FETCH_SETS, NEW_SET } from './types'

export const fetchSets = () => dispatch => {
  fetch('http://localhost:3000/sets')
    .then(resp => resp.json())
    .then(resp => dispatch({
      type: FETCH_SETS,
      payload: resp.data.sets
    }))
}

export const createSet = (payload) => dispatch => {
  fetch('http://localhost:3000/sets', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(resp => resp.json())
    .then(resp => dispatch({
      type: NEW_SET,
      payload: resp.data
    }))
}

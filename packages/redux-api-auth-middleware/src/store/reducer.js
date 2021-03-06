import { calculateJWTTokenExpirationDate } from '../helpers';
import { CLEAR_TOKEN, REFRESH_TOKEN_FAILURE, REFRESH_TOKEN_SUCCESS, SET_TOKEN } from './types';
import type { GetExpirationTimestamp, SetTokenAction, State } from '../types';

export const initialState: State = {
  accessToken: null,
  refreshToken: null,
  expires: 0,
};

export default function({
  getExpirationTimestamp = calculateJWTTokenExpirationDate,
}: { getExpirationTimestamp: GetExpirationTimestamp } = {}) {
  return function authReducer(state: State = initialState, action: SetTokenAction) {
    switch (action.type) {
      case SET_TOKEN:
        return {
          ...state,
          accessToken: action.payload?.access_token,
          refreshToken: action.payload?.refresh_token,
          expires: getExpirationTimestamp(action.payload),
        };
      case REFRESH_TOKEN_SUCCESS:
        return {
          ...state,
          accessToken: action.payload?.access_token,
          refreshToken: action.payload?.refresh_token,
          expires: getExpirationTimestamp(action.payload),
        };
      case CLEAR_TOKEN:
        return initialState;
      case REFRESH_TOKEN_FAILURE:
        return initialState;
      default:
        return state;
    }
  };
}

import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { RootState } from '../state/store';
import { Mutex } from 'async-mutex';
import { setTokens, logout } from '../state/user'

import Cookies from 'js-cookie';
import {BaseUrl} from "../../env.tsx";
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: BaseUrl,
  prepareHeaders: async (headers) => {
    const token = await Cookies.get('token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
      return headers;
    }
    return headers;
  },
});


const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  any,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {


  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions) as any

  if (result?.error?.data?.status === 401) {


    if (mutex.isLocked()) {
      await mutex.waitForUnlock();
      return await baseQuery(args, api, extraOptions);
    }
    const release = await mutex.acquire();
    try {
      const refreshToken: any = (api.getState() as RootState)?.user
        ?.refreshToken;
      if (!refreshToken) {
        api.dispatch(() => { });
        return;
      }
      const refreshResult = await refresh(refreshToken, api, extraOptions)

      const data = refreshResult?.data as any;
      if (data?.jwt) {
        Cookies.set('token', data.jwt )
        Cookies.set('rfsToken', data.refreshToken)
        api.dispatch(setTokens({
          refreshToken: data.refreshToken,
          accessToken: data.jwt,
        }))
       }

      if (data)
        return await baseQuery(args, api, extraOptions);
      api.dispatch(logout());
    } finally {
      release();
    }
  }
  
  if (result.error) {
    if (result.error.data && typeof result.error.data === 'object') {
      const errorKeys = Object.keys(result.error.data);
      if (errorKeys.length > 0) {
        const firstKey = errorKeys[0];
        result.error.data = result.error.data[firstKey][0];
      }
    }
  }
  
  return result;
};
const refresh = (refreshToken: string, api: any, extraOptions: any) => {
  return baseQuery(
    {
      url: 'tokens/refresh',
      method: 'POST',
      body: {
        refreshToken,
      },
    },
    api,
    extraOptions,
  );

}
export default customFetchBase;

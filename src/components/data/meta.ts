import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "./middleware";

export const MetaApi = createApi({
    reducerPath: "metaApi",
    keepUnusedDataFor: 3600,
    baseQuery: customFetchBase,

    endpoints: (builder) => ({
        countries: builder.query<any, void>({
            query: () => ({
                url: "staff/countries",
                method: "get",
            }),
        }),
        users: builder.query<any, void>({
            query: () => ({
                url: "staff/users",
                method: "get",
            }),
        }),
    })
});

export const {
    useCountriesQuery,
    useUsersQuery
} = MetaApi;

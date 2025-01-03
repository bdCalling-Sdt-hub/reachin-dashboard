import { api } from '../api/baseApi';

const peopleSlice = api.injectEndpoints({
      endpoints: (builder) => ({
            createPeople: builder.mutation({
                  query: (payloadData) => {
                        return {
                              url: `/people`,
                              method: 'POST',
                              body: payloadData,
                        };
                  },
            }),
            createBulkPeople: builder.mutation({
                  query: (payloadData) => {
                        return {
                              url: `/people/bulk`,
                              method: 'POST',
                              body: payloadData,
                        };
                  },
            }),
            getPeople: builder.query({
                  query: (args) => {
                        const params = new URLSearchParams();
                        if (args) {
                              args.map((item) => {
                                    if (item.value) {
                                          params.append(item.name, item.value);
                                    }
                              });
                        }

                        return {
                              url: `/people`,
                              method: 'GET',
                              params,
                        };
                  },
                  transformResponse: (data) => {
                        return data?.data;
                  },
            }),
            peopleDetails: builder.query({
                  query: (id) => {
                        return {
                              url: `/people/${id}`,
                              method: 'GET',
                        };
                  },
                  transformResponse: (data) => {
                        return data?.data;
                  },
            }),
            updatePeople: builder.mutation({
                  query: ({ id, updatedData }) => {
                        return {
                              url: `/people/${id}`,
                              method: 'PATCH',
                              body: updatedData,
                        };
                  },
            }),
            updateBulkPeople: builder.mutation({
                  query: (ids) => {
                        return {
                              url: `/people/bulk`,
                              method: 'PATCH',
                              body: ids,
                        };
                  },
            }),
            deletePeople: builder.mutation({
                  query: (id) => {
                        return {
                              url: `/people/${id}`,
                              method: 'DELETE',
                        };
                  },
            }),
            deleteBulkPeople: builder.mutation({
                  query: (ids) => {
                        return {
                              url: `/people/bulk`,
                              method: 'DELETE',
                              body: ids,
                        };
                  },
            }),
      }),
});

export const {
      useGetPeopleQuery,
      usePeopleDetailsQuery,
      useUpdatePeopleMutation,
      useUpdateBulkPeopleMutation,
      useDeletePeopleMutation,
      useDeleteBulkPeopleMutation,
      useCreatePeopleMutation,
      useCreateBulkPeopleMutation,
} = peopleSlice;

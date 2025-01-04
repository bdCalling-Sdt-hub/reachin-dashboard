import { api } from '../api/baseApi';

const companySlice = api.injectEndpoints({
      endpoints: (builder) => ({
            getCompany: builder.query({
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
                              url: `/company`,
                              method: 'GET',
                              params,
                        };
                  },
                  transformResponse: (data) => {
                        return data?.data;
                  },
            }),
      }),
});

export const { useGetCompanyQuery } = companySlice;

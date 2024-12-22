import { configureStore } from '@reduxjs/toolkit';
import { api } from './api/baseApi';
import PeopleFilter from './features/peopleFilterSlice.js';
import CompanyFilter from './features/companyFilterSlice';

const redirectMiddleware = (store) => (next) => (action) => {
      if (
            action.type.endsWith('/rejected') &&
            action.payload?.status === 401 &&
            window.location.pathname !== '/auth/login' // Avoid redirection loop
      ) {
            window.location.href = '/auth/login';
      }
      return next(action);
};

const store = configureStore({
      reducer: {
            [api.reducerPath]: api.reducer,
            peopleFilter: PeopleFilter,
            companyFilter: CompanyFilter,
      },

      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware, redirectMiddleware),
});

export default store;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
      searchQuery: '',
      companyType: '',
      sales: '',
      subIndustry: '',
      numberOfEmployees: '',
      country: '',
};

const companyFilterSlice = createSlice({
      name: 'companyFilter',
      initialState,
      reducers: {
            setSearchQuery(state, action) {
                  state.searchQuery = action.payload;
            },
            setCompanyType(state, action) {
                  state.companyType = action.payload;
            },
            setSales(state, action) {
                  state.sales = action.payload;
            },
            setSubIndustry(state, action) {
                  state.subIndustry = action.payload;
            },
            setNumberOfEmployees(state, action) {
                  state.numberOfEmployees = action.payload;
            },
            setCountry(state, action) {
                  state.country = action.payload;
            },
            resetFilters() {
                  return initialState;
            },
      },
});

export const {
      setSearchQuery,
      setCompanyType,
      setSales,
      setSubIndustry,
      setNumberOfEmployees,
      setCountry,
      resetFilters,
} = companyFilterSlice.actions;

export default companyFilterSlice.reducer;

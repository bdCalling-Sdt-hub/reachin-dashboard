import { createSlice } from '@reduxjs/toolkit';

const initialState = {
      search: '',
      title: '',
      primaryIndustry: '',
      subIndustry: '',
      seniorityLevel: '',
      numberOfEmployees: '',
      source: '',
      revenue: '',
      country: '',
};

const peopleFilterSlice = createSlice({
      name: 'peopleFilters',
      initialState,
      reducers: {
            setSearch(state, action) {
                  state.search = action.payload;
            },
            setTitle(state, action) {
                  state.title = action.payload;
            },
            setPrimaryIndustry(state, action) {
                  state.primaryIndustry = action.payload;
            },
            setSubIndustry(state, action) {
                  state.subIndustry = action.payload;
            },
            setSeniorityLevel(state, action) {
                  state.seniorityLevel = action.payload;
            },
            setNumberOfEmployees(state, action) {
                  state.numberOfEmployees = action.payload;
            },
            setSource(state, action) {
                  state.source = action.payload;
            },
            setRevenue(state, action) {
                  state.revenue = action.payload;
            },
            setCounty(state, action) {
                  state.country = action.payload;
            },
            resetFilters() {
                  return initialState;
            },
      },
});

export const {
      setSearch,
      setTitle,
      setPrimaryIndustry,
      setSubIndustry,
      setSeniorityLevel,
      setNumberOfEmployees,
      setSource,
      setRevenue,
      setCounty,
      resetFilters,
} = peopleFilterSlice.actions;

export default peopleFilterSlice.reducer;

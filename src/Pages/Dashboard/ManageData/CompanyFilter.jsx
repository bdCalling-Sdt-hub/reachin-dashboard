import { Input, Select } from 'antd';
import {
      companyTypes,
      employeeRanges,
      primaryIndustries,
      regions,
      sales,
      subIndustries,
} from '../../../components/common/FilterOptions';
import { useDispatch } from 'react-redux';
import {
      setSearchQuery,
      setCompanyType,
      setSales,
      setSubIndustry,
      setNumberOfEmployees,
      setCountry,
} from '../../../redux/features/companyFilterSlice.js';

const CompanyFilter = () => {
      const dispatch = useDispatch();

      return (
            <div className="flex flex-wrap gap-3 mt-3">
                  <Input
                        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                        style={{
                              width: 300,
                              height: 45,
                              outline: 'none',
                              border: '1px solid #d9d9d9',
                              boxShadow: 'none',
                        }}
                        placeholder="Search.."
                  />

                  {/* Title Select */}
                  <Select
                        onChange={(e) => dispatch(setCompanyType(e))}
                        className=" rounded w-[150px] h-[45px]"
                        placeholder="Company Type"
                  >
                        {companyTypes.map((option) => (
                              <Select.Option key={option.value} value={option.value}>
                                    {option.label}
                              </Select.Option>
                        ))}
                  </Select>

                  <Select
                        onChange={(e) => dispatch(setSales(e))}
                        className=" rounded w-[150px] h-[45px]"
                        placeholder="Sales"
                  >
                        {sales.map((option) => (
                              <Select.Option key={option.value} value={option.value}>
                                    {option.label}
                              </Select.Option>
                        ))}
                  </Select>
                  <Select
                        onChange={(e) => dispatch(setSubIndustry(e))}
                        className=" rounded w-[150px] h-[45px]"
                        placeholder="Sub Industry"
                  >
                        {primaryIndustries.map((option) => (
                              <Select.Option key={option.value} value={option.value}>
                                    {option.label}
                              </Select.Option>
                        ))}
                  </Select>

                  <Select
                        onChange={(e) => dispatch(setNumberOfEmployees(e))}
                        className=" rounded w-[170px] h-[45px]"
                        placeholder="Number of Employee"
                  >
                        {employeeRanges.map((option) => (
                              <Select.Option key={option.value} value={option.value}>
                                    {option.label}
                              </Select.Option>
                        ))}
                  </Select>
                  <Select
                        onChange={(e) => dispatch(setCountry(e))}
                        showSearch
                        className=" rounded w-[170px] h-[45px]"
                        placeholder="Country"
                        optionFilterProp="children"
                        filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                  >
                        {regions.map((option) => (
                              <Select.Option key={option.value} value={option.value}>
                                    {option.label}
                              </Select.Option>
                        ))}
                  </Select>
            </div>
      );
};

export default CompanyFilter;

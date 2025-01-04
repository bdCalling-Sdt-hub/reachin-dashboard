import { Input, Select } from 'antd';
import {
      employeeRanges,
      primaryIndustries,
      regions,
      revenueRanges,
      seniorityLevels,
      sources,
      subIndustries,
      titleOptions,
} from '../../../components/common/FilterOptions';
import { useDispatch, useSelector } from 'react-redux';
import {
      setSearch,
      setTitle,
      setNumberOfEmployees,
      setPrimaryIndustry,
      setRevenue,
      setSeniorityLevel,
      setSource,
      setSubIndustry,
      setCounty,
} from '../../../redux/features/peopleFilterSlice';

const PeopleFilter = () => {
      const dispatch = useDispatch();
      return (
            <div className="flex flex-wrap gap-3">
                  <Input
                        style={{
                              width: 300,
                              height: 45,
                              outline: 'none',
                              border: '1px solid #d9d9d9',
                              boxShadow: 'none',
                        }}
                        placeholder="Search.."
                        onChange={(e) => dispatch(setSearch(e.target.value))}
                  />

                  {/* Title Select */}
                  <Select
                        onChange={(e) => dispatch(setTitle(e))}
                        className=" rounded w-[150px] h-[45px]"
                        placeholder=" Title"
                  >
                        {titleOptions.map((option) => (
                              <Select.Option key={option.value} value={option.value}>
                                    {option.label}
                              </Select.Option>
                        ))}
                  </Select>

                  <Select
                        onChange={(e) => dispatch(setPrimaryIndustry(e))}
                        className=" rounded w-[150px] h-[45px]"
                        placeholder="Primary Industry"
                  >
                        {primaryIndustries.map((option) => (
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
                        {subIndustries.map((option) => (
                              <Select.Option key={option.value} value={option.value}>
                                    {option.label}
                              </Select.Option>
                        ))}
                  </Select>

                  <Select
                        onChange={(e) => dispatch(setSeniorityLevel(e))}
                        className=" rounded w-[170px] h-[45px]"
                        placeholder=" Seniority Level"
                  >
                        {seniorityLevels.map((option) => (
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
                        onChange={(e) => dispatch(setSource(e))}
                        className=" rounded w-[170px] h-[45px]"
                        placeholder="Source"
                  >
                        {sources.map((option) => (
                              <Select.Option key={option.value} value={option.value}>
                                    {option.label}
                              </Select.Option>
                        ))}
                  </Select>
                  <Select
                        onChange={(e) => dispatch(setRevenue(e))}
                        className="rounded w-[170px] h-[45px]"
                        placeholder="Revenue"
                  >
                        {revenueRanges.map((option) => (
                              <Select.Option key={option.value} value={option.value}>
                                    {option.label}
                              </Select.Option>
                        ))}
                  </Select>
                  <Select
                        onChange={(e) => dispatch(setCounty(e))}
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

export default PeopleFilter;

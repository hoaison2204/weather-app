import { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { GEO_API_URL, geoApiOptions } from '../../Api';

const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null);
    const loadOptions = async (inputValue) => {
        const response = await fetch(
            `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions);
        const response_data = await response.json();
        return {
            options: response_data.data.map((city) => {
                return {
                    value: `${city.latitude} ${city.longitude}`,
                    label: `${city.name}, ${city.countryCode}`,
                };
            }),
        };
    }
    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
        console.log('Search Data: ', searchData);
    }
    return (
        <div>
            <AsyncPaginate
                placeholder="Search..."
                debounceTimeout={1000} //avoid someone click very fast
                value={search}
                onChange={handleOnChange}
                loadOptions={loadOptions}
            />
        </div>
    )
}

export default Search;
// import 'bootstrap/dist/css/bootstrap.min.css'
import React, { FC, useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import './FiltersList.css'
import FilterCard from '../../components/FilterCard/FilterCard'
import { Filter } from '../../modules/FiltersApi'

const FiltersList: FC = () => {
    const [searchFilter, setSearchFilter] = useState('')
    const [filters, setFilters] = useState<Filter[]>([])

    useEffect(() => {
        fetch(`http://localhost:8000/api/filters/`)
        .then((response) => response.json())
        .then((jsonFilters) => setFilters(jsonFilters.filters))
        .catch(() => ({filters:[]}))
    },[])

    const handleSearch = async () => {
        const response = await fetch(`http://localhost:8000/api/filters/?search-filter=${searchFilter}`)
        const jsonFilters = await response.json()
        setFilters(jsonFilters.filters)
    }
    
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        handleSearch();
    }

    useEffect(() => {
        handleSearch
    },[searchFilter])

    return (
        <div className="content-wrapper">
            <div className='cards-wrapper'>
                <div className="top">
                    <h2>Применение фильтров к изображению</h2>
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            name="search-filter" 
                            placeholder="Поиск" 
                            autoComplete="off" 
                            id="search-filter" 
                            value={searchFilter} 
                            onChange={(event => setSearchFilter(event.target.value))}
                        />
                        <input 
                            type="submit" 
                            value="Найти" 
                            id="search-button"
                        />
                    </form>
                </div>
                <Row className='card-list'xs={4} md={4}>
                    {filters.map((item) => (
                        <FilterCard data={item}/>
                    ))}
                </Row>
            </div>
        </div>
    )
}

export default FiltersList
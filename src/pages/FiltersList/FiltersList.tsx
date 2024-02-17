// import 'bootstrap/dist/css/bootstrap.min.css'
import React, { FC, useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import './FiltersList.css'
import FilterCard from '../../components/FilterCard/FilterCard'
import { Filter } from '../../modules/FiltersApi'
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs'
import { ROUTES } from '../../Routes'
import { BreadcrumbLink } from '../../components/BreadCrumbs/BreadCrumbs'
import FILTERS_MOCK from '../../modules/mock'
import { Link } from 'react-router-dom'

const FiltersList: FC = () => {
    const [searchFilter, setSearchFilter] = useState('')
    const [filters, setFilters] = useState<Filter[]>([])
    const [isMock, setIsMock] = useState(false)
    const [draft, setDraft] = useState(0)
    const breadcrumbsLinks: BreadcrumbLink[] = [
        { label: 'Фильтры', url: ROUTES.FILTERS },
    ]

    useEffect(() => {
        fetch(`/api/filters/`)
        .then((response) => response.json())
        .then((jsonFilters) => (
            setFilters(jsonFilters.filters),
            setDraft(jsonFilters.draft_order)
        ))
        .catch(() => {
            setIsMock(true);
            setFilters(FILTERS_MOCK)
        })
    },[])

    const handleSearch = async () => {
        const response = await fetch(`/api/filters/?search-filter=${searchFilter}`)
        const jsonFilters = await response.json()
        setFilters(jsonFilters.filters)
    }

    const handleSearchMock = async () => {
        setFilters(FILTERS_MOCK.filter((filter: Filter) => filter.name.toLowerCase().startsWith(searchFilter.toLowerCase())));
      };
    
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (isMock == true){
            handleSearchMock();
        }
        else {
            handleSearch();
        }
    }

    return (
        <div>
            <div className='bread-basket'>
                <BreadCrumbs crumbs={breadcrumbsLinks} />
                {draft == null ? (
                    <span className='not-basket'>Текущий заказ</span>
                ) : (<Link to={`/orders/${draft}`} className='basket'>Текущий заказ</Link>)}
            </div>
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
        </div>
    )
}

export default FiltersList
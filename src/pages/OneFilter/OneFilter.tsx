import { useParams } from "react-router-dom"
import "./OneFilter.css"
import { FC, useEffect, useState } from 'react'
import { ROUTES } from "../../Routes"
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs"
import { BreadcrumbLink } from '../../components/BreadCrumbs/BreadCrumbs'
import FILTERS_MOCK from "../../modules/mock"
import image from '../../components/FilterCard/default.jpg'
import { Link } from "react-router-dom"
import Loader from "../../components/LoadAnimation/LoadAnimation"

interface Filter {
    id: number
    name: string
    description: string
    price: number
    status: number
    image: string
}

const OneFilter: FC = () => {
    const {id} = useParams()
    const [loading, setLoading] = useState(false)

    const [filter, setFilter] = useState<Filter>()

    const breadcrumbsLinks: BreadcrumbLink[] = [
        { label: 'Фильтры', url: ROUTES.FILTERS },
        { label: filter?.name, url: `${ROUTES.FILTERS}/${id}` }
    ]

    const img = filter?.image ? `/api/filters/${filter?.id}/image/` : image

    useEffect(() => {
        setLoading(true)
        fetch(`/api/filters/${id}/`)
        .then((response) => response.json())
        .then((jsonFilter) => (
            setFilter(jsonFilter),
            setLoading(false)
        ))
        .catch(() => (setFilter(FILTERS_MOCK.find((filter:Filter) => String(filter.id) == id))))
    }, [])

    return (
        <div>
            {loading && <Loader />}  
            <BreadCrumbs crumbs={breadcrumbsLinks} />
            <div className="content-wrapper">
                <div className="filter-details">
                    <Link to={`../filters`} className="to-home">Назад</Link>
                    <div className="left">
                        <img src={img} />
                    </div>
                    <div className="right">
                        <div className="filter-info">
                            <h2>{ filter?.name }</h2><br/>
                            <span>Описание: { filter?.description }</span><br/><br/>
                            <span>Цена: { filter?.price }₽</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OneFilter
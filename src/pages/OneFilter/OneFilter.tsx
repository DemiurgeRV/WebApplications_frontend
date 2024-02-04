import { useParams } from "react-router-dom"
import "./OneFilter.css"
import { FC, useEffect, useState } from 'react'

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

    const [filter, setFilter] = useState<Filter>()

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/filters/${id}/`)
        .then((response) => response.json())
        .then((jsonFilter) => setFilter(jsonFilter))
        .catch(() => ({filter:{}}))
    }, [])

    return (
        <div className="content-wrapper">
            <div className="filter-details">
                <a className="to-home" href="/filters">Назад</a>
                <div className="left">
                    <img src={`http://127.0.0.1:8000/api/filters/${id}/image/`} />
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
    )
}

export default OneFilter
import { FC, useEffect, useState } from "react"
import { ROUTES } from "../../Routes"
import BreadCrumbs, { BreadcrumbLink } from "../../components/BreadCrumbs/BreadCrumbs"
import Loader from "../../components/LoadAnimation/LoadAnimation"
import { Table } from "react-bootstrap"
import { Filter } from "../../modules/FiltersApi"
import axios from "axios"
import { Link } from "react-router-dom"
import "./ModerFilters.css"

const ModerFilters: FC = () => {
    const [loading, setLoading] = useState(false)
    const [filters, setFilters] = useState<Filter[]>([])

    const deleteFilter = async (id:number) => {
        await axios.delete(`/api/filters/${id}/delete/`)
        getFilters()
    }

    const getFilters = async() => {
        setLoading(true)
        try {
            const response = await axios.get(`/api/filters/`)
            setFilters(response.data.filters)
            setLoading(false)
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getFilters()
    }, [])

    const breadcrumbsLinks: BreadcrumbLink[] = [
        { label: 'Управление Фильтрами', url: ROUTES.MODERFILTERS },
    ]
    return (
        <div>
            {loading && <Loader />}  
            <BreadCrumbs crumbs={breadcrumbsLinks} />
            <Table className='table'>
                <thead>
                    <tr >
                        <th>Изображение</th>
                        <th>Название</th>
                        <th>Цена</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filters.map((item) => (
                        <tr key={item.id}>
                            <td><img src={item.image} style={{
                                width: 200,
                                height: 100,
                                backgroundPosition: "center",
                                objectFit: 'cover',   
                            }}/></td>
                            <td>{item.name}</td>
                            <td>{item.price}₽</td>
                            <td><Link className="edit-filter" to={`filters/${item.id}/moder`}>Редактировать</Link><br/>
                            <button className="delete-filter" onClick={() => deleteFilter(item.id)}>Удалить</button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default ModerFilters
import { ChangeEvent, FC, useEffect, useState } from "react"
import BreadCrumbs, { BreadcrumbLink } from "../../components/BreadCrumbs/BreadCrumbs"
import { ROUTES } from "../../Routes"
import { Filter } from "../../modules/FiltersApi"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import Loader from "../../components/LoadAnimation/LoadAnimation"
import image from '../../components/FilterCard/default.jpg'
import { Link } from "react-router-dom"

const OneFilterModer: FC = () => {
    const [filter, setFilter] = useState<Filter>()
    const [loading, setLoading] = useState(false)
    const {id} = useParams()
    const [name, setName] = useState(filter?.name)
    const [price, setPrice] = useState(filter?.price)
    const [description, setDescription] = useState(filter?.description)
    const [imageFilter, setImageFilter] = useState<File | undefined>(undefined);

    const img = filter?.image ? `/api/filters/${filter?.id}/image/` : image
    const formData = new FormData()

    const navigate = useNavigate()

    const breadcrumbsLinks: BreadcrumbLink[] = [
        { label: 'Управление Фильтрами', url: ROUTES.MODERFILTERS },
        { label: filter?.name, url: `${ROUTES.MODERFILTERS}/:id`}
    ]

    const saveChanges = async() => {
        await axios.put(`/api/filters/${id}/update/`, { 
            'name': name,
            'description': description,
            'price': price
        })
        if(imageFilter) {
            formData.append('image', imageFilter)
            await axios.put(`/api/filters/${id}/image/update/`, formData)
        }
        navigate(`/filters/moder/`)
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement> ) => {
        const file = e.target.files?.[0]
        setImageFilter(file)
    }

    const getFilter = async () => {
        setLoading(true)
        const response = await axios.get(`/api/filters/${id}`)
        setFilter(response.data)
        setLoading(false)
    }

    useEffect(() => {
        getFilter()
    }, [])

    useEffect(() => {
        setName(filter?.name)
        setPrice(filter?.price)
        setDescription(filter?.description)
    }, [filter])

    return (
        <div>
            {loading && <Loader />} 
            <BreadCrumbs crumbs={breadcrumbsLinks} />
            <div className="content-wrapper">
                <div className="filter-details">
                    <div className="left">
                        <img src={img} />
                    </div>
                    <div className="right">
                        <div className="filter-info">
                            <div>
                                <span>Название: </span><br/>
                                <input value={name} onChange={(e) => setName(e.target.value)}/><br/><br/>
                            </div>
                            <div>
                                <span>Описание: </span><br/>
                                <textarea value={description} rows={5} cols={50} onChange={(e) => setDescription(e.target.value)}/><br/><br/>
                            </div>
                            <div>
                                <span>Цена(₽): </span><br/>
                                <input value={price} onChange={(e) => setPrice(parseInt(e.target.value))}/><br/><br/>
                            </div>
                            <div>
                                <span>Изображение: </span><br/>
                                <input type="file" onChange={handleFileChange}/><br/><br/>
                            </div>
                            <div>
                                <button className="form-order" onClick={saveChanges}>Сохранить</button>
                                <Link to={`../filters/moder`} className="to-orders">Назад</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OneFilterModer
import { FC, useEffect, useState } from "react"
import "./OneOrder.css"
import BreadCrumbs, { BreadcrumbLink } from "../../components/BreadCrumbs/BreadCrumbs"
import { ROUTES } from "../../Routes"
import { useNavigate, useParams } from "react-router-dom"
import { Filter } from "../../modules/FiltersApi"
import axios from "axios"
import { Link } from "react-router-dom"
import { Table } from 'react-bootstrap'
import { useDispatch } from "react-redux"
import { resetDraft, setImageOrder, useImg } from "../../store/slice/DraftSlice"
import Loader from "../../components/LoadAnimation/LoadAnimation"

interface Order {
    id: number
    status: number
    date_created: string
    date_formation: string | null
    date_complete: string | null
    owner: {
        id: number
        login: string
        email: string
    }
    moderator: {
        id: number
        login: string
        email: string
    } | null
    Filters_in_Order: Filter[]
}

const OneOrder: FC = () => {
    const [order, setOrder] = useState<Order>()
    const [loading, setLoading] = useState(false)

    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const image: File | null = useImg()
    const formData = new FormData()
    const role = localStorage.getItem('role')
    image ? formData.append('image', image) : null

    const getOrder = async () => {
        setLoading(true)
        const response = await axios.get(`/api/orders/${id}`)
        setOrder(response.data)
        setLoading(false)
    }

    useEffect(() => {
        getOrder()
    }, [])

    const getStatusText = (statusKey?: number) => {
        switch (statusKey) {
            case 1:
                return 'Введен';
            case 2:
                return 'В работе';
            case 3:
                return 'Завершен';
            case 4:
                return 'Отклонен';
            case 5:
                return 'Удален';
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            dispatch(setImageOrder(file));
            console.log(file)
        }
    };

    const formOrder = async () => {   
        setLoading(true)  
        await axios.put(`/api/orders/${order?.id}/update_status_owner/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }})
        navigate('/orders/')
    }

    const deleteOrder = async () => {     
        await axios.delete(`/api/orders/${order?.id}/delete/`)
        dispatch(resetDraft())
        navigate('/filters/')
    }

    const deleteFilter = (filter_id: number) => async () => {     
        await axios.delete(`/api/orders/${order?.id}/delete_filter/${filter_id}/`)
        getOrder()
    }

    const moderStatusOrder = async (choice: number, order_id: number) => {
        await axios.put(`/api/orders/${order_id}/update_status_moderator/`, {status: choice})
        navigate('/orders/')
    }

    const breadcrumbsLinks: BreadcrumbLink[] = [
        { label: 'Заказы', url: ROUTES.ORDERS },
        { label: String(order?.id), url: `${ROUTES.ORDERS}/${id}` }
    ]

    return (
        <div>
            {loading && <Loader />}  
            <BreadCrumbs crumbs={breadcrumbsLinks} />
            <div className="order-wrapper">
                <div className="order-details">
                    <div className="order-info">
                        <h2>Информация о заказе</h2>
                        <span>Статус: { getStatusText(order?.status) }</span><br/><br/>
                        <span>Дата создания: { (order?.date_created.toString().replace("T", " ").replace("Z", "").substring(0, 16)) }</span><br/><br/>
                        <span>Дата формирования: { order?.date_formation ? order?.date_formation.toString().replace("T", " ").replace("Z", "").substring(0, 16) : null}</span><br/><br/>
                        <span>Дата завершения: { order?.date_complete ? order?.date_complete.toString().replace("T", " ").replace("Z", "").substring(0, 16) : null }</span><br/><br/>
                        { (role == 'true') && <span className='text-center'>Создатель: { order?.owner.login }</span> }<br/><br/>
                        { (role == 'true') && <span className='text-center'>Модератор: { order?.moderator?.login }</span> }<br/><br/>
                        {order?.status != 1 ? <span>Фотография: <p><img src={`/api/orders/${order?.id}/image/`} style={{ width: 500, height: '100%'}}/></p></span> : (
                            <span>Фотография для обработки: <input type="file" onChange={handleFileChange}/></span>
                        )}
                    </div>
                    <div className="block-button">
                        {order?.status == 1 && <button onClick={formOrder} className="form-order">Сформировать</button>}
                        {order?.status == 1 && <button onClick={deleteOrder} className="delete-order">Удалить</button>}
                        { (role == 'true') && (order?.status == 2) && <button className="form-order" onClick={() => { moderStatusOrder(3, order.id)}}>Подтвердить</button>}
                        { (role == 'true') && (order?.status == 2) && <button className="delete-order" onClick={() => { moderStatusOrder(4, order.id)}}>Отклонить</button>}
                    </div>
                    <Link to={`../orders`} className="to-orders">К заявкам</Link>
                </div>
                <div className="order-details">
                    <div className="filter-info">
                        <h2>Добавленные фильтры в заказ</h2>
                        <Table className='table'>
                            <thead>
                                <tr >
                                    <th>Изображение</th>
                                    <th>Название</th>
                                    <th>Цена</th>
                                    {order?.status == 1 && <th></th>}
                                </tr>
                            </thead>
                            <tbody>
                                {order?.Filters_in_Order.map((item) => (
                                    <tr key={item.id}>
                                        <td><img src={item.image} style={{
                                            width: 200,
                                            height: 100,
                                            backgroundPosition: "center",
                                            objectFit: 'cover',   
                                        }}/></td>
                                        <td>{item.name}</td>
                                        <td>{item.price}₽</td>
                                        {order?.status == 1 && <td><button onClick={deleteFilter(item.id)} className="delete-filter-from-order">Удалить</button></td>}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OneOrder
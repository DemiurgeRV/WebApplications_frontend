import { FC, useEffect, useState } from "react"
import "./OneOrder.css"
import BreadCrumbs, { BreadcrumbLink } from "../../components/BreadCrumbs/BreadCrumbs"
import { ROUTES } from "../../Routes"
import { useParams } from "react-router-dom"
import { Filter } from "../../modules/FiltersApi"
import axios from "axios"
import Cookies from "js-cookie"
import { Link } from "react-router-dom"
import { Table } from 'react-bootstrap';

interface Order {
    id: number
    status: number
    date_created: string
    date_formation: string | null
    date_complete: string | null
    moderator: string | null
    Filters_in_Order: Filter[]
}

const OneOrder: FC = () => {
    const [order, setOrder] = useState<Order>()

    const {id} = useParams()
    const session = Cookies.get('session_id')

    const getOrder = async () => {
        const response = await axios.get(`/api/orders/${id}`, { headers: {'Cookie': `session_id=${session}`}})
        setOrder(response.data)
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

    const breadcrumbsLinks: BreadcrumbLink[] = [
        { label: 'Заявки', url: ROUTES.ORDERS },
        { label: String(order?.id), url: `${ROUTES.ORDERS}/${id}` }
    ]

    return (
        <div>
            <BreadCrumbs crumbs={breadcrumbsLinks} />
            <div className="order-wrapper">
                <div className="order-details">
                    <div className="order-info">
                        <h2>Информация о заказе</h2>
                        <span>Статус: { getStatusText(order?.status) }</span><br/>
                        <span>Дата создания: { (order?.date_created.toString().replace("T", " ").replace("Z", "").substring(0, 16)) }</span><br/>
                        <span>Дата формирования: { order?.date_formation ? order?.date_formation.toString().replace("T", " ").replace("Z", "").substring(0, 16) : null}</span><br/>
                        <span>Дата завершения: { order?.date_complete ? order?.date_complete.toString().replace("T", " ").replace("Z", "").substring(0, 16) : null }</span><br/>
                    </div>
                    <Link to={`../orders`} className="to-orders">Назад</Link>
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
                                </tr>
                            </thead>
                            <tbody>
                                {order?.Filters_in_Order.map((item) => (
                                    <tr key={item.id}>
                                        <td><img src={item.image} style={{
                                            width: 200,
                                            height: 100,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            objectFit: 'cover',
                                            backgroundRepeat: "no-repeat"
                                        }}/></td>
                                        <td>{item.name}</td>
                                        <td>{item.price}₽</td>
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
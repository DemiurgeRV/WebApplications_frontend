import { FC, useEffect, useState } from 'react'
import { BreadcrumbLink } from '../../components/BreadCrumbs/BreadCrumbs'
import { ROUTES } from '../../Routes'
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs'
import { InputGroup, Form, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "../../store/store"
import { setEndData, setStartData, setStatus } from "../../store/slice/OrdersSlice"
import { useNavigate } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import { format } from 'date-fns'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { ru } from 'date-fns/locale'
import "./OrdersPage.css"
import Loader from '../../components/LoadAnimation/LoadAnimation'

interface Order {
    id: number
    status: number
    date_created: string
    date_formation: string | null
    date_complete: string | null
    moderator: string | null
}

const OrdersPage: FC = () => {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(false)

    const status = useSelector((state: RootState) => state.orders.status)
    const startDate = useSelector((state: RootState) => state.orders.startDate)
    const endDate = useSelector((state: RootState) => state.orders.endDate)


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const breadcrumbsLinks: BreadcrumbLink[] = [
        { label: 'Заявки', url: ROUTES.ORDERS },
    ]

    const getStatusText = (statusKey: number) => {
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

    const getOrders = async () => {
        setLoading(true)
        const response: AxiosResponse = await axios.get(`/api/orders/`, { 
            params: {
                ...(status && { status: status }),
                ...(startDate && {date_start: format(new Date(startDate), 'yyyy-MM-dd HH:mm')}),
                ...(endDate && {date_end: format(new Date(endDate), 'yyyy-MM-dd HH:mm')}),
            }, 
        })
        setOrders(response.data)
        setLoading(false)
    }

    useEffect(() => {
        getOrders()
    }, [dispatch, status, startDate, endDate])

    return (
        <div>
            {loading && <Loader />}  
            <BreadCrumbs crumbs={breadcrumbsLinks} />
            <div className='input-field'>
                <InputGroup size='sm' className='shadow-sm'>
                    <InputGroup.Text className='status'>Статус</InputGroup.Text>
                    <Form.Select
                        className='select-status'
                        defaultValue={status}
                        onChange={(status) => {dispatch(setStatus({ "status": status.target.value}))}}>
                        <option value="">Все</option>
                        <option value="2">Сформирован</option>
                        <option value="3">Завершен</option>
                        <option value="4">Отклонен</option>
                    </Form.Select>
                </InputGroup>
                <DatePicker
                    className='date-picker'
                    selected={startDate ? new Date(startDate) : null}
                    onChange={(date: Date) => dispatch(setStartData(date ? date.toISOString() : null))}
                    isClearable
                    locale={ru}
                    maxDate={endDate ? new Date(endDate) : null}
                    placeholderText='Дата начала'
                />
                <DatePicker
                    className='date-picker'
                    selected={endDate ? new Date(endDate) : null}
                    onChange={(date: Date) => dispatch(setEndData(date ? date.toISOString() : null))}
                    minDate={new Date(startDate)}
                    isClearable
                    placeholderText='Дата окончания'
                    locale={ru}
                />
            </div>
            <div className='orders'>
                <Table striped bordered hover className="custom-table">
                    <thead>
                        <tr>
                            <th className='text-center'>№</th>
                            <th className='text-center'>Статус</th>
                            <th className='text-center'>Дата создания</th>
                            <th className='text-center'>Дата формирования</th>
                            <th className='text-center'>Дата завершения</th>
                            <th className='text-center'>Изображение</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={order.id} className='table-row' onClick={() => navigate(`/orders/${order.id}`)}>
                                <td className='text-center'>{++index}</td>
                                <td className='text-center'>{getStatusText(order.status)}</td>
                                <td className='text-center'>{ (order?.date_created.toString().replace("T", " ").replace("Z", "").substring(0, 16)) }</td>
                                <td className='text-center'>{ order?.date_formation ? order?.date_formation.toString().replace("T", " ").replace("Z", "").substring(0, 16) : null}</td>
                                <td className='text-center'>{ order?.date_complete ? order?.date_complete.toString().replace("T", " ").replace("Z", "").substring(0, 16) : null }</td>
                                <td className='text-center'><img src={`/api/orders/${order?.id}/image/`} style={{ width: 300, height: '100%'}}/></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default OrdersPage
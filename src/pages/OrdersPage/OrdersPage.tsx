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
import { format } from 'date-fns';
import Cookies from 'js-cookie'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { ru } from 'date-fns/locale';
import "./OrdersPage.css"

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

    const session = Cookies.get('session_id')

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
        const response: AxiosResponse = await axios.get(`/api/orders/`, { 
            params: {
                ...(status && { status: status }),
                ...(startDate && {date_start: format(new Date(startDate), 'yyyy-MM-dd HH:mm')}),
                ...(endDate && {date_end: format(new Date(endDate), 'yyyy-MM-dd HH:mm')}),
            }, 
            headers: {'Cookie': `session_id=${session}`}
        })
        response.data.forEach((req: Order) => {
            req.date_created = (new Date(req.date_created)).toISOString().replace("T", " ").replace("Z", "").substring(0, 16);
            req.date_formation = req.date_formation
                ? (new Date(req.date_formation)).toISOString().replace("T", " ").replace("Z", "").substring(0, 16)
                : null;
            req.date_complete = req.date_complete
                ? (new Date(req.date_complete)).toISOString().replace("T", " ").replace("Z", "").substring(0, 16)
                : null;
        });
        setOrders(response.data)
    }

    useEffect(() => {
        getOrders()
    }, [dispatch, status, startDate, endDate])

    return (
        <div>
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
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((req, index) => (
                            <tr key={req.id} className='table-row' onClick={() => navigate(`/orders/${req.id}`)}>
                                <td className='text-center'>{++index}</td>
                                <td className='text-center'>{getStatusText(req.status)}</td>
                                <td className='text-center'>{req.date_created}</td>
                                <td className='text-center'>{req.date_formation}</td>
                                <td className='text-center'>{req.date_complete}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default OrdersPage
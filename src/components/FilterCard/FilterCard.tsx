import "./FilterCard.css"
import { FC, useState } from 'react'
import { Col } from 'react-bootstrap'
import image from './default.jpg'
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useDispatch } from "react-redux"
import { setBasket } from "../../store/slice/DraftSlice"
import { useRole } from "../../store/slice/LoginSlice"

interface Props {
    data: {
        id: number
        name: string
        description: string
        price: number
        status: number
        image: string
    }
}

const FilterCard: FC<Props> = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const img = props.data.image ? `/api/filters/${props.data.id}/image/` : image
    const auth = localStorage.getItem('is_auth')
    const role = useRole()
    const [addedToOrder, setAddedToOrder] = useState(false)
    const [error, setError] = useState('')

    const addToOrder = async () => {     
        try {
            await axios.post(`/api/filters/${props.data.id}/add_to_order/`)
            setAddedToOrder(true)
            dispatch(setBasket())
            navigate('/filters/')
        } catch (error) {
            setError('Товар уже добавлен в заявку')
        }  
    }
    const deleteFilter = async () => {
        await axios.post(`api/filters/${props.data.id}/delete/`)
    }
    return (
        <div className='card'>
            <Link to={`./${props.data.id}/`}><Col>
                <img src={img} className="images" />
                <h3>{ props.data.name }</h3><br />
            </Col></Link>
            { auth && !role &&
                <div className="button">
                    { addedToOrder || error ? <p>Фильтр добавлен в заявку</p> 
                    :   <button onClick={addToOrder} className="add_filter">Добавить в заявку</button>
                    }
                </div>
            }    
            { auth && role &&
                <div className="button">
                    { addedToOrder ? <p>Товар добавлен в заявку</p> 
                    :   <button onClick={deleteFilter} className="add_filter">Удалить</button>
                    }
                </div>
            }     
        </div>
    )
}

export default FilterCard
import "./FilterCard.css"
import { FC, useState } from 'react'
import { Col } from 'react-bootstrap'
import image from './default.jpg'
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

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

    const img = props.data.image ? `/api/filters/${props.data.id}/image/` : image
    const auth = localStorage.getItem('is_auth')
    const [addedToOrder, setAddedToOrder] = useState(false)

    const addToOrder = async () => {     
        await axios.post(`/api/filters/${props.data.id}/add_to_order/`)
        setAddedToOrder(true)
        navigate('/filters/')
    }
    return (
        <div className='card'>
            <Link to={`./${props.data.id}/`}><Col>
                <img src={img} className="images" />
                <h3>{ props.data.name }</h3><br />
            </Col></Link>
            { auth && 
                <div className="button">
                    { addedToOrder ? <p>Товар добавлен в заявку</p> 
                    :   <button onClick={addToOrder} className="add_filter">Добавить в заявку</button>
                    }
                </div>
            }        
        </div>
    )
}

export default FilterCard
import "./FilterCard.css"
import { FC } from 'react'
import { Col } from 'react-bootstrap'
import image from './default.jpg'
import { Link } from "react-router-dom"

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
    const img = props.data.image ? `/api/filters/${props.data.id}/image/` : image
    return (
        <div className='card'>
            <Link to={`/filters/${props.data.id}/`}><Col>
                <img src={img} className="images" />
                <h3>{ props.data.name }</h3><br />
            </Col></Link>
            {/* <div className="button"><a href={`http://127.0.0.1:8000/api/filters/${item.id}/delete/`} className="delete_filter">Удалить</a></div> */}
        </div>
    )
}

export default FilterCard
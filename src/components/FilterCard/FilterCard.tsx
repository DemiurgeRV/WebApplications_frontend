import "./FilterCard.css"
import { FC } from 'react'
import { Col } from 'react-bootstrap'

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
    return (
        <div className='card'>
            <a href={`http://localhost:3000/filters/${props.data.id}/`}><Col>
                <img src={`http://127.0.0.1:8000/api/filters/${props.data.id}/image/`} className="images" />
                <h3>{ props.data.name }</h3><br />
            </Col></a>
            {/* <div className="button"><a href={`http://127.0.0.1:8000/api/filters/${item.id}/delete/`} className="delete_filter">Удалить</a></div> */}
        </div>
    )
}

export default FilterCard
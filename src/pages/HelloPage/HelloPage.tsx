import { FC } from "react";
import "./HelloPage.css"
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const HelloPage: FC = () => {
    const navigate = useNavigate()
    return (
        <div className="hello-page">
            <img src="src\assets\HelloPage\background.jpg" className="bg-image"/>
            <div className="content-block">
                <div className="text-block">
                    <h1>ФотоShop</h1>
                    <p>Добро пожаловать на сервис для обработки фотографий!</p>
                    <p>Здесь вы можете выбрать фильтр для создания своего идеального изображения</p><br/>
                </div>
                <div className="button-block">
                    <Button onClick={() => navigate('/filters')}>К фильтрам</Button>
                    <Button onClick={() => navigate('/login')}>Вход</Button>
                    <Button onClick={() => navigate('/signup')}>Регистрация</Button>
                </div>
            </div>
        </div>
    )
}

export default HelloPage
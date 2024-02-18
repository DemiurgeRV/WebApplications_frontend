import { FC, useState } from "react"
import { Form } from "react-bootstrap"
import axios, { AxiosResponse } from 'axios'
import Cookies from "js-cookie"
import "./Registration.css"
import { useDispatch } from "react-redux"
import { setUser } from "../../store/slice/LoginSlice"
import { useNavigate } from "react-router-dom"

const Registration: FC = () => {
    const [first_name, setName] = useState('')
    const [last_name, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSignup = async () => {
        await axios.post(`/api/user/`, {first_name, last_name, email, login, password})
        const response: AxiosResponse = await axios.post(`/api/login/`, {login, password})
        const session = Cookies.get('session_id')
        if (session) {
            navigate('/filters/')
            dispatch(setUser({ role: response.data.role, login: response.data.login }))
        }
    }

    return (
        <div className="register-wrapper">  
            <Form className="signup-form">
                <h1 className="title-signup">Регистрация</h1>
                <input type="input-field" onChange={(event => setName(event.target.value))} placeholder="Имя" value={first_name}/>
                <input type="input-field" onChange={(event => setLastname(event.target.value))} placeholder="Фаимилия" value={last_name}/>
                <input type="input-field" onChange={(event => setEmail(event.target.value))} placeholder="Почта" value={email}/>
                <input type="input-field" onChange={(event => setLogin(event.target.value))} placeholder="Логин" value={login}/>
                <input type="input-field" onChange={(event => setPassword(event.target.value))} placeholder="Пароль" value={password}/>
                <button className="btn-signup" type="button" onClick={handleSignup}>Зарегистрироваться</button>
            </Form>
        </div>
    )
}

export default Registration
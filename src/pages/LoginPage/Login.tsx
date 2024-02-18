import { FC, useState } from "react"
import { Form } from "react-bootstrap"
import axios, { AxiosResponse } from 'axios'
import Cookies from "js-cookie"
import "./Login.css"
import { useDispatch } from "react-redux"
import { setUser } from "../../store/slice/LoginSlice"
import { useNavigate } from "react-router-dom"
import Loader from "../../components/LoadAnimation/LoadAnimation"

const LoginPage: FC = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async () => {
        setLoading(true)
        const response: AxiosResponse = await axios.post(`/api/login/`, {login, password})
        const session = Cookies.get('session_id')
        if (session) {
            navigate('/filters/')
            dispatch(setUser({ role: response.data.role, login: response.data.login }))
        }
    }

    return (
        <div className="auth-wrapper">
            {loading && <Loader />}  
            <Form className="login-form">
                <h1 className="title-login">Авторизация</h1>
                <input type="login" onChange={(event => setLogin(event.target.value))} placeholder="Логин" value={login}/>
                <input type="password" onChange={(event => setPassword(event.target.value))} placeholder="Пароль" value={password}/>
                <button className="btn-login" type="button" onClick={handleLogin}>Войти</button>
            </Form>
        </div>
    )
}

export default LoginPage
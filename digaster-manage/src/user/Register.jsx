import React, { useEffect } from 'react'
import useDymanicForm from '../hooks/useDymanicForm'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../redux/actions/userActions'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Register = () => {
    const { userRegistered, loading, error } = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleSubmit = e => {
        if (!state.name || !state.email || !state.password) {
            alert("Please Fill Form Properly")
        }
        else {
            dispatch(registerUser(state))
        }
    }
    const config = [
        { fieldName: "name", type: "text" },
        { fieldName: "email", type: "email" },
        { fieldName: "password", type: "password" },
        { fieldName: "Login User", type: "submit", onClick: handleSubmit },

    ]
    const [ui, state, pre] = useDymanicForm(config)
    useEffect(() => {
        if (userRegistered) {
            toast.success("User Registratiion SuccesFull")

            navigate("/")
        }
    }, [userRegistered])
    return <>
        <div className='w-screen '>
            <div className='container mt-40 flex items-center justify-evenly ' >
                <div className='w-1/2'>
                    {/* <img src= {fir.png} alt="Fir file" /> */}

                </div>
                <div className=' w-1/4  '>
                    {ui}</div>
            </div>
        </div>
    </>
}

export default Register
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

            navigate("/dash")
        }
    }, [userRegistered])
    return <>
        <div class="flex items-center min-h-screen bg-white dark:bg-gray-900">
            <div class="container mx-auto">
                <div className=' text-center'>

                </div>
                <div class="max-w-md mx-auto my-10">
                    <div >
                        <h1 className='text-center bg-slate-200 rounded-lg '>sign in</h1>
                        <img className='img-fluid' src="https://img.pikbest.com/element_our/20220330/bg/623773045e931.png!w700wp" />
                        {ui}
                    </div>


                </div>
            </div>
        </div>
    </>
}

export default Register
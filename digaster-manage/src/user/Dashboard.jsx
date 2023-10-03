import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useDymanicForm from '../hooks/useDymanicForm'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../redux/actions/userActions'

const Dashboard = () => {
    const { auth } = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [selectedImage, setSelectedImage] = useState(0)
    const images = [

        "https://static.tnn.in/photo/msid-91622064,width-100,height-200,resizemode-75/91622064.jpg",

        "https://img.freepik.com/premium-photo/oil-refinery-is-fire-explosion_693425-8775.jpg?w=2000",
        "https://www.newsclick.in/sites/default/files/styles/amp_1200x675_16_9/public/2022-01/accien36.jpg?itok=GcdDtuzY",
        "https://images.deccanherald.com/deccanherald%2Fimport%2Fsites%2Fdh%2Ffiles%2Farticleimages%2F2022%2F05%2F29%2Ffire-dh-14-1113402-1653766961.jpg?auto=format%2Ccompress&fmt=webp&fit=max&format=webp&w=400&dpr=2.6"
    ]
    const handleSubmit = e => {
        dispatch(loginUser(state))
    }
    const config = [
        { fieldName: "email", type: "email" },
        { fieldName: "password", type: "password" },
        { fieldName: "name", type: "text" },
        { fieldName: "Login", type: "submit", onClick: handleSubmit },
    ]
    const [ui, state, pre] = useDymanicForm(config)
    useEffect(() => {
        let t = setInterval(() => {
            // setSelectedImage(pre => (pre + 1) % images.length)
            setSelectedImage(pre => pre === images.length - 1 ? 0 : pre + 1)
        }, 5000)
        return () => {
            clearInterval(t)
        }
    }, [])

    return <>
        <dialog id="my_modal_3" className="modal">
            <form method="dialog" className="modal-box">
                {ui}
            </form>
        </dialog>
        <div className="navbar bg-base-100">
            <div className="navbar-start">


                {
                    auth ? <h1>{auth.name}</h1>
                        : <button onClick={() => window.my_modal_3.showModal()} >login</button>
                }



                <button onClick={e => navigate("/temp")} className="btn btn-success"> Temprature</button>
            </div>
            <div className="navbar-center">
                <a className="btn btn-ghost normal-case text-xl">Digaster Managment</a>
            </div>
            <div className="navbar-end">
                <button className="btn btn-ghost">
                    <button onClick={e => navigate("/his")}>History</button>
                </button>
                <button className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        {
                            !auth ? <h1>{auth.name}</h1>
                                : <button onClick={() => window.my_modal_3.showModal()} >login</button>
                        }   </div>
                </button>
            </div>
        </div >
        <button onClick={e => setSelectedImage(pre => pre === 0 ? images.length - 1 : pre - 1)} class="btn btn-error">pre</button>
        <button onClick={e => setSelectedImage(pre => pre === images.length - 1 ? 0 : pre + 1)} class="btn btn-warning">next</button>

        <img className='img-fluid' src={images[selectedImage]} alt="" />
    </>

}


export default Dashboard
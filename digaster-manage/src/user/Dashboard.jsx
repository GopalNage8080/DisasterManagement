import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useDymanicForm from '../hooks/useDymanicForm'
import { useDispatch, useSelector } from 'react-redux'
import { getData, insertData, loginUser } from '../redux/actions/userActions'
import { invalidate } from '../redux/slices/userSlice'

const Dashboard = () => {
    // const { auth } = useSelector(state => state.user)
    // const navigate = useNavigate()
    // const dispatch = useDispatch()
    // const [selectedImage, setSelectedImage] = useState(0)
    // const images = [
    //     "https://img.freepik.com/premium-photo/oil-refinery-is-fire-explosion_693425-8775.jpg?w=2000",
    //     "https://assets.thehansindia.com/h-upload/2022/01/12/1600x960_1192245-fire-accident.jpg",
    //     "https://img.freepik.com/premium-photo/oil-refinery-is-fire-explosion_693425-8775.jpg?w=2000",
    //     "https://gumlet.assettype.com/freepressjournal/2023-04/f9b4a075-0c74-4ba8-8e71-b3bc9e338d71/shivshahi_amravati.jfif",
    //     "https://img.onmanorama.com/content/dam/mm/en/kerala/top-news/images/2023/5/13/kochi-fire-accident-c.jpg",
    // ]
    // const handleSubmit = e => {
    //     dispatch(loginUser(state))
    // }
    // const config = [
    //     { fieldName: "email", type: "email" },
    //     { fieldName: "password", type: "password" },
    //     { fieldName: "Login", type: "submit", onClick: handleSubmit },
    // ]
    // const [ui, state, pre] = useDymanicForm(config)

    // useEffect(() => {
    //     let t = setInterval(() => {
    //         // setSelectedImage(pre => (pre + 1) % images.length)
    //         setSelectedImage(pre => pre === images.length - 1 ? 0 : pre + 1)
    //     }, 2000)
    //     return () => {
    //         clearInterval(t)
    //     }
    // }, [])
    const dispatch = useDispatch()
    const { Data, dataInserted } = useSelector(state => state.user)
    const handleSubmit = e => {
        if (state.Temperature || state.AirP || state.AirQ) {
            dispatch(insertData(state))
            dispatch(invalidate())
        }
        else {

            alert("Fill Total Information")
        }
    }

    const config = [
        { fieldName: "Temperature", type: "number" },
        { fieldName: "Moisture", type: "select", options: ["Normal", "Risk"] },
        { fieldName: "Humidity", type: "select", options: ["Normal", "Risk"], },
        { fieldName: "Alarm_Working", type: "radio", options: ["Yes", "No"], },
        { fieldName: "Date", type: "date", },
        { fieldName: "Check Total Measure", type: "submit", onClick: handleSubmit },
    ]
    const [ui, state, pre] = useDymanicForm(config)
    useEffect(() => {
        if (dataInserted) {
            dispatch(getData())
        }
    }, [dataInserted])



    return <>
        {/* <>
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



            </div>
            <div className="navbar-center">
                <a className="btn btn-ghost normal-case text-xl">Digaster Managment</a>
            </div>
            <div className="navbar-end">
                <button className="btn btn-ghost">
                    <button onClick={e => navigate("/temp")} className="btn-btn-slate-100"> Temprature</button>
                </button>
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
        <button onClick={e => setSelectedImage(pre => pre === 0 ? images.length - 1 : pre - 1)} className="btn btn-outline ">pre</button>
        <button onClick={e => setSelectedImage(pre => pre === images.length - 1 ? 0 : pre + 1)} className="btn btn-outline">next</button>

        <img className='img-fluid' src={images[selectedImage]} alt="" />
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Hello there</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    </> */}
        <div className='container'>
            <div className="card card-compact w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    {ui}
                </div>
            </div>
        </div>
    </>

}


export default Dashboard
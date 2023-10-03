import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useDymanicForm from '../hooks/useDymanicForm'
import { getData, insertData } from '../redux/actions/userActions'
import { invalidate } from '../redux/slices/userSlice'

const Temprature = () => {
    const dispatch = useDispatch()
    const { Data, dataInserted } = useSelector(state => state.user)
    const handleSubmit = e => {
        if (state.Temprature || state.AirP || state.AirQ) {
            dispatch(insertData(state))
            dispatch(invalidate())
        }
        else {

            alert("Fill Total Information")
        }
    }

    const config = [
        { fieldName: "Temprature", type: "number" },
        { fieldName: "Electronic ", type: "select", options: ["Normal", "Risk"] },
        { fieldName: "AirQ", type: "select", options: ["Good", "Normal", "Bad", "Very Bad"], },
        { fieldName: "Check Total Measure", type: "submit", onClick: handleSubmit },
    ]
    const [ui, state, pre] = useDymanicForm(config)
    useEffect(() => {
        dispatch(getData())
    }, [dataInserted])
    return <>
        <div className="container">

            <div className="card card-compact w-96 bg-base-100 ">
                <div className="card-body">
                    {ui}
                </div>
            </div>
        </div>
        {
            Data && Data.map(item => item.Temprature >= 25
                ? <><div className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>The Temprature Is High</span>
                </div></>
                : <div>
                    <div className="card card-compact  bg-base-400 shadow-xl">
                        <div className="card-body">
                            <h1>{item.Temprature}</h1>
                            <h1>{item.AirP}</h1>
                            <h1>{item.AirQ}</h1>
                        </div>
                    </div>
                </div>)

        }



    </>
}

export default Temprature
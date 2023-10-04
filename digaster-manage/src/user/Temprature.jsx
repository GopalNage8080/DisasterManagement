import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useDymanicForm from '../hooks/useDymanicForm'
import { getData, insertData } from '../redux/actions/userActions'
import { invalidate } from '../redux/slices/userSlice'
import Warning from 'postcss/lib/warning'
import { useNavigate } from 'react-router-dom'

const Temprature = () => {
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
        { fieldName: "humidity", type: "select", options: ["Normal", "Risk"], },
        { fieldName: "Alarm_Working", type: "radio", options: ["Yes", "No"], },
        { fieldName: "Date", type: "date", },
        { fieldName: "Check All", type: "submit", onClick: handleSubmit },
    ]
    const [ui, state, pre] = useDymanicForm(config)
    useEffect(() => {

        dispatch(getData())

    }, [dataInserted])

    const navigate = useNavigate()
    return <>
        <div className="flex">
            <div className="navbar mb-20 bg-slate-200">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>Homepage</a></li>
                            <li><a>Portfolio</a></li>
                            <li><a>About</a></li>
                        </ul>
                    </div>
                </div>
                <div className="navbar-center">
                    <a className="btn btn-ghost normal-case text-xl"><b>Chemical Disaster Managment</b></a>
                </div>
                <div className="navbar-end">
                    <button className="btn btn-ghost btn-circle">
                    </button>
                    <button className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <span className="badge badge-xs badge-primary indicator-item"></span>
                        </div>
                    </button>
                </div>
            </div>
            {/* {
                Data && Data.map(item => item.Temprature >= 25
                    ? <>
                        <div className="card card-compact w-1/3 bg-base-100 shadow-xl gap-3 items-end">
                            <div className="alert alert-error gap-3 mb-5 ms-28">
                                <div className="card-body gap-4 ">
                                    <h1>Temprature  :{item.Temprature}</h1>
                                    <h1>Electronics :{item.Electonics}</h1>
                                    <h1>Air Qiality :{item.AirQ}</h1>
                                    <h1> Date       :{item.Date}</h1>
                                </div>
                                <span>The Temprature Is High</span>
                            </div>
                        </div>
                    </>
                    : <div>
                        <div className="card card-compact w-1/3 bg-base-100 shadow-xl ">
                            <div className="card card-compact  shadow-xl mb-5 ml-20">
                                <div className="card-body">
                                    <h1>Temprature  :{item.Temprature}</h1>
                                    <h1>Electronics :{item.Electonics}</h1>
                                    <h1>Air Qiality :{item.AirQ}</h1>
                                    <h1> Date       :{item.Date}</h1>
                                </div>
                            </div>
                        </div>
                    </div>)

            } */}



        </div>
        <div className='flex gap-6'>
            <div className="card card-compact w-96 bg-base-100 shadow-xl text-center">
                <div className="card-body bg-slate-200 border-e-current card card-compact w-96 shadow-xl text-center">
                    <h2 className="card-title ">Temperature</h2>

                    <h1 className='card-title'>{Data && Data.Temperature} °C</h1>
                    {
                        Data && Data.Temperature >= 25 ? Data && Data.Temperature && <h1 className='bg-red-400 font-bold h-8'>Risk</h1> : Data && Data.Temperature && <h1 className='bg-green-300 card-title items-center'>Normal</h1>
                    }
                </div>
            </div>


            <div className="card-body bg-slate-200 border-e-current card card-compact w-96 shadow-xl text-center">
                <div className="card-body">
                    <h2 className="card-title">Moisture</h2>
                    <h1 className={`card-title text-center  ${Data && Data.Moisture === "Normal" ? "bg-green-400" : "bg-red-500"}`}>{Data && Data.Moisture}</h1>
                </div>
            </div>


            <div className="card-body bg-slate-200 border-e-current card card-compact w-96 shadow-xl text-center">
                <div className="card-body">
                    <h2 className="card-title">Humidity</h2>
                    <h1 className={`card-title text-center  ${Data && Data.Humidity === "Normal" ? "bg-green-400" : "bg-red-500 "}`}>{Data && Data.Humidity}</h1>

                </div>
            </div>
        </div>

        <div className='flex '>
            <div className={`card-title container text-black ml-5 mt-20 mb-32 bg-slate-300  ${Data && Data.Temperature <= 25 && Data.Humidity === "Normal" && Data.Alarm_Working === "Yes" && Data.Moisture === "Normal" ? "bg-green-500 text-center" : "bg-red-500 text-center"}`}>
                <div className="card-body border-e-current w-96 shadow-xl text-center">
                    <div className="card-body">
                        <h1>{Data && Data.Temperature >= 25 && "Problem In Temperature Section"}</h1>
                        <h1>{Data && Data.Moisture === "Risk" && "Problem In Electonics Section"}</h1>
                        <h1>{Data && Data.Humidity === "Risk" && "Problem In Humidity Section"}</h1>
                        <h1>{Data && Data.Alarm_Working === "No" && "Problem In Alarm Working Section"}</h1>
                        <div>
                            {
                                Data && Data.Temperature <= 25
                                    ? <>
                                        <div className="card card-compact  w-96 bg-green-600 shadow-xl mt-6 ml-11">
                                            <div className="card-body">
                                                <h1><b>Temperature :{Data && Data.Temperature}</b></h1>
                                                <h1>Moisture :{Data && Data.Moisture}</h1>
                                                <h1>Humidity :{Data && Data.Humidity}</h1>
                                                <h1>Date :{Data && Data.Date}</h1>
                                            </div>
                                        </div></>
                                    :
                                    <>
                                        {Data && <div className="card card-compact w-96 bg-red-500 shadow-xl mt-6 ml-11">
                                            <div className="card-body">
                                                <h1><b>Temperature :{Data && Data.Temperature}</b></h1>
                                                <h1>Electonics :{Data && Data.Electonics}</h1>
                                                <h1>Air Quality :{Data && Data.AirQ}</h1>
                                                <h1>Date :{Data && Data.Date}</h1>
                                            </div>
                                        </div>}
                                    </>
                            }
                        </div>

                    </div>
                </div>

            </div>
            <div>

            </div>
            <div>
                {/* <img className='mt-24' height={100} width={800} src="/map.jpg" alt="" /> */}

            </div>


        </div>
        {/* <div className='flex gap-3 mt-4 ml-4 mr-3'>
            <div className="card w-96 bg-neutral text-neutral-content">
                <div className="card-body ">



                    <div className="card-actions justify-end">
                    </div>
                    <div className="card-title">Bhopal Tragedy :<br></br> 1984</div>
                    <img src="https://img.jagranjosh.com/imported/images/E/GK/Bhopal-Gas-Tragedy.webp" alt="" />
                    <h1> The Bhopal Treagedy , also known as
                        the Bhopal Gas Disaster, occured on the
                        night of December 2-3 1984, in Bhopal,
                        India.
                    </h1>
                    <p> A delayed gas leak from the
                        Union Carbid India Limited (UCIL) pesticide
                        plant resulted inthe release of toxic methyl isocyanate (MIC) gas,
                        affecting thousands of people. </p>
                    <p> The incident led to the loss of 3,787 lives and
                        caused server health issues for survivers and their
                        future generations. </p>
                    <p> Date: 2 December 1984 </p>
                    <p> Location: Bhopal, India </p>
                    <p> Cause: resulted inthe release of toxic methyl isocyanate (MIC) gas </p>




                </div>
            </div >


            <div className="card w-96 bg-neutral text-neutral-content">
                <div className="card-body ">
                    <div className="card-actions justify-end">
                    </div>
                    <div className="card-title">Jaipur Oid Depot : <br></br> 2009</div>
                    <img src="https://i.ndtvimg.com/mt/2009-10/jaipurfirenewstory.jpg" alt="" />
                    <h1> Jaipur Oil Depot </h1>
                    <p> The Jaipur oil depot fire broke out on 29 October 2009 at 7:30 PM at the Indian Oil Corporation (IOC)</p>
                    <p>The blaze continued to rage out of control for over a week after it started and during the period half a million
                    </p>
                    <p>peopl were evacuated from the area.The oil depot is about 16 kilometres (9.9 mi) south of the city of Jaipur. </p>
                    <p>
                    </p>
                    <p> Date: 29 October 2009 </p>
                    <p> Location: Sitapura Industrial Area on the outskirts of Jaipur, Rajasthan. </p>
                    <p> Cause: The explosion was caused by a leak from a valva at the bottom of a tank containing motor spirit The fire
                        was blamed on non-observance of normal safety procedures.</p>
                    <p> Deaths: 12 </p>
                    <p> Injured: Over 30 </p>
                    <p> Loss: worth Rs 2.80 billion.</p>
                </div>
            </div >

            <div className="card w-96 bg-neutral text-neutral-content">
                <div className="card-body ">
                    <div className="card-actions justify-end">
                    </div>
                    <div className="card-title"> Visakhapatnam Gas Leak  :   2020 </div>
                    <img src="https://www.devdiscourse.com/remote.axd?https://devdiscourse.blob.core.windows.net/devnews/06_07_2020_15_11_36_0638791.jpg?width=920&format=webp" alt="" />
                    <h1> Visakhapatnam Gas Leak </h1>
                    <p> The early morning of 7 May 2020. The resulting vapour cloud spread over a radius of around 3.0 km (1.9 mi),
                        affecting the nearby areas and villages. </p>
                    <p> a computer glitch in the factory's cooling system allowed temperatures in the storage tanks to exceed safe levels,
                    </p>
                    <p>causing the styrene to vaporize. Between 2:30 a.m. and 3:00 a.m., when maintenance activity was in progress, the
                    </p>
                    <p>styrene gas leaked from the plant and spread to nearby villages. and storing the styrene monomer, improper </p>
                    <p>storage, and operation errors</p>
                    <p> Date: 7 May 2020 </p>
                    <p> Location: Visakhapatnam, Andhra Pradesh</p>
                    <p> Cause: a computer glitch in the factory's cooling system </p>
                    <p> Deaths: 11 People </p>
                    <p> injured: more then 1000 people sick </p>
                    <p> Loss: - </p>
                </div>
            </div >

            <div className="card w-96 bg-neutral text-neutral-content">
                <div className="card-body ">
                    <div className="card-actions justify-end">
                    </div>
                    <div className="card-title"> Bhrahmapuram fire <br />:2023 </div>
                    <img src="https://img.onmanorama.com/content/dam/mm/en/kerala/top-news/images/2023/3/9/brahmapuram-fire-pic33.jpg" alt="" />
                    <h1> Bhrahmapuram fire </h1>
                    <p> In March 2023, a major fire broke out at the 110-acre Bhrahmapuram landfill site at Bhrahmapuram in </p>
                    <p> Puthankurish Panchayat, 17 km away from Kocho city. </p>
                    <p> The fire began on 2 March 2023 at around 3'o clock in the afternoon.</p>
                    <p> This was the fifth time that the garbage dump caught fire at Bhrahmapuram, but this time the condition of</p>
                    <p> Due to the high level of air pollution after the fire in Ernakulam district, many people experienced cough,</p>
                    <p> difficulty in breathing, headache, dizziness, eye discomfort and itching. It took 12-13 days for the fire to</p>
                    <p> be brought under control. </p>
                    <p> Many people suffered from suffocation and dizziness and had to seek medical help. </p>

                    <p> this fire was serious. </p>
                    <p> Date: 2 March 2023 </p>
                    <p> Location: Bhrahmapur </p>
                    <p> cause: Probabilitya that the fire broken out from the thick layer of dry plastic </p>
                </div>
            </div >


        </div> */}
        <div className='flex justify-center'>
            <div className="card card-compact w-96 bg-base-100 shadow-xl">
                <div className='bg-slate-300 ml-24'>
                    <div className="card-body">
                        <div className="card-actions justify-end">
                        </div>
                        <div className="card-title">Previous Tragedies : </div>
                        <img src="https://img.onmanorama.com/content/dam/mm/en/kerala/top-news/images/2023/3/9/brahmapuram-fire-pic33.jpg" alt="" />
                        <h1> Bhrahmapuram fire </h1>
                        <p> In March 2023, a major fire broke out at the 110-acre Bhrahmapuram landfill site at Bhrahmapuram in </p>
                        <p> Puthankurish Panchayat, 17 km away from Kocho city. </p>
                        <button onClick={e => navigate("/his")} className="btn btn-outline">Read More </button>
                    </div>
                </div>
            </div>
            <div className="card card-compact w-96 bg-base-100 shadow-xl">
                <div className='bg-slate-300 ml-24'>
                    <div className="card-body">
                        <div className="card-actions justify-end">
                        </div>
                        <div className="card-title">Insruction : </div>
                        <img src="https://static.helpjuice.com/helpjuice_production/uploads/upload/image/4752/direct/1660964116996-Instruction%20Manual.jpg" alt="" />
                        <h1> Instructioins</h1>
                        <p> Puthankurish Panchayat, 17 km away from Kocho city. </p>
                        <button onClick={e => navigate("/his")} className="btn btn-outline">Read More </button>
                    </div>
                </div>
            </div>
            <div className="card card-compact w-96 bg-base-100 shadow-xl">
                <div className='bg-slate-300 ml-24'>
                    <div className="card-body">
                        <div className="card-actions justify-end">
                        </div>
                        <div className="card-title">Does And don't : </div>
                        <img src="https://t3.ftcdn.net/jpg/04/75/94/12/240_F_475941280_QnmtdrHJMnBmfd43oKT0bcu0VicPz5e3.jpg" alt="" />
                        <p> Puthankurish Panchayat, 17 km away from Kocho city. </p>
                        <button onClick={e => navigate("/his")} className="btn btn-outline">Read More </button>
                    </div>
                </div>
            </div>
        </div>


    </>
}

export default Temprature
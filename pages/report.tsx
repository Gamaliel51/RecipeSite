/* eslint-disable @next/next/no-html-link-for-pages */
import axios from "axios"
import Head from "next/head"
import { FormEvent, useState } from "react"



export default function Report(){
    const [dishName, setDishName] = useState('')
    const [problem, setProblem] = useState('')
    const [success, setSuccess] = useState(false)
    const[fail, setFail] = useState(false)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const response = await axios.post('/api/reportDish', {dishname: dishName, problem: problem})
        const result = response.data

        if(result.status === 'ok'){
            setSuccess(true)
            return
        }
        setFail(true)
        return
    }

    if(success){
        return(
            <>
                <Head>
                    <title>Report Dish</title>
                    <meta name="description" content="Make a report about a probem on the website" />
                    <meta name="keywords" content="report, recipe, kings, recipe kings, recipekings, us" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/crown.png" />
                </Head>
                <div className="h-screen w-full bg-diner">
                    <div className="w-11/12 lg:w-1/2 h-3/4 mx-auto relative top-20 text-center bg-white">
                        <i className="fa fa-circle-check fa-6x top-1/3 relative text-black"></i>
                        <p className="relative top-2/4 text-black text-2xl italic">Report Successful</p>
                    </div>
                    <aside className="flex flex-col space-y-2 fixed z-30 right-1 bottom-10">
                        <a href="/">
                        <div className="group w-16 h-16 bg-white rounded-full flex justify-center items-center hover:bg-black hover:text-white cursor-pointer shadow-2xl">
                            <i className="fa fa-home fa-2x"></i>
                            <span className="group-hover:opacity-100 transition-opacity bg-gray-800 p-1 text-sm text-gray-100 rounded-md absolute left-1/2 -top-20 -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">Home</span>
                        </div>
                        </a>
                        <a href="/suggest">
                        <div className="group w-16 h-16 bg-white rounded-full flex justify-center items-center hover:bg-black hover:text-white cursor-pointer shadow-2xl">
                            <i className="fa fa-handshake-angle fa-2x"></i>
                            <span className="group-hover:opacity-100 transition-opacity bg-gray-800 p-1 text-sm text-gray-100 rounded-md absolute left-1/2 -top-20 -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">Suggest</span>
                        </div>
                        </a>
                        <a href="/report">
                        <div className="group w-16 h-16 bg-white rounded-full flex justify-center items-center hover:bg-black hover:text-white cursor-pointer shadow-2xl">
                            <i className="fa fa-flag fa-2x"></i>
                            <span className="group-hover:opacity-100 transition-opacity bg-gray-800 p-1 text-sm text-gray-100 rounded-md absolute left-1/2 -top-20 -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">Report</span>
                        </div>
                        </a>
                    </aside>
                </div>
            </>
        )
    }
  
    if(fail){
        return(
            <>
                <Head>
                    <title>Report Dish</title>
                    <meta name="description" content="Make a report about a probem on the website" />
                    <meta name="keywords" content="report, recipe, kings, recipe kings, recipekings, us" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/crown.png" />
                </Head>
                <div className="h-screen w-full bg-diner">
                    <div className="w-11/12 lg:w-1/2 h-3/4 mx-auto relative top-20 text-center bg-white">
                        <i className="fa fa-times-circle fa-6x top-1/3 relative text-black"></i>
                        <p className="relative top-2/4 text-black lg:text-2xl italic">An Error Occurred. Please Try Again.</p>
                    </div>
                    <aside className="flex flex-col space-y-2 fixed z-30 right-1 bottom-10">
                        <a href="/">
                        <div className="group w-16 h-16 bg-white rounded-full flex justify-center items-center hover:bg-black hover:text-white cursor-pointer shadow-2xl">
                            <i className="fa fa-home fa-2x"></i>
                            <span className="group-hover:opacity-100 transition-opacity bg-gray-800 p-1 text-sm text-gray-100 rounded-md absolute left-1/2 -top-20 -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">Home</span>
                        </div>
                        </a>
                        <a href="/suggest">
                        <div className="group w-16 h-16 bg-white rounded-full flex justify-center items-center hover:bg-black hover:text-white cursor-pointer shadow-2xl">
                            <i className="fa fa-handshake-angle fa-2x"></i>
                            <span className="group-hover:opacity-100 transition-opacity bg-gray-800 p-1 text-sm text-gray-100 rounded-md absolute left-1/2 -top-20 -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">Suggest</span>
                        </div>
                        </a>
                        <a href="/report">
                        <div className="group w-16 h-16 bg-white rounded-full flex justify-center items-center hover:bg-black hover:text-white cursor-pointer shadow-2xl">
                            <i className="fa fa-flag fa-2x"></i>
                            <span className="group-hover:opacity-100 transition-opacity bg-gray-800 p-1 text-sm text-gray-100 rounded-md absolute left-1/2 -top-20 -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">Report</span>
                        </div>
                        </a>
                    </aside>
                </div>
            </>
        )
    }

    return(
        <>
            <Head>
                <title>Report Dish</title>
                <meta name="description" content="Make a report about a probem on the website" />
                <meta name="keywords" content="report, recipe, kings, recipe kings, recipekings, us" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/crown.png" />
            </Head>
            <main className="h-auto w-full min-h-screen flex bg-diner">
                <form action="/api/reportDish" method="post" onSubmit={handleSubmit} className="h-96 w-11/12 lg:w-2/5 m-auto bg-white flex flex-col rounded-md">
                    <h4 className="italic font-semibold text-3xl w-full text-center">Report Problem</h4>
                    <input type="text" placeholder="Enter Dish Name" value={dishName} onChange={(e) => setDishName(e.target.value)} className="w-4/5 h-10 mx-auto border border-y-2 border-x-2 bg-gray-300 my-10 px-2"/>
                    <textarea placeholder="Describe the Issue" value={problem} onChange={(e) => setProblem(e.target.value)}  className="w-4/5 h-28 mx-auto border border-y-2 border-x-2 bg-gray-300"/>
                    <button type="submit" className="text-white bg-slate-800 w-3/5 h-12 mx-auto mt-5 hover:scale-105 duration-700">Make Report</button>
                </form>
                <aside className="flex flex-col space-y-2 fixed z-30 right-1 bottom-10">
                    <a href="/">
                    <div className="group w-16 h-16 bg-white rounded-full flex justify-center items-center hover:bg-black hover:text-white cursor-pointer shadow-2xl">
                        <i className="fa fa-home fa-2x"></i>
                        <span className="group-hover:opacity-100 transition-opacity bg-gray-800 p-1 text-sm text-gray-100 rounded-md absolute left-1/2 -top-20 -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">Home</span>
                    </div>
                    </a>
                    <a href="/suggest">
                    <div className="group w-16 h-16 bg-white rounded-full flex justify-center items-center hover:bg-black hover:text-white cursor-pointer shadow-2xl">
                        <i className="fa fa-handshake-angle fa-2x"></i>
                        <span className="group-hover:opacity-100 transition-opacity bg-gray-800 p-1 text-sm text-gray-100 rounded-md absolute left-1/2 -top-20 -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">Suggest</span>
                    </div>
                    </a>
                    <a href="/report">
                    <div className="group w-16 h-16 bg-white rounded-full flex justify-center items-center hover:bg-black hover:text-white cursor-pointer shadow-2xl">
                        <i className="fa fa-flag fa-2x"></i>
                        <span className="group-hover:opacity-100 transition-opacity bg-gray-800 p-1 text-sm text-gray-100 rounded-md absolute left-1/2 -top-20 -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">Report</span>
                    </div>
                    </a>
                </aside>
            </main>
        </>
    )
}
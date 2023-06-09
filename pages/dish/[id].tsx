/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import Head from "next/head"
import { Courgette } from 'next/font/google'
import { useRouter } from "next/router"
import { NextPageContext } from "next"
import { CompositeDishData } from "@/components/types"
import parse from 'html-react-parser'


const courgette = Courgette({
    weight: ["400", "400"],
    subsets: ["latin"],
    variable: "--font-courgette"
})  

export async function getServerSideProps(context: NextPageContext) {
    const { id } = context.query
    const { req } = context
    let baseUrl = req ? `https://${req.headers.host}` : '';
    const res = await fetch(`${baseUrl}/api/dish/${id}`)
    const data = await res.json()
  
    if(data.status === 'ok'){
      let temp = data.payload
      return { props: { data: temp } }
    }
  }
  


export default function DishEx(props: any){
    
    const info: CompositeDishData = props.data
    const link = info.dishpicture
    const procedure = info.procedure
    
    const render = () => {
        const element = parse(procedure)
        return element
    }

    return(
        <>
            <Head>
                <title>{info.dishname}</title>
                <meta name="description" content={`recipe for ${info.dishname}`} />
                <meta name="keywords" content={`find, search, recipe, kings, recipe kings, recipekings, us, ${info.dishname}`} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/crown.png" />
            </Head>
            <main className="h-auto min-h-screen w-full bg-diner overflow-auto">
                <div className="h-full min-h-screen w-10/12 mx-auto flex flex-col bg-slate-800">
                    <section className="h-96 w-4/5 lg:w-4/5 mx-auto flex flex-row relative">
                        <section className="lg:basis-1/4 lg:blur-md hidden lg:inline bg-fixed" style={{backgroundImage: `url(${link})`}}></section>
                        <section className="lg:basis-1/2 h-full w-full lg:w-0 flex items-center relative">
                            <img className="w-full h-full" src={link} alt="photo"/>
                            <div className="w-full h-full bg-gradient-to-tr from-black to-blue-400 opacity-40 absolute  "></div>
                            <h4 className={`text-2xl lg:text-5xl text-white absolute z-10 left-5 top-10 ${courgette.className}`}>{info.dishname}</h4>
                            
                        </section>
                        <section className="lg:basis-1/4 lg:blur-md hidden lg:inline bg-fixed" style={{backgroundImage: `url(${link})`}}></section>
                    </section>
                    <section className="min-h-screen w-4/5 lg:w-4/5 mx-auto bg-white text-black overflow-auto">
                        <section className="w-full h-16 overflow-y-hidden whitespace-nowrap my-5 overflow-x-auto flex flex-row bg-slate-700 text-white py-5 px-2">
                            Ingredients: {info.ingredients.map((item) => {
                                return `${item}, `
                            })}
                        </section>
                        <div className="h-screen mx-5">
                            <iframe srcDoc={procedure} className="w-full h-full"></iframe>
                        </div>
                    </section>
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
            </main>
        </>
    )
}
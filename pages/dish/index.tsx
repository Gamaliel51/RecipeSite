/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { Courgette } from 'next/font/google'
import Image from "next/image";

const courgette = Courgette({
    weight: ["400", "400"],
    subsets: ["latin"],
    variable: "--font-courgette"
})  


export default function Dish() {

    const link = 'https://i0.wp.com/evseats.com/wp-content/uploads/2015/08/How-To-Make-Jollof-Rice-In-5-Easy-Steps-1.jpg?w=890&ssl=1'

    return(
        <>
            <Head>
                <title>Dish Name</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="h-screen lg:h-auto md:h-screen sm:h-screen w-auto flex flex-col bg-slate-800">
                <section className="h-96 w-4/5 lg:w-3/5 mx-auto flex flex-row relative">
                    <section className="lg:basis-1/4 lg:blur-md hidden lg:inline bg-fixed" style={{backgroundImage: `url(${link})`}}></section>
                    <section className="lg:basis-1/2 h-full w-full lg:w-0 flex items-center relative">
                        <img className="w-full h-full" src={link} alt="photo"/>
                        <div className="w-full h-full bg-gradient-to-tr from-black to-blue-400 opacity-40 absolute  "></div>
                        <h4 className={`text-5xl text-white w-full h-full absolute left-1/4 top-1/2 ${courgette.className}`}>Jollof Rice</h4>
                    </section>
                    <section className="lg:basis-1/4 lg:blur-md hidden lg:inline bg-fixed" style={{backgroundImage: `url(${link})`}}></section>
                </section>
                <section className="h-full lg:h-96 md:h-full sm:h-full w-4/5 lg:w-3/5 mx-auto bg-white">

                </section>
            </main>
        </>
    )
}
import Head from "next/head";
import { Courgette } from 'next/font/google'
import { useRouter } from "next/router";

const courgette = Courgette({
    weight: ["400", "400"],
    subsets: ["latin"],
    variable: "--font-courgette"
})

export default function About(){

    const router = useRouter()

    const redirectHome = (e: any) => {
        e.preventDefault()
        router.push('/')
    }

    return(
        <>
            <Head>
                <title>About Us</title>
                <meta name="description" content="what recipe kings are all about" />
                <meta name="keywords" content="about, recipe, kings, recipe kings, recipekings, us" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/crown.png" />
            </Head>
            <main className="h-auto w-full min-h-screen bg-slate-800">
                <nav className="w-3/4 h-28 mx-auto bg-slate-500 cursor-pointer" onClick={redirectHome}>
                    <div className='h-full w-full flex flex-row items-center justify-center'>
                        <p className=" text-5xl lg:text-7xl md:text-6xl sm:text-5xl">🎊</p>
                        <i className='fa fa-crown text-5xl lg:text-7xl md:text-6xl sm:text-5xl text-orange-300'></i>
                        <h2 className='font-semibold text-white lg:text-5xl md:text-3xl sm:text-3xl italic ml-3'>RecipeKing </h2>
                        <p className=" text-5xl lg:text-7xl md:text-6xl sm:text-5xl">🎊</p>
                    </div>
                </nav>
                <section className="h-auto w-3/4 min-h-screen bg-white mx-auto py-10 px-10">
                    <section className="w-full h-fit flex flex-row">
                        <p className={`${courgette.className} basis-auto lg:basis-3/5 italic lg:text-4xl leading-relaxed tracking-wide text-blue-300`}>
                            Welcome to Recipe Kings, your go-to source for delicious, mouth-watering recipes 
                            that are fit for royalty! Our mission is simple: to help you unleash your inner chef 
                            and create meals that will impress even the most discerning taste buds.
                        </p>
                        <div className="blobB ml-5 hidden lg:inline-block">
                            <div className="blob"></div>
                        </div>
                    </section>
                    <section className="w-full h-fit mt-10">
                        <p className={`${courgette.className} italic lg:text-4xl leading-relaxed tracking-wide text-slate-800`}>
                            At Recipe Kings, we understand that cooking can be both a pleasure and a challenge. 
                            Whether you&apos;re an experienced home cook or just starting out in the kitchen, we&apos;ve got you covered. 
                            Our team of expert recipe developers has created a wide range of recipes that are easy to follow and 
                            guaranteed to deliver amazing results every time.
                        </p>
                    </section>
                    <section className="w-full h-fit mt-10">
                        <p className={`${courgette.className} italic lg:text-4xl leading-relaxed tracking-wide text-slate-800`}>
                            At Recipe Kings, we believe that cooking should be fun and accessible to everyone.
                            That&apos;s why we&apos;ve designed our website to be user-friendly and easy to navigate. 
                            You can search for recipes by selecting the ingredients you have at hand.
                        </p>
                        <p className="italic text-blue-300 text-sm mt-5">
                          - P.S I got lazy here  
                        </p>
                    </section>
                </section>
                <aside className="flex flex-col space-y-2 fixed z-30 right-10 bottom-10">
                    <a href="http://www.twitter.com" target="_blank">
                        <div className="w-16 h-16 bg-white rounded-full flex justify-center items-center hover:bg-black hover:text-white cursor-pointer shadow-2xl">
                            <i className="fa-brands fa-twitter fa-2x"></i>
                        </div>
                    </a>
                    <a href="http://www.facebook.com" target="_blank">
                        <div className="w-16 h-16 bg-white rounded-full flex justify-center items-center hover:bg-black hover:text-white cursor-pointer shadow-2xl">
                            <i className="fa-brands fa-facebook fa-2x"></i>
                        </div>
                    </a>
                    <a href="http://miraclegames5@gmail.com" target="_blank">
                        <div className="w-16 h-16 bg-white rounded-full flex justify-center items-center hover:bg-black hover:text-white cursor-pointer shadow-2xl">
                            <i className="fa-brands fa-google fa-2x"></i>
                        </div>
                    </a>
                </aside>
            </main>
        </>
    )
}
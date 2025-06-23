// import { testUnauthorizedToken } from "../api/authService";
export default function HeroWelcome({scrollToSection}) {
    return (
        <section id="section-0"
            className="min-h-screen flex flex-col justify-center items-start px-6 md:px-12 lg:px-24 ">
            <div className="max-w-4xl">
                <div className="mb-4">
                    <img
                        src={"https://www.vallartaplus.com/images/logos/vallartaplus_1.webp"}
                        className="w-[120px]  flex-shrink-0 mt-0.5"
                        alt={'Vallarta Plus Logo'}
                    />
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-blue-800 mb-6 leading-tight">
                    Más que un viaje,
                    <br />
                    <span className="text-blue-800">una experiencia exclusiva.</span>
                </h1>
                <p className="text-lg md:text-xl text-green-600 font-medium mb-8 max-w-2xl">
                    Descubre los beneficios únicos de cada membresía y viaja con privilegios
                </p>
             <div className="flex justify-between mt-10 gap-4">
                <button
                    onClick={() => scrollToSection(1)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-4 text-lg rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                    DESCUBRIR MÁS
                </button>


                {/* Con fines de prueba para no esperar a que expire el token */}
                {/* <button
                    onClick={() => testUnauthorizedToken()}
                    className="bg-gray-400 hover:bg-gray-500 text-black font-bold px-8 py-4 text-md rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                    *Probar renovar token
                </button> */}
                </div>
            </div>
        </section>
    );
}
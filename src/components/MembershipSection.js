export default function MembershipSection({ level, benefits, points, sectionIndex }) {
    return (
        <section id={`section-${sectionIndex}`} className={`min-h-screen flex items-center py-16 md:py-1`}>
            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="space-y-8">
                        {/*HEADER*/}
                        <div className="flex items-center space-x-2 md:space-x-6">
                            <div className="w-[100px] h-[100px] flex items-center justify-center md:w-24 md:h-24">
                                <img
                                    className="object-cover w-full md:h-full"
                                    src={level.circle_image}
                                    alt={level.name_es}
                                />
                            </div>
                            <h2 className={`text-4xl md:text-5xl font-bold`}>{level.name_es}</h2>
                        </div>

                        {/*LISTA DE BENEFICIOS */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Beneficios disponibles</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {benefits.map((benefit) => {
                                    //Obtenemos el nivel actual del beneficio utilizando el key del nivel
                                    const levelData = benefit.levels_es?.[level.key]
                                    if (!benefit.active || !levelData || (typeof levelData === "object" && levelData.apply === false)) return null

                                    const label = typeof levelData === "string" ? levelData : levelData.text

                                    return (
                                        <div key={benefit.key} className="flex items-start space-x-3 p-3 bg-white/70 rounded-lg shadow-sm">
                                            <img
                                                src={benefit.image_icon}
                                                alt={benefit.name_es}
                                                className="w-6 h-6 flex-shrink-0 mt-0.5"
                                            />
                                            <span className="text-gray-700 text-sm leading-relaxed">{label}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    {/* IMAGEN DE LA DERECHA */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="w-full max-w-md aspect-[5/3] relative overflow-hidden">
                            <img
                                className="w-full h-full object-cover rounded-3xl "
                                src={level.image_es}
                                alt={level.name_es}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
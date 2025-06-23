"use client"

import HeroWelcome from "../components/HeroWelcome"
import MembershipSection from "../components/MembershipSection"

export default function MembershipLanding({ info }) {
  const scrollToSection = (sectionIndex) => {
    const element = document.getElementById(`section-${sectionIndex}`)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }
  // Filtramos los niveles para excluir los ocultos
  const visibleLevels = info.levels.filter((level) => !level.hidden)

  return (
    <div className="min-h-screen bg-[#faf8ee] ">
      <HeroWelcome scrollToSection={scrollToSection} />

      {visibleLevels.map((level, index) => (
        <div key={level.key}>
          <div className="w-full h-px bg-gray-300 my-4"></div>
          <MembershipSection
            // key={level.key}
            level={level}
            benefits={info.benefits}
            points={info.points[level.key]}
            sectionIndex={index + 1}
          />
        </div>
      ))}
    </div>
  )
}

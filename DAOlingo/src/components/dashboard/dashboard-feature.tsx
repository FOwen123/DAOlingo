'use client'

import { UiLayout } from '../ui/ui-layout'
import { useState } from 'react'

export default function DashboardFeature() {
  const [openedBoxes, setOpenedBoxes] = useState<string[]>([]);

  const handleHover = (box: string) => {
    setOpenedBoxes((prev) => (
      prev.includes(box) ? prev : [...prev, box]
    ));
  };

  return (
  
    
      <main className="min-h-screen">
        {/* Section 1: Introduction */}
        <section
          className="h-screen bg-[#f2f2f2] text-[#000000] flex flex-col md:flex-row justify-between items-center p-8"
        >
          <div className="text md:max-w-1/2 text-left pr-8">
            <h1 className="text-6xl font-bold mb-6 text-[#03455B]" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)' }}>
              DAOlingo
            </h1>
            <p className="text-2xl">
              DAOlingo is a platform that combines education with blockchain technology, providing courses, games, and a voting system to make learning interactive and rewarding.
            </p>
          </div>
          <img
            src="/images/sec1.png"
            alt="Robot Teaching"
            className="h-auto max-h-full w-full md:w-auto object-contain rounded-lg shadow-lg"
          />
        </section>

        {/* Section 2: Diagram */}
        <section className="h-screen bg-[#f2f2f2] flex justify-center items-center p-8">
          <img
            src="/images/sec2.png"
            alt="Diagram"
            className="h-auto max-h-full max-w-full object-contain rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </section>

{/* Section 3: Additional Features */}
<section className="h-screen bg-[#f2f2f2] text-[#03455B] flex justify-center items-center">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full px-4">
    {/* Modules Box */}
    <div
      className="bg-[#FFF8D6] w-full h-80 md:h-96 p-6 rounded-2xl shadow-lg hover:shadow-xl relative hover:cursor-pointer flex flex-col items-center justify-center transition-transform duration-300 transform hover:scale-105"
    >
      <h3
        className="text-4xl font-bold mb-4 text-[#03455B]"
        style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)' }}
      >
        Modules
      </h3>
      <ul className="text-sm list-disc list-inside">
        <li className="text-lg mb-2 text-justify">Mentors</li>
        <p className="text-lg text-justify">Mentors upload modules for Apprentices, allowing them to vote for the content they want.</p>
        <p className="text-lg text-justify">Teach to Earn</p>
        <li className="text-lg text-justify">Apprentices</li>
        <p className="text-lg text-justify">Join the DAOlingo community and start your language learning journey, studying modules and voting on your favorites.</p>
      </ul>
    </div>

    {/* Votes Box */}
    <div
      className="bg-[#FFF8D6] w-full h-80 md:h-96 p-6 rounded-2xl shadow-lg hover:shadow-xl relative hover:cursor-pointer flex flex-col items-center justify-center transition-transform duration-300 transform hover:scale-105"
    >
      <h3
        className="text-4xl font-bold mb-4 text-[#03455B]"
        style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)' }}
      >
        Votes
      </h3>
      <p className="text-lg text-justify mb-2">
        We provide a system where user will have a say in what happens to the Platform itself. The user will be responsible to choose
      </p>
      <ul className="text-lg  list-disc list-inside mb-4">
        <li className="mb-2 text-justify">Modules</li>
        <li className='text-justify'>Platform decisions</li>
      </ul>
      <p className="text-lg text-justify">
        This allows users, both Mentors and Apprentices, to have a say in the platform.
      </p>
    </div>
  </div>
</section>


      </main>
  
  )
}

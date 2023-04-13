import React from 'react'

export default function Footer() {
  return (
    <footer className='fixed z-5 bottom-2 w-full bg-white h-6 flex justify-between items-center px-70'>

      <div className=''>
        <span>Airbnb 2023</span>
        <span> · Confidentialité</span>
        <span> · Conditions générales</span>
        <span> · Plan du site</span>
        <span> · Destinations</span>
        <span> · Infos sur l'entreprise</span>
      </div>

      <div className='flex'>
        <span className='mx-1'>€ EUR </span>
        <span className='mx-1'>- Francais (FR) </span>
        <span className='mx-1'>- Assistance et Ressources </span>
      </div>

    </footer>
  )
}

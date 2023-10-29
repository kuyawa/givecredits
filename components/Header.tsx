import React from 'react'
import Image from 'next/image';

const Header = () => {
  return (
    <>
      <header className='header mb-10 pb-10'>
        <Image src="/logo.png" className="logo" width={370} height={80} alt="" />
      </header>
      <style jsx>{`
                .header { border-bottom: 1px solid #F8FAFD; }
                .logo   { height: 60px; }
            `}</style>
    </>
  )
}

export default Header;
import React from 'react'

function ConsultPets() {
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div style={{ backgroundImage: "url('/bg.svg')", width: '400px', height: '100vh', backgroundRepeat: 'no-repeat' }}>
                <div className='w-full flex justify-between px-10 py-6 items-center'>
                    <h1 className='text-white w-full text-center'>Consultar Mascotas</h1>
                    <div className='w-[10%]'>
                        <Link to="/inicio"><img src="/btn-close.svg" alt="" /></Link>
                    </div>
                </div>
                <div className='w-full flex justify-center mt-8'>
                    <img src="/photo-lg-0.svg" alt="" />
                </div>
            </div>
        </div>
    )
}

export default ConsultPets
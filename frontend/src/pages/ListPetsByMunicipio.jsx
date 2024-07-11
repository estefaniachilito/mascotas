import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../utils/axiosClient'

function ListPetsByMunicipio() {
  const [ listPet, setListPet ] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosClient.get('http://localhost:3000/petByMunicipio')
        if (response.status == 200) {
          setListPet(response.data)
        }
      } catch (error) {
        console.log(error);
      }
    }

    getData()
  }, [])

  return (
    <div className='w-full h-screen flex justify-center items-center'>
            <div style={{ backgroundImage: "url('/bg.svg')", width: '400px', height: '100vh', backgroundRepeat: 'no-repeat' }}>
                <div className='w-full flex justify-between px-10 py-6 items-center'>
                    <h1 className='text-white w-full text-center'>Consultar Mascotas</h1>
                    <div className='w-[10%]'>
                        <Link to="/inicio"><img src="/btn-close.svg" alt="" /></Link>
                    </div>
                </div>
                <div className='w-full flex justify-center mt-8 px-5 flex-col gap-3 items-center text-white'>
                  {
                    listPet.map((l, index) => (
                      <p key={index}>{l.municipio}: {l.pets}</p>
                    ))
                  }
                </div>
            </div>
    </div>
  )
}

export default ListPetsByMunicipio
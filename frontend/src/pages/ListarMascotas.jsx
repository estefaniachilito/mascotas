import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

const TraerMascotas = () => {
    const [mascotas, setMascotas] = useState([]);

    const getMascotas = async () => {
        try {
            const response = await axios.get("http://localhost:3000/mascotas");
            if (response.status === 200) {
                setMascotas(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getMascotas();
    }, []);

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div style={{ backgroundImage: "url('/bg.svg')", width: '400px', height: '100vh', backgroundRepeat: 'no-repeat' }}>
                <div className='w-full flex justify-between px-10 py-6 items-center'>
                    <h1 className='text-white w-full text-center'>Administrar Mascotas</h1>
                    <div className='w-[10%]'>
                        <Link to="/"><img src="/btn-close.svg" alt="" /></Link>             
                    </div>
                </div>
                <div className='w-full flex justify-center items-center'>
                   <Link to="/create"><img src="/btn-add.svg" alt=""/></Link>
                </div>
                <div className='px-4 py-4'>
                    {mascotas.length > 0 ? (
                        <ul className='space-y-4'>
                            {mascotas.map((mascota, index) => (
                                <li key={index} className='text-blue-900'>
                                    <div className='flex justify-between items-center py-4 px-3 bg-white bg-opacity-60 rounded-xl'>
                                        <span>{mascota.photo}</span>
                                        <div className='flex flex-col'>
                                            <span>{mascota.pet_name}</span>
                                            <span className='text-sm text-blue-900'>{mascota.race_name}</span>
                                        </div>
                                        <div className='flex space-x-2'>
                                            <img src="/btn-show.svg" alt="Show" />
                                            <img src="/btn-edit.svg" alt="Edit" />
                                            <img src="/btn-delete.svg" alt="Delete" />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className='text-white'>No hay mascotas registradas.</p>
                    )}
                </div>
            </div>
        </div>
    );

};

export default TraerMascotas

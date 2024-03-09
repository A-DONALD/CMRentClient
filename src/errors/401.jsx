import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Unauthorized() {

    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800">401</h1>
                <p className="text-xl font-semibold text-gray-600">Unauthorized</p>
                <p className="mt-4 text-gray-700">Oups ! Vous n'êtes pas autorisé à accéder à la page que vous demandez</p>
                <p className="mt-4" style={{ fontSize: '20px' }}>
                    Go back to the <Link className='text-slate-400' to="/">Previous page</Link>.
                </p>
            </div>
        </div>
    )
}

export default Unauthorized
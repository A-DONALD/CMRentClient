import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800">404</h1>
                <p className="text-xl font-semibold text-gray-600">Page Not Found</p>
                <p className="mt-4 text-gray-700">Oups ! La page que vous recherchez se trouve peut-être dans une autre région</p>
                <p className="mt-4" style={{ fontSize: '20px' }}>
                    Please visit <Link className='text-slate-400' to="/">Page d'acceuil</Link>.
                </p>
            </div>
        </div>
    )
}

export default NotFound
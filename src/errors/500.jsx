import React from 'react'
import { Link } from 'react-router-dom'

function ServerError() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800">500</h1>
                <p className="text-xl font-semibold text-gray-600">Internal Server Error</p>
                <p className="mt-4 text-gray-700">Oops! Le serveur a rencontré une erreur et n'a pas été capable complèter votre requête.</p>
                <p className="mt-4" style={{ fontSize: '20px' }}>
                    Please visit <Link className='text-slate-400' to="/">Home page</Link>.
                </p>
            </div>
        </div>
    )
}

export default ServerError
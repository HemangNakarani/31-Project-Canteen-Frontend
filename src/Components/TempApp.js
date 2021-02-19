import React from 'react'
import { useGlobalContext } from '../Context/CartContext'

// components
import CartContainer from './CartContainer'
// items

function TempApp() {
  const { loading } = useGlobalContext()
  if (loading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    )
  }
  return (
    <main>
      <CartContainer />
    </main>
  )
}

export default TempApp

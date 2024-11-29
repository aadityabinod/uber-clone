import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios  from 'axios'


function CaptainLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {captain, setCaptain} =  useContext(CaptainDataContext)
    const navigate = useNavigate()

    const submitHandler = async(e)=>{
      e.preventDefault()

      try {

        const captain = {
          email: email,
          password: password
        }
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`, captain)

        if (response.status === 200) {
          const data = response.data
    
          setCaptain(data.captain)
          localStorage.setItem('token', data.token)
          navigate('/captain-home')
    
        }
    
        setEmail('')
        setPassword('')
        
      } catch (error) {
        console.error("login error:", error.response?.data || error.message);
        
      }
    } 

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />

        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            required
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>


          <input
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            required type="password"
            placeholder='password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />

          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >Login</button>

        </form>
        <p className='text-center'>Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
      </div>
      <div>
        <Link
          to='/login'
          className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin
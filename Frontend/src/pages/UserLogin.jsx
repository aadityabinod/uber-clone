import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'


function UserLogin() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})


  const {user, setUser} = useContext(UserDataContext)
  const navigate = useNavigate()

  const submitHandler = async(e)=>{
    e.preventDefault()
    try {
      const UserData = {
        email: email,
        password: password
      }
  
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, UserData)
  
      if(response.status === 200){
        const data = response.data
        setUser(data.user)
        localStorage.setItem('token', data.token)
        navigate('/home')
      }
  
      setEmail('')
      setPassword('')
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message)
      // Optional: Add user-friendly error display
    }
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
    <div>
      <img className='w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="" />

      <form onSubmit={(e) => {
          submitHandler(e)
        }}>
        <h3 className='text-lg font-medium mb-2'>What's your email</h3>
        <input
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
        <p className='text-center'>New here? <Link to='/signup' className='text-blue-600'>Create new Account</Link></p>
      </div>
      <div>
        <Link
          to='/captain-login'
          className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin
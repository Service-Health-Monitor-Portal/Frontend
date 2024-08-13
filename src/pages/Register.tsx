import logo from '../assets/logo.svg'
import registerImage from '../assets/Register.svg'
import { Formik } from "formik"
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Input from '../components/UI/Input'
import { useState } from 'react'

const Register = () => {
  const navigate = useNavigate()
  const schema = () =>
      Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required').max(30, 'Password must be at most 30 characters'),
        username: Yup.string().min(3, 'Username must be at least 3 characters').required('Username is required').max(30, 'Username must be at most 30 characters'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password')], 'Passwords must match')
          .required('Confirm Password is required'),
      })
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setConfirmPassword] = useState<boolean>(false)


  return (
    <>
      <img
        src={logo}
        alt="logo"
        className="mx-12 mt-10 lg:w-1/12 w-1/4"
        onClick={() => {
          navigate('/')
        }}
      />
      <div className="flex flex-col lg:flex-row justify-between h-full lg:pt-14 pt-1 px-10 lg:mx-12 mx-5">
        <Formik
          initialValues={{ email: '', password: '', username: '', confirmPassword: '' }}
          onSubmit={() => {
            navigate('/login')
          }}
          validationSchema={schema()}
        >
          {({ errors, handleSubmit, touched }) => (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 lg:gap-6 text-black">
              <div>
                <h1 className="lg:text-xl text-base md:text-xl text-white">
                  {' '}
                  <span className="text-green-200">U</span>sername
                </h1>

                <Input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  error={errors.username && touched.username ? true : false}
                />
                {errors.username && touched.username && <p className="text-red-500 -mb-4">{errors.username}</p>}
              </div>
              <div>
                <h1 className="lg:text-xl text-base md:text-xl text-white">
                  {' '}
                  <span className="text-green-200 md:text-xl">E</span>mail
                </h1>
                <Input
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  error={errors.email && touched.email ? true : false}
                />
                {errors.email && touched.email && <p className="text-red-500 -mb-4">{errors.email}</p>}
              </div>
              <div>
                <h1 className="lg:text-xl text-base md:text-xl text-white">
                  {' '}
                  <span className="text-green-200 md:text-xl">P</span>assword
                </h1>
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter your Password"
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  error={errors.password && touched.password ? true : false}
                />
                {errors.password && touched.password && <p className="text-red-500 -mb-4">{errors.password}</p>}
              </div>
              <div>
                <h1 className="lg:text-xl text-base md:text-xl text-white">
                  {' '}
                  <span className="text-green-200">C</span>onfirm Password
                </h1>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  showPassword={showConfirmPassword}
                  setShowPassword={setConfirmPassword}
                  error={errors.confirmPassword && touched.confirmPassword ? true : false}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="text-red-500 -mb-4">{errors.confirmPassword}</p>
                )}
              </div>
              <button
                type="submit"
                className="hover:border rounded-2xl text-white lg:h-12 md:text-xl lg:w-96 h-7 bg-gradient-to-bl from-[#101C49] to-[#000000] lg:text-xl text-base lg:mt-6 mt-4 w-[280px] md:w-[340px]"
              >
                Register
              </button>
            </form>
          )}
        </Formik>
        <img src={registerImage} alt="register" className="lg:w-3/6 lg:-mt-40 lg:px-12 w-10/12" />
      </div>
    </>
  )
}

export default Register

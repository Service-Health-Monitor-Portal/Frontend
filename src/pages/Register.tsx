import logo from '../assets/logo.svg'
import registerImage from '../assets/Register.svg'
import { Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import InputPasswordField from '../components/UI/InputPasswordField'
import { useState } from 'react'
import InputField from '../components/UI/InputField'

const Register = () => {
  const navigate = useNavigate()
  const schema = () =>
    Yup.object().shape({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required')
        .max(30, 'Password must be at most 30 characters'),
      username: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .required('Username is required')
        .max(30, 'Username must be at most 30 characters'),
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
        data-testid="logo"
        onClick={() => {
          navigate('/')
        }}
      />
      <div className="flex flex-col lg:flex-row justify-between items-center h-full lg:pt-14 pt-8 px-10 lg:mx-12 mx-5">
        <Formik
          initialValues={{ email: '', password: '', username: '', confirmPassword: '' }}
          onSubmit={(value) => {
            console.log(value)
          }}
          validationSchema={schema()}
        >
          {({ errors, handleSubmit, touched, values, handleChange, handleBlur }) => (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 lg:gap-6 text-black">
              <InputField
                type="text"
                text="Username"
                name="username"
                value={values.username}
                handelBlur={handleBlur}
                onChange={handleChange}
                placeholder="Enter your username"
                error={errors.username && touched.username ? true : false}
              />
              {errors.username && touched.username && (
                <p className="text-red-500 lg:-mt-5 -mt-2 -mb-4">{errors.username}</p>
              )}
              <InputField
                type="text"
                text="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                handelBlur={handleBlur}
                placeholder="Enter your email"
                error={errors.email && touched.email ? true : false}
              />
              {errors.email && touched.email && <p className="text-red-500 lg:-mt-5 -mt-2 -mb-4">{errors.email}</p>}
              <InputPasswordField
                name="password"
                text="Password"
                value={values.password}
                onChange={handleChange}
                placeholder="Enter your password"
                handleBlur={handleBlur}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                error={errors.password && touched.password ? true : false}
                dataTestid="showPassword"
              />
              {errors.password && touched.password && (
                <p className="text-red-500 lg:-mt-5 -mt-2 -mb-4">{errors.password}</p>
              )}
              <InputPasswordField
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                text="Confirm Password"
                placeholder="Confirm your password"
                handleBlur={handleBlur}
                showPassword={showConfirmPassword}
                setShowPassword={setConfirmPassword}
                error={errors.confirmPassword && touched.confirmPassword ? true : false}
                dataTestid="showConfirmPassword"
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <p className="text-red-500 lg:-mt-5 -mt-2 -mb-4">{errors.confirmPassword}</p>
              )}
              <button
                type="submit"
                className="hover:border rounded-2xl text-white lg:h-12 md:text-xl h-9  bg-gradient-to-bl from-[#101C49] to-[#000000] lg:text-xl text-base lg:mt-6 mt-4 w-full"
              >
                Register
              </button>
            </form>
          )}
        </Formik>
        <img src={registerImage} alt="register" className="lg:w-3/6 lg:-mt-40 hidden lg:pt-32 md:inline lg:px-12 w-9/12 mb-10" />
      </div>
    </>
  )
}

export default Register

import { HTMLAttributes } from 'react'
import { Field } from 'formik'
import ShowPasswordButton from './ShowPasswordButton'

interface IProps extends HTMLAttributes<HTMLInputElement> {
  type: string
  placeholder: string
  name: string
  showPassword?: boolean
  error: boolean | undefined
  setShowPassword?: ((value: boolean) => void) | undefined
}

const Input = ({ children, type, showPassword, setShowPassword, error, ...props }: IProps) => {
  if (type === 'password') {
    return (
      <div
        className={`${
          error ? 'border-2 px-4  border-red-500' : ''
        } 'border-2 px-4 rounded-2xl bg-white flex flex-row  lg:h-12 md:text-xl lg:w-96 h-7 border-blue-950'`}
      >
        {children}
        <Field type={showPassword ? 'text' : 'password'} className="w-full text-lg focus:outline-none" {...props} />
        <ShowPasswordButton showPassword={showPassword} setShowPassword={setShowPassword} />
      </div>
    )
  } else {
    return (
      <div
        className={`${
          error
            ? 'border-2 rounded-2xl lg:h-12 md:text-xl bg-white flex flex-row lg:w-96 h-7 px-4 focus:outline-red-500 border-red-500'
            : 'border-2  bg-white flex flex-row rounded-2xl lg:h-12 md:text-xl lg:w-96 h-7 border-blue-950 px-4 focus:outline-blue-800'
        }`}
      >
        {children}
        <Field type={type} className="w-full text-lg focus:outline-none" {...props} />
      </div>
    )
  }
}

export default Input

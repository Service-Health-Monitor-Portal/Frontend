import ShowPasswordButton from './ShowPasswordButton'

interface IProps {
  children?: React.ReactNode
  name: string
  placeholder: string
  error?: boolean | undefined
  value: string | number
  text: string
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  setShowPassword?: ((value: boolean) => void) | undefined
  showPassword?: boolean
  dataTestid?: string | undefined
}

const InputPasswordField = ({ children, showPassword, setShowPassword, error, dataTestid, value, onChange, text, name, placeholder, handleBlur}: IProps) => {
    return (
      <div>
        <label className="lg:text-xl text-base md:text-xl text-white" htmlFor={name}>
          <span className="text-green-200 md:text-xl">{text[0]}</span>
          {text.slice(1)}
        </label>
        <br />
        <div className="relative">
          {children}
          <input
            type={showPassword ? 'text' : 'password'}
            className={`${
              error ? 'border-2 px-4  border-red-500 focus:outline-red-500' : ''
            } 'border-2 px-4 rounded-2xl w-full text-base bg-white text-black flex flex-row  lg:h-12 md:text-xl lg:w-96 h-9 border-blue-950'`}
            id={name}
            name={name}
            value={value}
            onBlur={handleBlur}
            placeholder={placeholder}
            onChange={onChange}
          />
          <ShowPasswordButton showPassword={showPassword} setShowPassword={setShowPassword} showTestId={dataTestid} />
        </div>
      </div>
    )
}

export default InputPasswordField

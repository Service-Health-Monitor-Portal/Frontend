interface IInputField {
  name: string
  type: string
  placeholder?: string | undefined
  error?: boolean | undefined
  min?: number
  max?: number
  value: string | number
  text: string
  handelBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const InputField = ({ name, type, max, min, onChange, value, error, text, placeholder, handelBlur }: IInputField) => {
  // font-sans font-normal text-18 leading-[24.51px] text-white
  return (
    <div>
      <label className="lg:text-xl text-base md:text-xl text-white" htmlFor={name}>
        <span className="text-green-200 md:text-xl">{text[0]}</span>
        {text.slice(1)}
      </label>
      <br />
      <input
        className={`${
          error ? 'border-2 px-4  border-red-500 focus:outline-red-500' : ''
        } 'border-2 px-4 rounded-2xl w-full text-base bg-white text-black flex flex-row h-9 lg:h-12 md:text-xl lg:w-96 border-blue-950'`}
        type={type}
        id={name}
        name={name}
        min={min}
        max={max}
        placeholder={placeholder}
        value={value}
        onBlur={handelBlur}
        onChange={onChange}
      />
    </div>
  )
}

export default InputField

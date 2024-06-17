interface IInputField{
    name: string
    type: string
    min?: number
    max?: number
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputField = ({name, type, max, min, onChange, value}: IInputField) => {
       return (
        <div>
            <label htmlFor="name">name</label>
            <input type={type} id={name} name={name} min={min} max={max} value={value} onChange={onChange} />
        </div>
       ) 
}

export default InputField
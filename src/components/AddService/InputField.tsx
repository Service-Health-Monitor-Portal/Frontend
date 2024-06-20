interface IInputField {
  name: string;
  type: string;
  min?: number;
  max?: number;
    value: string | number;
    text: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputField = ({ name, type, max, min, onChange, value ,text}: IInputField) => {
  return (
    <div>
      <label
        className="font-sans font-normal text-18 leading-[24.51px] text-white"
        htmlFor= {name}
      >
        
        {text}
      </label>
      <br />
      <input
        className="font-sans font-normal text-base leading-6 bg-transparent border-[0.5px] border-gray-300 rounded-lg text-gray-300 h-9 focus:outline-none w-full"
        type={type}
        id={name}
        name={name}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;

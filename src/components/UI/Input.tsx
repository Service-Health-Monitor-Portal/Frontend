import { HTMLAttributes } from "react"

interface IProps extends HTMLAttributes<HTMLInputElement> {
   
}

const Input = ({ ...props}: IProps) => {
  return (
    <input className= ""{...props}>
      
    </input>
  )
}

export default Input
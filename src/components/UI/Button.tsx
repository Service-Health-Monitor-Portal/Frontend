import { HTMLAttributes, ReactNode } from "react"

interface IProps extends HTMLAttributes<HTMLButtonElement> {
    name: string,
    children?: ReactNode
}

const Button = ({name, children, ...props}: IProps) => {
  return (
    <button className="flex gap-2 items-center text-[#E1E1E1] bg-gradient-to-r from-[#101C49] to-[#000000] py-3 px-4 rounded-3xl" {...props}>
        {children} {name}
    </button>
  )
}

export default Button
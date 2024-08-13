import { LiaEyeSlashSolid, LiaEyeSolid } from 'react-icons/lia'

interface Props {
  showPassword: boolean | undefined
  setShowPassword: ((value: boolean) => void) | undefined
}

const ShowPasswordButton = ({ showPassword, setShowPassword}: Props) => {
  return (
    <button
      className="text-2xl text-blue-950"
      onClick={() => setShowPassword?.(!showPassword)}
      type="button"
    >
      {showPassword ? <LiaEyeSlashSolid /> : <LiaEyeSolid />}
    </button>
  )
}

export default ShowPasswordButton

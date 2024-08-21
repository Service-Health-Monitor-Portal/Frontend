import { LiaEyeSlashSolid, LiaEyeSolid } from 'react-icons/lia'

interface Props {
  showPassword: boolean | undefined
  setShowPassword: ((value: boolean) => void) | undefined
  showTestId : string |undefined
}

const ShowPasswordButton = ({ showPassword, setShowPassword, showTestId}: Props) => {
  return (
    <button
      className="text-2xl text-blue-950 absolute right-4 top-1/2 transform -translate-y-1/2"
      onClick={() => setShowPassword?.(!showPassword)}
      type="button"
      data-testid={showTestId}
    >
      {showPassword ? <LiaEyeSlashSolid /> : <LiaEyeSolid />}
    </button>
  )
}

export default ShowPasswordButton

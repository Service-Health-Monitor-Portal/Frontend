import { LiaEyeSlashSolid, LiaEyeSolid } from 'react-icons/lia'

interface Props {
  showPassword: boolean | undefined
  setShowPassword: ((value: boolean) => void) | undefined
  showTestId : string |undefined
}

const ShowPasswordButton = ({ showPassword, setShowPassword, showTestId}: Props) => {
  return (
    <button
      className="text-2xl text-blue-950"
      onClick={() => setShowPassword?.(!showPassword)}
      type="button"
      data-testid={showTestId}
    >
      {showPassword ? <LiaEyeSlashSolid /> : <LiaEyeSolid />}
    </button>
  )
}

export default ShowPasswordButton

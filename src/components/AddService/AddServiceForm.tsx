import { useState } from 'react'
import InputField from './InputField'
import Button from '../UI/Button'
import Plus from '../UI/Plus'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const AddServiceForm = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: '',
    success: 0,
    throttlingError: 0,
    dependencyError: 0,
    faultError: 0,
    invalidInputError: 0,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(data)
    axios
      .post('http://localhost:7000/api/v1/services', data)
      .then((res: any) => {
        console.log('Response:', res)
        toast.success('Service added successfully')
        navigate('/dashboard/' + res.data.id)
      })
      .catch((err) => {
        console.info('Error:', err.response.data)
        toast.error(err.response.data)
      })
  }

  return (
    <form className="w-72 flex flex-col gap-2" onSubmit={handleSubmit}>
      <InputField name="name" type="text" value={data.name} onChange={handleChange} text="Service Name" />
      <InputField
        name="success"
        type="number"
        value={data.success}
        min={0}
        max={100}
        onChange={handleChange}
        text="Success Rate"
      />
      <InputField
        name="dependencyError"
        type="number"
        value={data.dependencyError}
        min={0}
        max={100}
        onChange={handleChange}
        text="Dependency Error Rate"
      />

      <InputField
        name="invalidInputError"
        type="number"
        value={data.invalidInputError}
        min={0}
        max={100}
        onChange={handleChange}
        text="Invalid Input Error Rate"
      />
      <InputField
        name="throttlingError"
        type="number"
        value={data.throttlingError}
        min={0}
        max={100}
        onChange={handleChange}
        text="Throttling Error Rate"
      />
      <InputField
        name="faultError"
        type="number"
        value={data.faultError}
        min={0}
        max={100}
        onChange={handleChange}
        text="Fault Error Rate"
      />
      <Button name="Add Service">
        <Plus />
      </Button>
    </form>
  )
}
export default AddServiceForm

import { useState } from 'react'
import InputField from '../UI/InputField'
import Button from '../UI/Button'
import Plus from '../UI/Plus'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const AddServiceForm = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const [data, setData] = useState({
    name: '',
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
    // axios
    //   .post(`${process.env.LOG_ANALYZER_API_URL}/api/services?userId=${user.id}`, data, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${localStorage.getItem('token')}`,
    //     },
    //   })
    //   .then((res) => {
    //     console.log('Response:', res)
    //     toast.success('Service added successfully')
    //     navigate('/dashboard/' + res.data.id)
    //   })
    //   .catch((err) => {
    //     toast.error(err.response.data.name)
    //   })

    try {
      axios.post(`${process.env.LOG_ANALYZER_API_URL}/api/services?userId=${user.id}`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then((res) => {
        console.log('Response:', res)
        toast.success('Service added successfully')
        navigate('/dashboard/' + res.data.id)
      }).catch((err) => {
        toast.error(err.response.data.name || 'An error occurred')
      })
      
    } catch (error) {
      
    }
  }

  return (
    <form className=" w-auto flex flex-col gap-10" onSubmit={handleSubmit}>
      <InputField name="name" type="text" value={data.name} onChange={handleChange} text="Service Name" />
      <Button name="Add Service">
        <Plus />
      </Button>
    </form>
  )
}
export default AddServiceForm

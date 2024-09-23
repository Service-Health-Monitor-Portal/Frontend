import { useState } from 'react'
// import InputField from '../UI/InputField'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'


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
      <div className='flex flex-col gap-3'>
        <Label htmlFor="name">Email</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Service Name"
          value={data.name}
          onChange={handleChange}
          required
        />
      </div>
      <Button>
        Add Service
      </Button>
    </form>
  )
}
export default AddServiceForm

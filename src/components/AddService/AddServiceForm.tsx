import {useState} from 'react'
import InputField from './InputField'
import Button from '../UI/Button'
import Plus from '../UI/Plus'
const AddServiceForm = () => {
    const [data, setData] = useState({
        name: '',
        invalidInputErrorRate: 1,
        dependencyErrorRate: 1,
        throttlingErrorRate: 1,
        faultErrorRate: 1,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(data)
    }
    
    return (
        <form className='w-72 flex flex-col gap-2' onSubmit={handleSubmit}>
            <InputField
                name="name"
                type="text"
                value={data.name}
                onChange={handleChange}
                text="Service Name"
            />
             <InputField
                name="dependencyErrorRate"
                type="number"
                value={data.dependencyErrorRate}
                min={1}
                max={100}
                onChange={handleChange}
                text="Dependency Error Rate"

            />
           
           <InputField
                name="invalidInputErrorRate"
                type="number"
                value={data.invalidInputErrorRate}
                min={1}
                max={100}
                onChange={handleChange}
                text="Invalid Input Error Rate"

            />
             <InputField
                name="throttlingErrorRate"
                type="number"
                value={data.throttlingErrorRate}
                min={1}
                max={100}
                onChange={handleChange}
                text="Throttling Error Rate"

            />
             <InputField
                name="faultErrorRate"
                type="number"
                value={data.faultErrorRate}
                min={1}
                max={100}
                onChange={handleChange}
                text="Fault Error Rate"
            />
            <Button name="Add Service"><Plus /></Button>
        </form>
    )
}
export default AddServiceForm
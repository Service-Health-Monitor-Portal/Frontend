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
        <form onSubmit={handleSubmit}>
            <InputField
                name="name"
                type="text"
                value={data.name}
                onChange={handleChange}
            />
             <InputField
                name="dependencyErrorRate"
                type="number"
                value={data.dependencyErrorRate}
                min={1}
                max={100}
                onChange={handleChange}
            />
           
           <InputField
                name="invalidInputErrorRate"
                type="number"
                value={data.invalidInputErrorRate}
                min={1}
                max={100}
                onChange={handleChange}
            />
             <InputField
                name="throttlingErrorRate"
                type="number"
                value={data.throttlingErrorRate}
                min={1}
                max={100}
                onChange={handleChange}
            />
             <InputField
                name="faultErrorRate"
                type="number"
                value={data.faultErrorRate}
                min={1}
                max={100}
                onChange={handleChange}
            />
            <Button name="Add Service"><Plus /></Button>
        </form>
    )
}
export default AddServiceForm
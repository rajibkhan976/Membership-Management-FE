import { useEffect } from 'react'

const FakeDivForSegment = ({ value, setFieldValue, name }: any) => {
    useEffect(() => {
        setFieldValue(name, value)
    }, [name, setFieldValue, value])
    return (
        <>
            {value}
        </>
    )
}

export default FakeDivForSegment

import { useRouter } from 'next/router'
import axios from 'axios'
import useSWR from 'swr'

import StatsByDay from './StatsByDay'

const fetcher = async url => {
    try {
        const [, , day] = url.split('/')
        const baseURL = '/api/statsByDay'
        const endpoint = day ? `${baseURL}?day=${day}` : baseURL

        const { data } = await axios.get(endpoint)

        return data
    } catch (error) {
        return error
    }
}

export default function StatsWithSWR() {
    const { asPath } = useRouter()
    const { data } = useSWR(asPath, fetcher, {
        refreshInterval: 30000, // Check for new data every 30 seconds
    })

    return <StatsByDay {...data} />
}

import { useRouter } from 'next/router'
import axios from 'axios'
import useSWR from 'swr'

import StatsByDay from './StatsByDay'

const fetcher = async (url, day) => {
    try {
        const baseURL = '/api/stats'
        const endpoint = day ? `${baseURL}?day=${day}` : baseURL

        const { data } = await axios.get(endpoint)

        return data
    } catch (error) {
        return error
    }
}

export default function StatsWithSWR() {
    const { asPath } = useRouter()
    const { query } = useRouter()

    const { data } = useSWR([asPath, query?.day], fetcher, {
        refreshInterval: 30000, // Check for new data every 30 seconds
    })

    if (!data) {
        return null
    }

    return <StatsByDay {...data} />
}

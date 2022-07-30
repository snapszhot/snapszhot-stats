import { useRouter } from 'next/router'
import axios from 'axios'
import useSWR from 'swr'

import StatsByDate from './StatsByDate'

const fetcher = async url => {
    try {
        const [, year, month, day] = url.split('/')
        const endpoint = `/api/statsByDate?year=${year}&month=${month}&day=${day}`
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

    if (!data) {
        return null
    }

    return <StatsByDate {...data} />
}

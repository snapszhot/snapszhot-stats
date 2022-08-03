import PropTypes from 'prop-types'
import { SWRConfig } from 'swr'
import { queryStatsByDate } from '@lib/api/query-stats'

import { StatsByDate } from '@components/views'

export default function DatePage({ fallback }) {
    return (
        <SWRConfig value={{ fallback }}>
            <StatsByDate />
        </SWRConfig>
    )
}

DatePage.propTypes = {
    fallback: PropTypes.object,
}

export async function getServerSideProps({ params }) {
    try {
        const { year, month, day } = params
        const fallback = await queryStatsByDate({ year, month, day })
        const fallbackKey = `/${year}/${month}/${day}`

        return {
            props: {
                fallback: {
                    [fallbackKey]: fallback,
                },
            },
        }
    } catch (error) {
        return {
            props: {
                error,
            },
        }
    }
}

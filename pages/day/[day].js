import PropTypes from 'prop-types'
import { SWRConfig } from 'swr'
import { queryStatsByDay } from '@lib/api/query-stats'

import { StatsByDay } from '@components/views'

export default function DayPage({ fallback }) {
    return (
        <SWRConfig value={{ fallback }}>
            <StatsByDay />
        </SWRConfig>
    )
}

DayPage.propTypes = {
    fallback: PropTypes.object,
}

export async function getServerSideProps({ params }) {
    try {
        const fallback = await queryStatsByDay(params.day)

        return {
            props: {
                fallback: {
                    [`/day/${params.day}`]: fallback,
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

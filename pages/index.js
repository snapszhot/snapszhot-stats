import PropTypes from 'prop-types'
import { SWRConfig } from 'swr'
import { queryStatsByDay } from '@lib/api/query-stats'

import { StatsByDay } from '@components/views'

export default function HomePage({ fallback }) {
    return (
        <SWRConfig value={{ fallback }}>
            <StatsByDay />
        </SWRConfig>
    )
}

HomePage.propTypes = {
    fallback: PropTypes.object,
}

export async function getServerSideProps() {
    try {
        const fallback = await queryStatsByDay()

        return {
            props: {
                fallback: {
                    ['/']: fallback,
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

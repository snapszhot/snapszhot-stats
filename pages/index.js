import PropTypes from 'prop-types'
import { SWRConfig } from 'swr'
import queryStats from '@lib/api/query-stats'

import { StatsByDay } from '@components/views'

export default function HomePage({ fallback, ...props }) {
    return (
        <SWRConfig value={{ fallback }}>
            <StatsByDay {...props} />
        </SWRConfig>
    )
}

HomePage.propTypes = {
    fallback: PropTypes.object,
}

export async function getStaticProps() {
    try {
        const fallback = await queryStats()

        return {
            props: {
                fallback: {
                    ['/']: fallback,
                },
            },
            revalidate: 60,
        }
    } catch (error) {
        return {
            props: {
                error,
            },
        }
    }
}

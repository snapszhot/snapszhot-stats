import PropTypes from 'prop-types'
import { SWRConfig } from 'swr'
import { DateTime } from 'luxon'

import { queryStatsByDate } from '@lib/api/query-stats'
import supabase from '@lib/supabase-client'

import { StatsByDate } from '@components/views'

export default function DatePage({ fallback, ...props }) {
    return (
        <SWRConfig value={{ fallback }}>
            <StatsByDate {...props} />
        </SWRConfig>
    )
}

DatePage.propTypes = {
    fallback: PropTypes.object,
}

export async function getStaticProps({ params }) {
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

export async function getStaticPaths() {
    const { data, error } = await supabase
        .from('analytics')
        .select('created_at')
        .order('created_at', { ascending: true })

    const paths = []
    data.forEach(item => {
        const date = DateTime.fromISO(item.created_at)

        if (
            !paths.some(
                path =>
                    path.params.year === date.year.toString() &&
                    path.params.month === date.month.toString() &&
                    path.params.day === date.day.toString()
            )
        ) {
            paths.push({
                params: {
                    year: date.year.toString(),
                    month: date.month.toString(),
                    day: date.day.toString(),
                },
            })
        }
    })

    if (error) {
        throw error
    }

    return {
        paths,
        fallback: false,
    }
}

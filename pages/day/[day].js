import PropTypes from 'prop-types'
import { SWRConfig } from 'swr'
import queryStats from '@lib/api/query-stats'
import queryMovies from '@lib/prismic'

import { StatsByDay } from '@components/views'

export default function DayPage({ fallback, ...props }) {
    return (
        <SWRConfig value={{ fallback }}>
            <StatsByDay {...props} />
        </SWRConfig>
    )
}

DayPage.propTypes = {
    fallback: PropTypes.object,
}

export async function getStaticProps({ params }) {
    try {
        const fallback = await queryStats(params.day)

        return {
            props: {
                fallback: {
                    [`/day/${params.day}`]: fallback,
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
    const posts = await queryMovies(100)
    const paths = posts.map(post => {
        return {
            params: {
                day: post.data.day.toString(),
            },
        }
    })

    return {
        paths,
        fallback: false,
    }
}

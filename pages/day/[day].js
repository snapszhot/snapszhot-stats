import supabase from '@lib/supabase-client'
import queryMovies from '@lib/prismic'
import getStats from '@lib/get-stats'

import { StatsByDay } from '@components/views'

export default function HomePage(props) {
    return <StatsByDay {...props} />
}

export async function getStaticProps({ params }) {
    try {
        const [post, mostRecentDay] = await Promise.all([
            queryMovies(1, parseInt(params.day)),
            queryMovies(),
        ])
        const { data, error } = await supabase
            .from('analytics')
            .select('*')
            .order('created_at', { ascending: true })
            .eq('puzzle_id', params.day)

        if (error) {
            throw error
        }

        const stats = getStats(data)

        return {
            props: {
                ...post,
                mostRecentDay: mostRecentDay.day,
                pageTitle: `DAY ${post.day}: ${post.subtitle}`,
                resultData: data,
                stats,
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

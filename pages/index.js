import supabase from '@lib/supabase-client'
import queryMovies from '@lib/prismic'
import getStats from '@lib/get-stats'

import { StatsByDay } from '@components/views'

export default function HomePage(props) {
    return <StatsByDay {...props} />
}

export async function getStaticProps() {
    try {
        const { day, subtitle } = await queryMovies()
        const { data, error } = await supabase
            .from('analytics')
            .select('*')
            .order('created_at', { ascending: true })
            .eq('puzzle_id', day)

        if (error) {
            throw error
        }

        const stats = getStats(data)

        return {
            props: {
                day,
                resultData: data,
                stats,
                subtitle,
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

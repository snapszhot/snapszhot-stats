import supabase from '@lib/supabase-client'
import queryMovies from '@lib/prismic'
import getStats from '@lib/get-stats'

export default async function queryStats(day = null) {
    const [post, latestPost] = await Promise.all([
        queryMovies(1, day),
        queryMovies(),
    ])
    const { data, error } = await supabase
        .from('analytics')
        .select('*')
        .order('created_at', { ascending: true })
        .eq('puzzle_id', post.day)

    if (error) {
        throw error
    }

    const stats = getStats(data)

    return {
        ...post,
        mostRecentDay: latestPost.day,
        resultData: data,
        stats,
    }
}

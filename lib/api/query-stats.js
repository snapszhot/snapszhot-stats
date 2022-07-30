import { DateTime } from 'luxon'
import supabase from '@lib/supabase-client'
import queryMovies from '@lib/prismic'
import getStats from '@lib/get-stats'

export async function queryStatsByDate({ year, month, day }) {
    const dt = DateTime.local(parseInt(year), parseInt(month), parseInt(day))
    const dayAfter = dt.plus({ days: 1 }).toISO()
    const date = dt.toISO()
    const prettyDate = dt.toLocaleString(DateTime.DATE_FULL)

    const { data, error } = await supabase
        .from('analytics')
        .select('*')
        .order('created_at', { ascending: false })
        .lt('created_at', dayAfter)
        .gt('created_at', date)

    if (error) {
        throw error
    }

    const stats = getStats(data)

    return {
        prettyDate,
        resultData: data,
        stats,
    }
}

export async function queryStatsByDay(day = null) {
    const [post, latestPost] = await Promise.all([
        queryMovies(1, day),
        queryMovies(),
    ])
    const { data, error } = await supabase
        .from('analytics')
        .select('*')
        .order('created_at', { ascending: false })
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

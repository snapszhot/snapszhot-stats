import { DateTime } from 'luxon'
import supabase from '@lib/supabase-client'
import queryMovies from '@lib/prismic'
import getStats from '@lib/get-stats'

export async function queryStatsByDate({ year, month, day }) {
    const dt = DateTime.local(parseInt(year), parseInt(month), parseInt(day))
    const dayAfter = dt.plus({ days: 1 }).toISO()
    const date = dt.toISO()
    const pageTitle = dt.toLocaleString(DateTime.DATE_FULL)

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

    const BEGINNING = DateTime.local(2022, 7, 29)
    const now = DateTime.local()
    const nextDay = dt.plus({ day: 1 }).toFormat('/yyyy/M/d')
    const previousDay = dt.minus({ day: 1 }).toFormat('/yyyy/M/d')

    const nav = {
        previous: {
            isAvailable: dt > BEGINNING,
            link: previousDay,
        },
        next: {
            isAvailable: now > dt && !now.hasSame(dt, 'day'),
            link: nextDay,
        },
    }

    return {
        nav,
        pageTitle,
        resultData: data,
        stats,
    }
}

export async function queryStatsByDay(postDay = null) {
    const [post, latestPost] = await Promise.all([
        queryMovies(1, postDay),
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

    const { day } = post
    const nav = {
        previous: {
            isAvailable: day > 1,
            link: `/day/${day - 1}`,
        },
        next: {
            isAvailable: latestPost.day > day,
            link: `/day/${day + 1}`,
        },
    }

    return {
        ...post,
        nav,
        resultData: data,
        stats,
    }
}

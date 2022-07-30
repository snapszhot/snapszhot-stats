import groupByTens from '@lib/group-by-tens'
import queryMovies, { getAllMovies } from '@lib/prismic'
import { Archive } from '@components/views'

export default function ArchivePage(props) {
    return <Archive {...props} />
}

export async function getServerSideProps() {
    const [rawPosts, mostRecentDay] = await Promise.all([
        getAllMovies(),
        queryMovies(),
    ])
    const posts = groupByTens(rawPosts)

    return {
        props: {
            posts,
            mostRecentDay: mostRecentDay.day,
        },
    }
}

import * as prismic from '@prismicio/client'

const endpoint = prismic.getRepositoryEndpoint(
    process.env.PRISMIC_REPOSITORY_NAME
)

const createClientOptions = (req = null, prismicAccessToken = null) => {
    const reqOption = req ? { req } : {}
    const accessTokenOption = prismicAccessToken
        ? { accessToken: prismicAccessToken }
        : {}

    return {
        ...reqOption,
        ...accessTokenOption,
    }
}

const Client = (req = null) =>
    prismic.createClient(
        endpoint,
        createClientOptions(req, process.env.PRISMIC_API_TOKEN)
    )

export async function getAllMovies() {
    const results = await Client().getAllByType('movie', {
        orderings: {
            field: 'my.movie.day',
            direction: 'asc',
        },
        graphQuery: `{
            movie {
                day
                subtitle
            }
        }`,
    })

    return results
}

export default async function queryMovies(pageSize = 1, day = null) {
    const filters = day
        ? [prismic.filter.at('my.movie.day', parseInt(day))]
        : null

    const { results } = await Client().getByType('movie', {
        orderings: {
            field: 'my.movie.day',
            direction: 'desc',
        },
        pageSize,
        page: 1,
        filters,
        graphQuery: `{
            movie {
                day
                subtitle
            }
        }`,
    })

    if (pageSize === 1) {
        return results?.[0]?.data
    }

    return results
}

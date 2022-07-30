import { queryStatsByDate } from '@lib/api/query-stats'

export default async function handler(req, res) {
    try {
        const data = await queryStatsByDate({ ...req.query })

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error })
    }
}

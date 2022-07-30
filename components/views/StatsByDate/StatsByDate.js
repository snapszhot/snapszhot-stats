import PropTypes from 'prop-types'

import {
    BarChart,
    BasicStats,
    Layout,
    PageTitle,
    RawLogs,
} from '@components/common'

export default function StatsByDate({
    prettyDate,
    resultData,
    stats,
    ...props
}) {
    return (
        <Layout pageTitle={prettyDate} {...props}>
            <PageTitle title={prettyDate} />
            <BasicStats {...stats} />
            <BarChart
                data={stats.gamesPlayed}
                title='Games Played'
                total={stats.totalPlays}
                xAxis='Game'
                yAxis='Plays'
            />
            <RawLogs resultData={resultData} context='date' />
        </Layout>
    )
}

StatsByDate.propTypes = {
    day: PropTypes.number,
    prettyDate: PropTypes.string,
    resultData: PropTypes.array,
    stats: PropTypes.object,
    subtitle: PropTypes.string,
}

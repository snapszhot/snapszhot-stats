import PropTypes from 'prop-types'

import {
    BarChart,
    BasicStats,
    Layout,
    PageTitle,
    RawLogs,
} from '@components/common'

export default function StatsByDay({ day, nav, resultData, stats, subtitle }) {
    const pageTitle = `DAY ${day}: ${subtitle}`

    return (
        <Layout day={day} nav={nav} pageTitle={pageTitle}>
            <PageTitle title={pageTitle} />
            <BasicStats {...stats} />
            <BarChart
                data={stats.winsByFrame}
                title='Wins by Frame'
                total={stats.totalPlays}
                xAxis='Frame'
                yAxis='Wins'
            />
            <RawLogs resultData={resultData} />
        </Layout>
    )
}

StatsByDay.propTypes = {
    day: PropTypes.number,
    nav: PropTypes.object,
    resultData: PropTypes.array,
    stats: PropTypes.object,
    subtitle: PropTypes.string,
}

import PropTypes from 'prop-types'

import {
    BarChart,
    BasicStats,
    Layout,
    PageTitle,
    RawLogs,
} from '@components/common'

export default function StatsByDay({
    day,
    resultData,
    stats,
    subtitle,
    ...props
}) {
    const pageTitle = `DAY ${day}: ${subtitle}`

    return (
        <Layout day={day} pageTitle={pageTitle} {...props}>
            <PageTitle title={pageTitle} />
            <BasicStats {...stats} />
            <BarChart
                data={stats.winsByFrame}
                title='Wins by Frame'
                total={stats.wins}
                xAxis='Frame'
                yAxis='Wins'
            />
            <RawLogs resultData={resultData} />
        </Layout>
    )
}

StatsByDay.propTypes = {
    day: PropTypes.number,
    resultData: PropTypes.array,
    stats: PropTypes.object,
    subtitle: PropTypes.string,
}

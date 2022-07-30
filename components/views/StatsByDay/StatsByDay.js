import PropTypes from 'prop-types'

import { BarChart, BasicStats, Layout, RawLogs } from '@components/common'
import styles from './StatsByDay.module.scss'

export default function StatsByDay({
    day,
    resultData,
    stats,
    subtitle,
    ...props
}) {
    return (
        <Layout day={day} {...props}>
            <h1 className={styles.title}>
                DAY {day}: {subtitle}
            </h1>
            <BasicStats {...stats} />
            <BarChart
                data={stats.winsByFrame}
                title='Wins by Frame'
                total={stats.wins}
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

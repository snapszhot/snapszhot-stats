import PropTypes from 'prop-types'

import { BarChart, BasicStats, Layout, RawLogs } from '@components/common'
import styles from './TodaysPuzzle.module.scss'

export default function TodaysPuzzle({ day, resultData, stats, subtitle }) {
    // console.log(resultData)
    // console.log(stats)

    return (
        <Layout>
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

TodaysPuzzle.propTypes = {
    day: PropTypes.number,
    resultData: PropTypes.array,
    stats: PropTypes.object,
    subtitle: PropTypes.string,
}

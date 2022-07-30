import PropTypes from 'prop-types'

import { SectionTitle } from '@components/common'
import Bar from './Bar'
import styles from './BarChart.module.scss'

function YAxisTicks({ total }) {
    const quarter = Math.floor(total * 0.25)
    const half = Math.floor(total * 0.5)
    const threeQuarters = Math.floor(total * 0.75)

    return (
        <li className={styles.barAxis}>
            <ul>
                <li>{total}</li>
                <li>{threeQuarters}</li>
                <li>{half}</li>
                <li>{quarter}</li>
                <li>0</li>
            </ul>
        </li>
    )
}

YAxisTicks.propTypes = {
    total: PropTypes.number,
}

function Labels({ xAxis, yAxis }) {
    return (
        <>
            <div className={styles.yAxisLabel}>
                <span>{yAxis}</span>
            </div>
            <div className={styles.xAxisLabel}>{xAxis}</div>
        </>
    )
}

Labels.propTypes = {
    xAxis: PropTypes.string,
    yAxis: PropTypes.string,
}

export default function BarChart({ data, title, total, xAxis, yAxis }) {
    const chartStyles = {
        gridTemplateColumns: `10px repeat(${data.length}, 1fr)`,
    }

    return (
        <section className={styles.container}>
            <SectionTitle title={title} />
            <ul className={styles.chart} style={chartStyles}>
                <Labels xAxis={xAxis} yAxis={yAxis} />
                <YAxisTicks total={total} />
                {data.map((entry, index) => (
                    <Bar
                        caption={entry.label}
                        entry={entry.value}
                        total={total}
                        key={index}
                    />
                ))}
            </ul>
        </section>
    )
}

BarChart.propTypes = {
    data: PropTypes.array,
    title: PropTypes.string,
    total: PropTypes.number,
    xAxis: PropTypes.string,
    yAxis: PropTypes.string,
}

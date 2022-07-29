import PropTypes from 'prop-types'

import { SectionTitle } from '@components/common'
import Bar from './Bar'
import styles from './BarChart.module.scss'

export default function BarChart({ data, title, total }) {
    return (
        <section className={styles.container}>
            <SectionTitle title={title} />
            <ul className={styles.chart}>
                {data.map((entry, index) => (
                    <Bar
                        caption={index + 1}
                        entry={entry}
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
}

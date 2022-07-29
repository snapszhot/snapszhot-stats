import PropTypes from 'prop-types'
import { DateTime } from 'luxon'

import { SectionTitle } from '@components/common'
import styles from './RawLogs.module.scss'

function LogItem({ created_at, frame_won, won }) {
    const date = DateTime.fromISO(created_at)
    const formattedDate = date.toLocaleString()

    return (
        <tr>
            <td>{formattedDate}</td>
            <td>{won ? <>Won</> : <>Lost</>}</td>
            <td>{won ? frame_won : <>–</>}</td>
        </tr>
    )
}

LogItem.propTypes = {
    created_at: PropTypes.string,
    frame_won: PropTypes.number,
    won: PropTypes.bool,
}

export default function RawLogs({ resultData }) {
    return (
        <section>
            <SectionTitle title='Raw Game Logs' />
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Date Played</th>
                        <th>Result</th>
                        <th>Frame Won</th>
                    </tr>
                </thead>
                <tbody>
                    {resultData.map(item => (
                        <LogItem {...item} key={item.id} />
                    ))}
                </tbody>
            </table>
        </section>
    )
}

RawLogs.propTypes = {
    resultData: PropTypes.array,
}

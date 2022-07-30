import PropTypes from 'prop-types'
import { DateTime } from 'luxon'

import { SectionTitle } from '@components/common'
import styles from './RawLogs.module.scss'

function LogItem({ created_at, frame_won, isDate, puzzle_id, won }) {
    const date = DateTime.fromISO(created_at)
    const formattedDate = isDate
        ? date.toLocaleString(DateTime.TIME_SIMPLE)
        : date.toLocaleString(DateTime.DATETIME_SHORT)

    return (
        <tr>
            <td>{formattedDate}</td>
            {isDate && <td>{puzzle_id}</td>}
            <td>{won ? <>Won</> : <>Lost</>}</td>
            <td>{won ? frame_won : <>–</>}</td>
        </tr>
    )
}

LogItem.propTypes = {
    created_at: PropTypes.string,
    frame_won: PropTypes.number,
    isDate: PropTypes.bool,
    puzzle_id: PropTypes.number,
    won: PropTypes.bool,
}

export default function RawLogs({ context, resultData }) {
    const isDate = context === 'date'

    return (
        <section>
            <SectionTitle title='Raw Game Logs' />
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>{isDate ? <>Time</> : <>Date</>} Played</th>
                        {isDate && <th>Day</th>}
                        <th>Result</th>
                        <th>Frame Won</th>
                    </tr>
                </thead>
                <tbody>
                    {resultData.map(item => (
                        <LogItem {...item} isDate={isDate} key={item.id} />
                    ))}
                </tbody>
            </table>
        </section>
    )
}

RawLogs.propTypes = {
    context: 'day',
}

RawLogs.propTypes = {
    context: PropTypes.string,
    resultData: PropTypes.array,
}

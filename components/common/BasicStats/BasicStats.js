import PropTypes from 'prop-types'
import styles from './BasicStats.module.scss'

function BasicStat({ caption, title }) {
    return (
        <div className={styles.stat}>
            <dt className={styles.statTitle}>{title}</dt>
            <dd>{caption}</dd>
        </div>
    )
}

BasicStat.propTypes = {
    caption: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    title: PropTypes.string,
}

export default function BasicStats({ losses, totalPlays, winPct, wins }) {
    return (
        <section className={styles.container}>
            <dl>
                <BasicStat title='Total Plays' caption={totalPlays} />
                <BasicStat title='Win %' caption={`${winPct}%`} />
                <BasicStat title='Wins' caption={wins} />
                <BasicStat title='Losses' caption={losses} />
            </dl>
        </section>
    )
}

BasicStats.propTypes = {
    losses: PropTypes.number,
    totalPlays: PropTypes.number,
    winPct: PropTypes.string,
    wins: PropTypes.number,
}

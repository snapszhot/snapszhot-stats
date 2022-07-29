import PropTypes from 'prop-types'

import styles from './BarChart.module.scss'

export default function Bar({ entry, caption, total }) {
    const height = parseInt((entry / total) * 100)
    const className = `bar-${height > 0 ? height : 1}`

    return (
        <li className={styles[className]}>
            <span className={styles.barCaption}>{caption}</span>
        </li>
    )
}

Bar.propTypes = {
    caption: PropTypes.number,
    entry: PropTypes.number,
    total: PropTypes.number,
}

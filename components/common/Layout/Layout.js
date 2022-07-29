import PropTypes from 'prop-types'
import styles from './Layout.module.scss'

export default function Layout({ children }) {
    return (
        <div className={styles.container}>
            <header>
                <span className={styles.title}>SNAPSЖOT STATS</span>
            </header>
            <main>{children}</main>
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node,
}

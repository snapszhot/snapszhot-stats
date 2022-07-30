import PropTypes from 'prop-types'
import styles from './PageTitle.module.scss'

export default function PageTitle({ title }) {
    return <h1 className={styles.title}>{title}</h1>
}

PageTitle.propTypes = {
    title: PropTypes.string,
}

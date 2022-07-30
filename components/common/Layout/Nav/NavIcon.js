import PropTypes from 'prop-types'
import Link from 'next/link'
import cn from 'classnames'
import styles from './NavIcon.module.scss'

export default function NavIcon({ children, disabled, link, title }) {
    const className = cn(styles.icon, {
        [styles.disabled]: disabled,
    })

    return (
        <li>
            {disabled ? (
                <span className={className}>{children}</span>
            ) : (
                <Link href={link}>
                    <a>
                        <span className='visuallyHidden'>{title}</span>
                        <span className={className}>{children}</span>
                    </a>
                </Link>
            )}
        </li>
    )
}

NavIcon.propTypes = {
    children: PropTypes.node,
    disabled: PropTypes.bool,
    link: PropTypes.string,
    title: PropTypes.string,
}

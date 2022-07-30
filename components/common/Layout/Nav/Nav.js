import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

import NavIcon from './NavIcon'
import styles from './Nav.module.scss'

export default function Nav({ day, mostRecentDay }) {
    const { pathname } = useRouter()
    const showGameNav = pathname !== '/archive'
    const prevLink = `/day/${day - 1}`
    const nextLink = `/day/${day + 1}`

    return (
        <ul className={styles.nav}>
            {day > 1 && showGameNav && (
                <NavIcon link={prevLink} title='Previous'>
                    <svg className={styles.icon} viewBox='0 0 319 511.61'>
                        <path d='m270.08 5.89 43.04 43.04c7.85 7.86 7.83 20.72 0 28.54L134.77 255.82l178.35 178.35c7.85 7.86 7.8 20.73 0 28.54l-43.04 43.04c-7.83 7.82-20.71 7.82-28.54 0L49.29 313.49l-.37-.36-43.04-43.04c-7.82-7.83-7.86-20.68 0-28.54l43.04-43.04.37-.36L241.54 5.89c7.85-7.85 20.68-7.85 28.54 0z' />
                    </svg>
                </NavIcon>
            )}
            {mostRecentDay > day && showGameNav && (
                <NavIcon link={nextLink} title='Next'>
                    <svg className={styles.icon} viewBox='0 0 319 511.61'>
                        <path d='M48.92 505.72 5.88 462.68c-7.85-7.85-7.83-20.72 0-28.54l178.35-178.35L5.88 77.44c-7.85-7.85-7.8-20.73 0-28.54L48.92 5.87c7.83-7.82 20.71-7.82 28.54 0l192.25 192.26.37.36 43.04 43.03c7.82 7.84 7.86 20.69 0 28.54l-43.04 43.04-.37.36L77.46 505.72c-7.85 7.86-20.68 7.86-28.54 0z' />
                    </svg>
                </NavIcon>
            )}
            <NavIcon link='/archive' title='Archive'>
                <svg className={styles.icon} viewBox='0 0 122.88 102.4'>
                    <path d='m35.37 0h86a1.56 1.56 0 0 1 1.55 1.55v18.66a1.58 1.58 0 0 1 -1.55 1.54h-86a1.56 1.56 0 0 1 -1.54-1.54v-18.66a1.54 1.54 0 0 1 1.54-1.55zm0 80.65h86a1.56 1.56 0 0 1 1.55 1.54v18.67a1.58 1.58 0 0 1 -1.55 1.54h-86a1.56 1.56 0 0 1 -1.54-1.54v-18.67a1.54 1.54 0 0 1 1.54-1.54zm-33.82 0h16a1.56 1.56 0 0 1 1.55 1.54v18.67a1.58 1.58 0 0 1 -1.55 1.54h-16a1.56 1.56 0 0 1 -1.55-1.54v-18.67a1.54 1.54 0 0 1 1.55-1.54zm33.82-18.57h86a1.56 1.56 0 0 0 1.55-1.55v-18.66a1.58 1.58 0 0 0 -1.55-1.55h-86a1.57 1.57 0 0 0 -1.54 1.55v18.66a1.55 1.55 0 0 0 1.54 1.55zm-33.82 0h16a1.56 1.56 0 0 0 1.55-1.55v-18.66a1.58 1.58 0 0 0 -1.55-1.55h-16a1.57 1.57 0 0 0 -1.55 1.55v18.66a1.55 1.55 0 0 0 1.55 1.55zm0-62.08h16a1.56 1.56 0 0 1 1.55 1.55v18.66a1.58 1.58 0 0 1 -1.55 1.54h-16a1.56 1.56 0 0 1 -1.55-1.54v-18.66a1.54 1.54 0 0 1 1.55-1.55z' />
                </svg>
            </NavIcon>
        </ul>
    )
}

Nav.propTypes = {
    day: PropTypes.number,
    mostRecentDay: PropTypes.number,
}

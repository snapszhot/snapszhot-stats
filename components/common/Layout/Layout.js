import PropTypes from 'prop-types'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Nav from './Nav'
import styles from './Layout.module.scss'

export default function Layout({ children, pageTitle, ...props }) {
    const { asPath } = useRouter()
    const siteTitle = 'SNAPSЖOT STATS'
    const title = pageTitle ? `${pageTitle} - ${siteTitle}` : siteTitle
    const showLink = asPath !== '/'

    return (
        <div className={styles.container}>
            <Head>
                <title>{title}</title>
            </Head>
            <header className={styles.header}>
                <span className={styles.title}>
                    {showLink ? (
                        <Link href='/'>
                            <a className={styles.titleLink}>{siteTitle}</a>
                        </Link>
                    ) : (
                        <>{siteTitle}</>
                    )}
                </span>
                <Nav {...props} />
            </header>
            <main>{children}</main>
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node,
    pageTitle: PropTypes.string,
}

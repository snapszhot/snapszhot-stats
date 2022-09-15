import PropTypes from 'prop-types'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Nav from './Nav'
import styles from './Layout.module.scss'

export default function Layout({ children, nav, pageTitle }) {
    const { asPath } = useRouter()
    const isHomepage = asPath === '/'

    const siteTitle = 'STATSЖOT'
    const title = isHomepage ? siteTitle : `${pageTitle} - ${siteTitle}`

    return (
        <div className={styles.container}>
            <Head>
                <title>{title}</title>
            </Head>
            <header className={styles.header}>
                <span className={styles.title}>
                    {isHomepage ? (
                        siteTitle
                    ) : (
                        <Link href='/'>
                            <a className={styles.titleLink}>{siteTitle}</a>
                        </Link>
                    )}
                </span>
                <Nav {...nav} />
            </header>
            <main>{children}</main>
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node,
    nav: PropTypes.object,
    pageTitle: PropTypes.string,
}

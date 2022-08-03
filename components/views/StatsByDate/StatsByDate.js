import PropTypes from 'prop-types'

import { BasicStats, Layout, PageTitle, RawLogs } from '@components/common'

export default function StatsByDate({ nav, pageTitle, resultData, stats }) {
    return (
        <Layout pageTitle={pageTitle} nav={nav}>
            <PageTitle title={pageTitle} />
            <BasicStats {...stats} />
            <RawLogs resultData={resultData} context='date' />
        </Layout>
    )
}

StatsByDate.propTypes = {
    nav: PropTypes.object,
    pageTitle: PropTypes.string,
    resultData: PropTypes.array,
    stats: PropTypes.object,
}

import PropTypes from 'prop-types'

import { Layout } from '@components/common'
import ArchivePost from './ArchivePost'

export default function Archive({ posts, ...props }) {
    return (
        <Layout {...props} pageTitle='Archive'>
            <ul>
                {posts.map(postGroup =>
                    postGroup.map((post, index) => (
                        <ArchivePost
                            {...post}
                            isLast={index + 1 === postGroup.length}
                            key={index}
                        />
                    ))
                )}
            </ul>
        </Layout>
    )
}

Archive.propTypes = {
    posts: PropTypes.array,
}

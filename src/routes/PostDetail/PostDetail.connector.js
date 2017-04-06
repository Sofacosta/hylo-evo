import { connect } from 'react-redux'
// import { someAction } from 'some/path/to/actions'
import samplePost from 'components/PostCard/samplePost'

const SAMPLE_IMAGE_URL = 'https://d3ngex8q79bk55.cloudfront.net/community/1944/banner/1489687099172_ggbridge.jpg'

export function mapStateToProps (state, { match: { params: { postId } } }) {
  return {
    post: {...samplePost(), id: postId, imageUrl: SAMPLE_IMAGE_URL},
    slug: 'hylo'
  }
}

export const mapDispatchToProps = {
  // someAction
}

export default connect(mapStateToProps, mapDispatchToProps)

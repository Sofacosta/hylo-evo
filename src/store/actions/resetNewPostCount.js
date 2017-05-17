import { RESET_NEW_POST_COUNT } from 'store/constants'

export default function resetNewPostCount (id, type) {
  if (!['TopicSubscription', 'Membership'].includes(type)) {
    throw new Error(`bad type for resetNewPostCount: ${type}`)
  }

  return {
    type: RESET_NEW_POST_COUNT,
    graphql: {
      query: `mutation($id: ID, $data: ${type}Input) {
        update${type}(id: $id, data: $data) {
          id
          newPostCount
        }
      }`,
      variables: {
        id,
        data: {
          newPostCount: 0
        }
      }
    },
    meta: {id, type, optimistic: true}
  }
}

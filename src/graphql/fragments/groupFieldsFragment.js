const groupFieldsFragment = ({ withTopics, withJoinQuestions, withPrerequisites }) => `
  id
  accessibility
  avatarUrl
  bannerUrl
  description
  location
  memberCount
  name
  settings {
    allowGroupInvites
    askJoinQuestions
    publicMemberDirectory
  }
  slug
  visibility
  childGroups {
    items {
      id
      accessibility
      avatarUrl
      bannerUrl
      name
      slug
      visibility
    }
  }
  locationObject {
    id
    addressNumber
    addressStreet
    bbox {
      lat
      lng
    }
    center {
      lat
      lng
    }
    city
    country
    fullText
    locality
    neighborhood
    region
  }
  members(first: 8, sortBy: "name", order: "desc") {
    items {
      id
      name
      avatarUrl
    }
  }
  moderators {
    items {
      id
      name
      avatarUrl
    }
  }
  parentGroups {
    items {
      id
      accessibility
      avatarUrl
      bannerUrl
      name
      slug
      visibility
    }
  }
  ${withTopics ? `groupTopics(first: 8) {
    items {
      id
      topic {
        id
        name
      }
      postsTotal
    }
  }` : ''}
  ${withJoinQuestions ? `joinQuestions {
    items {
      id
      questionId
      text
    }
  }` : ''}
  ${withPrerequisites ? `prerequisiteGroups(onlyNotMember: true) {
    items {
      avatarUrl
      id
      name
      settings {
        allowGroupInvites
        askJoinQuestions
        publicMemberDirectory
      }
      slug
    }
  }
  numPrerequisitesLeft
  ` : ''}
`

export default groupFieldsFragment

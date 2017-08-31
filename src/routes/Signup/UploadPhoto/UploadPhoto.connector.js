import { connect } from 'react-redux'
import getMe from 'store/selectors/getMe'
import { push } from 'react-router-redux'
import { updateUserSettings } from './UploadPhoto.store'
import { UPLOAD_IMAGE } from 'store/constants'

export function mapStateToProps (state, props) {
  const uploadImagePending = state.pending[UPLOAD_IMAGE]
  return {
    currentUser: getMe(state),
    uploadImagePending
  }
}

export function mapDispatchToProps (dispatch, props) {
  return {
    updateUserSettings: () => dispatch(updateUserSettings()),
    goToNextStep: () => dispatch(push('/signup/create-community'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)

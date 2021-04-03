import React, { Component } from 'react'
import { get, isEmpty } from 'lodash/fp'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { groupUrl } from 'util/navigation'
import GroupsList from 'components/GroupsList'
import Icon from 'components/Icon'
import './PostGroups.scss'

export default class PostGroups extends Component {
  static defaultState = {
    expanded: false
  }

  constructor (props) {
    super(props)
    this.state = PostGroups.defaultState
  }

  toggleExpanded = () => {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  render () {
    const { groups, constrained, slug, showBottomBorder } = this.props
    const { expanded } = this.state

    // don't show if there are no groups or this isn't cross posted
    if (isEmpty(groups) || (groups.length === 1 && get('0.slug', groups) === slug)) return null

    return <div styleName={cx('groups', { constrained, expanded, bottomBorder: showBottomBorder })} onClick={expanded ? this.toggleExpanded : undefined}>
      <div styleName='row'>
        <span styleName='label'>Posted In:&nbsp;</span>
        {!expanded &&
          <LinkedGroupNameList groups={groups} maxShown={2} expandFunc={this.toggleExpanded} />}
        <a onClick={this.toggleExpanded} styleName='expandLink'><Icon name={expanded ? 'ArrowUp' : 'ArrowDown'} styleName='expandIcon' /></a>
      </div>

      {expanded && <GroupsList groups={groups} />}
    </div>
  }
}

export function LinkedGroupNameList ({ groups, maxShown = 2, expandFunc }) {
  const groupsToDisplay = (maxShown && maxShown <= groups.length)
    ? groups.slice(0, maxShown)
    : groups
  const othersCount = groups.length - groupsToDisplay.length

  return <span styleName='groupList'>
    {groupsToDisplay.map((group, i) =>
      <LinkedGroupName group={group} key={i}>
        <Separator currentIndex={i} displayCount={groupsToDisplay.length} othersCount={othersCount} />
      </LinkedGroupName>)}
    {othersCount > 0 &&
      <Others othersCount={othersCount} expandFunc={expandFunc} />}
  </span>
}

export function LinkedGroupName ({ group, children }) {
  return <span key={group.id}>
    <Link to={groupUrl(group.slug)} styleName='groupLink'>{group.name === 'Public' && <Icon name='Public' styleName='publicGroupIcon' />} {group.name}</Link>
    {children}
  </span>
}

export function Separator ({ currentIndex, displayCount, othersCount }) {
  const isLastEntry = currentIndex === displayCount - 1
  const isNextToLastEntry = currentIndex === Math.max(0, displayCount - 2)
  const hasOthers = othersCount > 0

  if (isLastEntry) return null
  if (!hasOthers && isNextToLastEntry) return <span key='and'> and </span>

  return <span>, </span>
}

export function Others ({ othersCount, expandFunc }) {
  if (othersCount < 0) return null

  const phrase = othersCount === 1 ? '1 other' : othersCount + ' others'

  return <React.Fragment>
    <span key='and'> and </span>
    <a key='others' styleName='groupLink' onClick={expandFunc}>{phrase}</a>
  </React.Fragment>
}

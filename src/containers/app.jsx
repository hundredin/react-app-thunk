import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Switch, Route, Link } from 'react-router-dom'
import Join from './Join'
import UserList from './UserList'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div>
          <Link to="/">홈&nbsp;</Link>
          <Link to="/join">가입&nbsp;</Link>
          <Link to="/users">유저들&nbsp;</Link>

          <Switch>
            <Route exact path="/join" component={Join} />
            <Route exact path="/users" component={UserList} />
          </Switch>
        </div>
      </div>
    )
  }
}

App.propTypes = {}

function mapStateToProps() {
  return {}
}

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

import * as React from 'react'
import Redux from 'redux'
import axios from 'axios'
import {connect} from 'react-redux'
import Main, {MainStateProps, MainDispatchProps} from './Main'
import {setAddress} from '../actions/address'
import {changeView} from '../actions/view'
import {addressRegex} from './MyForm'

const mapStateToProps = (state: any, ownProps: any): MainStateProps => {
  return {
    address: state.address,
    view: state.view,
    //zillowInfo: state.zillowInfo,
  };
}

const zillowId = "X1-ZWz18ysp67fqx7_1d5w6"

const getDeepSearchParams = (address: string) => {
  const matches = address.match(addressRegex);
  const state = matches.pop()
  const city = matches.pop()
  const street = matches.pop()
  return "?address=" + encodeURIComponent(street)
    + "&citystatezip=" + encodeURIComponent([city, state].join(', '));
}

const mapDispatchToProps = (dispatch: Redux.Dispatch<any>, ownProps: any): MainDispatchProps => {
  return {
    onLookup(submit: any): void {
      const params = getDeepSearchParams(submit.address)
      console.log(params)
      axios.get('/api/lookup' + params)
        .then(res => {
          console.log(res);
        })
      dispatch(setAddress(submit.address))
      dispatch(changeView("property"))
    }
  };
}

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

export default MainContainer

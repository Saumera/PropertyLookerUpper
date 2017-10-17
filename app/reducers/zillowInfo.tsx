export default function zillowInfo(state: any = {}, action: any) {
  switch (action.type) {
    case 'ADDRESS_LOOKUP':
      return {...state, zillowInfo: action.zillowInfo}
    default:
      return state
  }
}

export default function address(state: any = null, action: any) {
  switch (action.type) {
    case "SET_ADDRESS":
      return action.address
    default:
      return state;
  }
}

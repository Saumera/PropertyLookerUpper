export default function view(state: any = "form", action: any) {
  switch (action.type) {
    case "CHANGE_VIEW":
      return action.view
    default:
      return state
  }
}

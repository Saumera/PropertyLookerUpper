import {
  amber100, amber300, amber500, amber600, amber700, amber900,
  cyan500,
  deepOrange100, deepOrange700,
  lightGreen300, lightGreen700, lightGreen900,
  grey100, grey300, grey700, grey800, grey900,
  darkBlack, fullBlack
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

let theme: any = {
  spacing: spacing,
  card: {
    width: 700,
    height: '5in',
    contentHeight: '3in',
    footerHeight: '0.4in',
    backgroundColor: cyan500,
  },
  textField: {
    width: '600px',
  }
}

export default theme

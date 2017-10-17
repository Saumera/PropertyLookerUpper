import * as React from 'react'
import { Field, reduxForm } from 'redux-form'
import Card, { CardHeader, CardText, CardActions } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

// Checks that there are at least recognizable sections for street address,
// city and state.  This is needed because the Zillow API has separate query
// parameters for the street address and for the city+state.
export const addressRegex = new RegExp(''
  + /^([0-9]+\s+.+)/.source                     // Street address
  + /,\s*([A-Z]+(?:[\s-][A-Z]+)*)/.source       // City
  + /,?\s*([A-Z]{2})/.source                    // State
  + /(?:,?\s*[0-9]{5}(?:-[0-9]{4})?)?$/.source  // ZIP code (optional)
  , 'i' // Case insensitive
);

interface Errors {
  address: string;
}

const validate = (values: any): Errors => {
  let errors: any = {};
  if (values.address && !addressRegex.test(values.address)) {
    errors.address = 'Please use a valid address '
      + '(e.g. "715 N Beatty St, Pittsburgh, PA")'
  }
  return errors;
}

const renderAddressField = (fieldInfo: any) => (
  <TextField hintText="e.g. '715 N Beatty St, Pittsburgh, PA'"
    floatingLabelText="Address"
    style={{width: 560}}
    label="Address"
    errorText={fieldInfo.meta.touched && fieldInfo.meta.error}
    {...fieldInfo.input}
  />
)

const AddressForm = (props: any) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <CardText>
        <Field name="address" className="address-field" component={renderAddressField} />
        <RaisedButton type="submit" label="Go" primary={true}/>
      </CardText>
    </form>
  );
}

const MyForm = reduxForm({
  form: 'addressForm',
  validate
})(AddressForm)

export default MyForm

import * as React from 'react'
import Card, { CardHeader, CardText, CardActions } from 'material-ui/Card'
import MyForm from './MyForm'

export interface MainStateProps {
  address: string;
  view: string;
}

export interface MainDispatchProps {
  onLookup: (address: string) => void;
}

export interface MainProps extends MainStateProps, MainDispatchProps {};

export default function render(props: MainProps) {
  return (
    <div className="card-wrapper">
    <Card>
      <CardHeader
        title="Property Looker Upper"
        titleStyle={{fontSize: 20, fontWeight: 600}}
        subtitle="Enter an address"
        subtitleStyle={{fontSize: 14}}
        textStyle={{lineHeight: 1.4}}
      />
      <MyForm onSubmit={props.onLookup} />
    </Card>
    </div>
  );
}

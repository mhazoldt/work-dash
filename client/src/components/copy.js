import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class MenuExampleMenus extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu>
        <Menu.Item name='browse' active={activeItem === 'browse'} onClick={this.handleItemClick}>
          Browse
        </Menu.Item>

        <Menu.Item name='submit' active={activeItem === 'submit'} onClick={this.handleItemClick}>
          Submit
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item name='signup' active={activeItem === 'signup'} onClick={this.handleItemClick}>
           Sign Up
          </Menu.Item>

          <Menu.Item name='help' active={activeItem === 'help'} onClick={this.handleItemClick}>
           Help
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}


import React from 'react'
import { Icon, Input } from 'semantic-ui-react'

const InputExampleIconElement = () => (
  <Input
    icon={<Icon name='search' inverted circular link />}
    placeholder='Search...'
  />
)

export default InputExampleIconElement

import React from 'react'
import { Card } from 'semantic-ui-react'

const CardExampleHeaderCard = () => (
  <Card.Group>
    <Card>
      <Card.Content>
        <Card.Header>Matthew Harris</Card.Header>
        <Card.Meta>Co-Worker</Card.Meta>
        <Card.Description>Matthew is a pianist living in Nashville.</Card.Description>
      </Card.Content>
    </Card>

    <Card>
      <Card.Content>
        <Card.Header content='Jake Smith' />
        <Card.Meta content='Musicians' />
        <Card.Description content='Jake is a drummer living in New York.' />
      </Card.Content>
    </Card>

    <Card>
      <Card.Content
        header='Elliot Baker'
        meta='Friend'
        description='Elliot is a music producer living in Chicago.'
      />
    </Card>

    <Card
      header='Jenny Hess'
      meta='Friend'
      description='Jenny is a student studying Media Management at the New School'
    />
  </Card.Group>
)

export default CardExampleHeaderCard














import React from 'react'
import { Tab } from 'semantic-ui-react'

const panes = [
  { menuItem: 'Tab 1', render: () => <Tab.Pane attached={false}>Tab 1 Content</Tab.Pane> },
  { menuItem: 'Tab 2', render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane> },
  { menuItem: 'Tab 3', render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane> },
]

const TabExampleSecondaryPointing = () => (
  <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
)

export default TabExampleSecondaryPointing



import React, { Component } from 'react'
import { Button, Checkbox, Form, Input, Radio, Select, TextArea } from 'semantic-ui-react'

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
]

class FormExampleFieldControl extends Component {
  state = {}

  handleChange = (e, { value }) => this.setState({ value })

  render() {
    const { value } = this.state
    return (
      <Form>
        <Form.Group widths='equal'>
          <Form.Field control={Input} label='First name' placeholder='First name' />
          <Form.Field control={Input} label='Last name' placeholder='Last name' />
          <Form.Field control={Select} label='Gender' options={options} placeholder='Gender' />
        </Form.Group>
        <Form.Group inline>
          <label>Quantity</label>
          <Form.Field control={Radio} label='One' value='1' checked={value === '1'} onChange={this.handleChange} />
          <Form.Field control={Radio} label='Two' value='2' checked={value === '2'} onChange={this.handleChange} />
          <Form.Field control={Radio} label='Three' value='3' checked={value === '3'} onChange={this.handleChange} />
        </Form.Group>
        <Form.Field control={TextArea} label='About' placeholder='Tell us more about you...' />
        <Form.Field control={Checkbox} label='I agree to the Terms and Conditions' />
        <Form.Field control={Button}>Submit</Form.Field>
      </Form>
    )
  }
}

export default FormExampleFieldControl


import React from 'react'
import { Button, Popup } from 'semantic-ui-react'

const PopupExampleHideOnScroll = () => (
  <div>
    <Popup
      trigger={<Button icon>Click me</Button>}
      content='Hide the popup on any scroll event'
      on='click'
      hideOnScroll
    />
    <Popup
      trigger={<Button icon>Hover me</Button>}
      content='Hide the popup on any scroll event'
      hideOnScroll
    />
  </div>
)

export default PopupExampleHideOnScroll

import React from 'react'
import { Button, Grid, Popup } from 'semantic-ui-react'

const PopupExampleNested = () => (
  <Popup wide trigger={<Button content='Are you the one?' />} on='click'>
    <Grid divided columns='equal'>
      <Grid.Column>
        <Popup
          trigger={<Button color='blue' content='Blue Pill' fluid />}
          content='The story ends. You wake up in your bed and believe whatever you want to believe.'
          position='top center'
          size='tiny'
          inverted
        />
      </Grid.Column>
      <Grid.Column>
        <Popup
          trigger={<Button color='red' content='Red Pill' fluid />}
          content='Stay in Wonderland, and I show you how deep the rabbit hole goes.'
          position='top center'
          size='tiny'
          inverted
        />
      </Grid.Column>
    </Grid>
  </Popup>
)

export default PopupExampleNested


import React from 'react'
import { Grid, Image } from 'semantic-ui-react'

const GridExampleResponsiveWidth = () => (
  <div>
    <Grid>
      <Grid.Column mobile={16} tablet={8} computer={4}>
        <Image src='/assets/images/wireframe/paragraph.png' />
      </Grid.Column>
      <Grid.Column mobile={16} tablet={8} computer={4}>
        <Image src='/assets/images/wireframe/paragraph.png' />
      </Grid.Column>
      <Grid.Column mobile={16} tablet={8} computer={4}>
        <Image src='/assets/images/wireframe/paragraph.png' />
      </Grid.Column>
      <Grid.Column mobile={16} tablet={8} computer={4}>
        <Image src='/assets/images/wireframe/paragraph.png' />
      </Grid.Column>
      <Grid.Column mobile={16} tablet={8} computer={4}>
        <Image src='/assets/images/wireframe/paragraph.png' />
      </Grid.Column>
    </Grid>

    <Grid>
      <Grid.Column largeScreen={2} widescreen={1}>
        <Image src='/assets/images/wireframe/paragraph.png' />
      </Grid.Column>
      <Grid.Column largeScreen={2} widescreen={1}>
        <Image src='/assets/images/wireframe/paragraph.png' />
      </Grid.Column>
      <Grid.Column largeScreen={2} widescreen={1}>
        <Image src='/assets/images/wireframe/paragraph.png' />
      </Grid.Column>
      <Grid.Column largeScreen={2} widescreen={1}>
        <Image src='/assets/images/wireframe/paragraph.png' />
      </Grid.Column>
    </Grid>
  </div>
)

export default GridExampleResponsiveWidth







import React from 'react'
import { Table } from 'semantic-ui-react'

const TableExampleStriped = () => (
  <Table striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Date Joined</Table.HeaderCell>
        <Table.HeaderCell>E-mail</Table.HeaderCell>
        <Table.HeaderCell>Called</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>John Lilki</Table.Cell>
        <Table.Cell>September 14, 2013</Table.Cell>
        <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
        <Table.Cell>No</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Jamie Harington</Table.Cell>
        <Table.Cell>January 11, 2014</Table.Cell>
        <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
        <Table.Cell>Yes</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Jill Lewis</Table.Cell>
        <Table.Cell>May 11, 2014</Table.Cell>
        <Table.Cell>jilsewris22@yahoo.com</Table.Cell>
        <Table.Cell>Yes</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>John Lilki</Table.Cell>
        <Table.Cell>September 14, 2013</Table.Cell>
        <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
        <Table.Cell>No</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>John Lilki</Table.Cell>
        <Table.Cell>September 14, 2013</Table.Cell>
        <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
        <Table.Cell>No</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Jamie Harington</Table.Cell>
        <Table.Cell>January 11, 2014</Table.Cell>
        <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
        <Table.Cell>Yes</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Jill Lewis</Table.Cell>
        <Table.Cell>May 11, 2014</Table.Cell>
        <Table.Cell>jilsewris22@yahoo.com</Table.Cell>
        <Table.Cell>Yes</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>John Lilki</Table.Cell>
        <Table.Cell>September 14, 2013</Table.Cell>
        <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
        <Table.Cell>No</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
)

export default TableExampleStriped







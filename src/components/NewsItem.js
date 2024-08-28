import React, { Component } from 'react'
import { Button, Card } from 'react-bootstrap'

export class NewsItem extends Component {
    render() {
        let { title, description ,imageurl,newsurl} = this.props;
    return (
     <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={imageurl} />
      <Card.Body>
                <Card.Title>{title}...</Card.Title>
        <Card.Text>
          {description}...
        </Card.Text>
        <Button variant="primary" target='_blank' href={newsurl}>read more</Button>
      </Card.Body>
    </Card>
    )
  }
}

export default NewsItem

import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default class Item extends React.Component {
  getFile = () => {
    const { getFile, item } = this.props;
    getFile && getFile(item);
  };
  render() {
    const { item } = this.props;
    return (
      <Card style={{ width: '18rem', marginRight: 20 }}>
        <Card.Body>
          <Card.Title>{item.name || 'Card Title'}</Card.Title>
          <Card.Text>
            {item.description ||
              'Some quick example text to build on the card title and make up the bulk of the card'}
          </Card.Text>
          <Button
            variant="primary"
            onClick={() => {
              this.getFile();
            }}
          >
            Lấy link chứng chỉ
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

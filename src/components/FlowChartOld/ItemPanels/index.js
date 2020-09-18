import React, { Component } from 'react';

class ItemPanels extends Component {

  render() {
    const { itemList } = this.props;
    const { Item, ItemPanel } = this.props.options;

    return (
      <>
        <ItemPanel className="itemPanel">
          {itemList.map((item, index) => {
            const { model, img } = item;
            const { type, size, label } = model;
            const { src, width, height } = img;
            return <Item className="item" key={index} model={{ type, size, label, }} >
              <img src={src} width={width} height={height} draggable={false} />
            </Item>
          })
          }
        </ItemPanel>
      </>
    )
  }
}

export default ItemPanels

import React from 'react';
import Item from './Item';

const ItemWrapper = ({ data, query }) => {
  let tag = false;
  data.tags.forEach((v) => {
    if (v.content === query) {
      tag = true;
    }
  });
  return <>{query ? tag && <Item data={data} /> : <Item data={data} />}</>;
};

export default ItemWrapper;

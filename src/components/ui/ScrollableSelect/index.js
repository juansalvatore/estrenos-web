import React from 'react';
import { withStyle } from 'baseui';
import { Label2 } from 'baseui/typography';
import { StyledList } from 'baseui/menu';
import { Select, StyledDropdownListItem } from 'baseui/select';
import { FixedSizeList } from 'react-window';

const LIST_ITEM_HEIGHT = 36;
const MAX_LIST_HEIGHT = 200;

const ListItem = withStyle(StyledDropdownListItem, {
  paddingTop: 0,
  paddingBottom: 0,
  display: 'flex',
  alignItems: 'center',
});

const FixedSizeListItem = ({ data, index, style }) => {
  const { item, ...restChildProps } = data[index].props;

  if (!item) {
    return (
      <ListItem
        key={restChildProps.children}
        style={{
          boxSizing: 'border-box',
          ...style,
        }}
        {...restChildProps}
      >
        <Label2>{restChildProps.children}</Label2>
      </ListItem>
    );
  }

  return (
    <ListItem
      key={item.name}
      style={{
        boxSizing: 'border-box',
        ...style,
      }}
      {...restChildProps}
    >
      {item.name}
    </ListItem>
  );
};

const VirtualDropdown = React.forwardRef((props, ref) => {
  const children = React.Children.toArray(props.children);
  const height = Math.min(MAX_LIST_HEIGHT, children.length * LIST_ITEM_HEIGHT);

  return (
    <StyledList ref={ref} $style={{ height: height + 'px' }}>
      <FixedSizeList
        height={height}
        itemCount={children.length}
        itemData={children}
        itemKey={(index, data) => {
          if (!data[index].props.item) return data[index].props.children;
          return data[index].props.item.name;
        }}
        itemSize={LIST_ITEM_HEIGHT}
        width="100%"
      >
        {FixedSizeListItem}
      </FixedSizeList>
    </StyledList>
  );
});

const ScrollableSelect = (props) => {
  return <Select {...props} overrides={{ Dropdown: VirtualDropdown }} />;
};

export default ScrollableSelect;
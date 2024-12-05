import { memo } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

/**
 * MemoizedButton Component
 * @param {Object} props
 * @param {boolean} props.isActive - Determines if the button is active (primary type).
 * @param {string} props.label - The label for the button.
 * @param {function} props.onClick - The click handler for the button.
 */
const MemoizedButton = memo(({ isActive, label, onClick }) => (
  <Button type={isActive ? 'primary' : ''} onClick={onClick}>
    {label}
  </Button>
));

MemoizedButton.displayName = 'MemoizedButton';

export default MemoizedButton;

MemoizedButton.propTypes = {
  isActive: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func,
};

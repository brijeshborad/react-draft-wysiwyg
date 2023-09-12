/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { stopPropagation } from '../../../utils/common';
import Option from '../../../components/Option';
import './styles.css';

class LayoutComponent extends Component {
  static propTypes: Object = {
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func,
    onChange: PropTypes.func,
    doCollapse: PropTypes.func,
    config: PropTypes.object,
    translations: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.emojiRef = React.createRef();
  }

  componentDidMount() {
    // Attach a click event listener to the document
    document.addEventListener('mousedown', this.handleClickOutside);
    document.addEventListener('keydown', this.handleClickOutside);
  }

  componentWillUnmount() {
    // Remove the click event listener when the component is unmounted
    document.removeEventListener('mousedown', this.handleClickOutside);
    document.removeEventListener('keydown', this.handleClickOutside);
  }

  handleClickOutside = (e) => {
    // Check if the clicked element is outside of the component's DOM element
    if (this.emojiRef.current && !this.emojiRef.current.contains(e.target)) {
      this.props.doCollapse();
    }
  };

  onChange = (event: Object) => {
    const { onChange } = this.props;
    onChange(event.target.innerHTML);
  };

  renderEmojiModal(): Object {
    const { config: { popupClassName, emojis } } = this.props;
    return (
      <div
        className={classNames('rdw-emoji-modal', popupClassName)}
        onClick={stopPropagation}
      >
        {
          emojis.map((emoji, index) => (<span
            key={index}
            className="rdw-emoji-icon"
            alt=""
            onClick={this.onChange}
          >{emoji}</span>))
        }
      </div>
    );
  }

  render(): Object {
    const {
      config: { icon, className, title },
      expanded,
      onExpandEvent,
      translations,
    } = this.props;
    return (
      <div ref={this.emojiRef}
        className="rdw-emoji-wrapper"
        aria-haspopup="true"
        aria-label="rdw-emoji-control"
        aria-expanded={expanded}
        title={title || translations['components.controls.emoji.emoji']}
      >
        <Option
          className={classNames(className)}
          value="unordered-list-item"
          onClick={onExpandEvent}
        >
          <img
            src={icon}
            alt=""
          />
        </Option>
        {expanded ? this.renderEmojiModal() : undefined}
      </div>
    );
  }
}

export default LayoutComponent;

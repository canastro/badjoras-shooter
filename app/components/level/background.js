import React, { PureComponent, PropTypes } from 'react';

const DEFAULT_STYLES = {
    width: '100%',
    height: '200%',
    position: 'absolute'
};

const scale = 2.56;

export default class LevelBackground extends PureComponent {
    getBackgroundStyles() {
        const { position, repeat, src } = this.props;

        return {
            backgroundImage: `url(${src})`,
            backgroundRepeat: repeat ? 'repeat' : 'initial',
            bottom: position * scale * -1,
            ...DEFAULT_STYLES
        };
    }

    render() {
        return (
            <div>
                <div style={this.getBackgroundStyles()} />
                {this.props.children}
            </div>
        );
    }
}

LevelBackground.defaultProps = {
    repeat: false
};

LevelBackground.propTypes = {
    src: PropTypes.string.isRequired,
    repeat: PropTypes.bool,
    position: PropTypes.number,
    children: PropTypes.arrayOf(PropTypes.node)
};

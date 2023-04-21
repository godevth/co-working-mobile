
import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

function Typography({style, size, color, children, ...rest}) {
    return (
        <Text 
            style={[
                size && { fontSize: size },
                color && {color},
                style && style,
            ]} {...rest}>
            {children}
        </Text>
    );
}

Typography.defaultProps = {
    children: null,
    style: null,
    color: null,
    size: 0,
}

Typography.propTypes = {
    children: PropTypes.any,
    style: PropTypes.any,
    color: PropTypes.string,
    size: PropTypes.number,
}

export default Typography;
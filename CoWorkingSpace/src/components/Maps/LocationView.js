import React from 'react'
import MapView from 'react-native-maps';

export const LocationView = ({location}) => {
    return (
        <MapView 
            style={{width: 250, height: 250}}
            region={{
                latitude: location.latitude,
                longitude: location.longitude,
            }}
            annotations={[
                {
                    latitude: location.latitude,
                    longitude: location.longitude,
                }
            ]}
            scrollEnabled={false}
            zoomEnabled={false}
        />
    )
}
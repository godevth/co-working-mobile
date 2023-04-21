<Marker
  key={index}
  coordinate={{
    latitude: 13.789775,
    longitude: 100.515301,
  }}
  tracksViewChanges={false}
  image={require('../../assets/Icon/pin.png')}
  title="Co-working Space Sbpds"
  description="This is the test description">
  <Callout tooltip>
    <Image
      source={require('../../assets/workingSpace2.jpg')}
      style={Styles.imageMaps}
    />
    <View style={Styles.contentMaps}>
      <Text style={Styles.textHaderMaps}>Test Maps</Text>
    </View>
    <View style={Styles.arrowBorder} />
    <View style={Styles.arrow} />
  </Callout>
</Marker>;

import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {Input, Rating} from 'react-native-elements';
import {Formik} from 'formik';
import {Styles} from '../../styles/styles';
import {Res} from '../../constants/env';

export default function ReviewForm({addReview, closeModal}) {
  return (
    <View style={[Styles.container, {borderWidth: 3}]}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
      <Formik
        initialValues={{detail: '', rating: 0}}
        onSubmit={(values, actions) => {
          // console.log(values)
          actions.resetForm();
          addReview(values);
        }}>
        {(props) => (
          <>
            <Input
              label={'Write a review'}
              labelStyle={styles.labelStyle}
              placeholder={'Detail'}
              placeholderTextColor={Res.Colors.Placeholder}
              containerStyle={{}}
              inputStyle={styles.inputStyle}
              inputContainerStyle={styles.inputContainerStyle}
              onChangeText={props.handleChange('detail')}
              multiline
                //  minHeight={60}
              value={props.values.detail}
              errorStyle={{color: Res.Colors.Error}}
              errorMessage={props.errors.detail}
            />
            <Rating
              imageSize={22}
              startingValue={0}
              ratingCount={Res.ratingCount}
              onFinishRating={
                (value) => {
                  props.setFieldValue('rating', value);
                }
                //   values => props.setFieldValue(rating, values)
                // (rating) => console.log('Click', rating)
              }
              style={{width: 150, borderWidth: 0}}
            />
            <View style={{alignItems: 'center'}}>
              <TouchableHighlight
                onPress={() => props.handleSubmit()}
                style={styles.buttonStyle}>
                <Text style={{color: Res.Colors.White}}>Submit</Text>
              </TouchableHighlight>
            </View>
          </>
        )}
      </Formik>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainerStyle: {
    backgroundColor: Res.Colors.White,
    borderRadius: 7,
    borderBottomWidth: 0,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  inputStyle: {
    fontSize: Res.Sizes.Body,
  },
  labelStyle: {
    fontSize: Res.Sizes.Subhead,
    color: Res.Colors.White,
    marginBottom: 8,
  },
  buttonStyle: {
    width: 150,
    height: 50,
    backgroundColor: Res.Colors.BlueLine,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
});

import React, { useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import styles from './Register.style'

import { Formik, validateYupSchema } from 'formik';
import * as yup from 'yup';

import Input from '../../components/Input'
import Button from '../../components/Button'
import TouchText from '../../components/TouchText/TouchText';
import authErrorMessage from '../../utils/authErrorMessagesParser';

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'

import flashMessage from '../../utils/flashMessage';


const initialFormValues = {
  username: '',
  email: '',
  password: '',
  repassword: '',
}

const Register = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  async function handleSignUp(formValues) {
    if (formValues.password !== formValues.repassword) {
      flashMessage('Şifreler Uyuşmuyor', 'warning')

      console.log('şifreler uyuşmuyor')
      return;
    }
    try {
      setLoading(true);
      await auth().createUserWithEmailAndPassword(formValues.email, formValues.password)

      await firestore()
        .collection('Users')
        .add({
          username: formValues.username,
          email: formValues.email,
          uid: auth().currentUser.uid,
        }).then(async () => {
          console.log('User added');
        })
      flashMessage('Kullanıcı Başarıyla Oluşturuldu', 'success')
      navigation.navigate('LoginScreen')
      setLoading(false)

    } catch (err) {
      console.log(err)
      flashMessage(authErrorMessage(err.code), 'warning')
      setLoading(false)
    }
  }

  const signUpValidationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Kullanıcı adı gerekli.'),
    email: yup
      .string()
      .email('Lütfen geçerli bir e-posta girin.')
      .required('E-posta adresi gerekli.'),
    password: yup
      .string()
      .min(6, ({ min }) => `Şifreniz en kısa ${min} haneli olabilir.`)
      .max(16, ({ max }) => `Şifreniz en uzun ${max} haneli olabilir.`)
      .required('Şifre gerekli.'),
    repassword: yup
      .string()
      .min(6, ({ min }) => `Şifreniz en kısa ${min} haneli olabilir.`)
      .max(16, ({ max }) => `Şifreniz en uzun ${max} haneli olabilir.`)
      .required('Şifre onayı gerekli.')
  })

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.text_container}>
        <Text style={styles.header}>E-posta gir.</Text>
      </View>
      <View style={styles.input_container}>
        <Formik
          validationSchema={signUpValidationSchema}
          initialValues={initialFormValues}
          onSubmit={handleSignUp}
        >{({ values, handleChange, handleSubmit, errors }) => (
          <>
            <Text style={styles.header_input}>KULLANICI ADI</Text>
            <Input
              value={values.username}
              onType={handleChange('username')}
              placeholder={'Kullanıcı adı'} />
            {errors.username &&
              <Text style={styles.error}> {errors.username} </Text>
            }
            <Text style={styles.header_input}>E-POSTA</Text>
            <Input
              value={values.email}
              onType={handleChange('email')}
              placeholder={'E-posta'} />
            {errors.email &&
              <Text style={styles.error}> {errors.email} </Text>
            }
            <Text style={styles.header_input}>ŞİFRE</Text>
            <Input
              value={values.password}
              onType={handleChange('password')}
              placeholder={'Şifre'} />
            {errors.password &&
              <Text style={styles.error}> {errors.password} </Text>
            }
            <Text style={styles.header_input}>ŞİFRE TEKRAR</Text>
            <Input
              value={values.repassword}
              onType={handleChange('repassword')}
              placeholder={'Şifre tekrar'} />
            {errors.repassword &&
              <Text style={styles.error}> {errors.repassword} </Text>
            }
            <TouchText text={'Gizlilik Politikamıza göz at'} />
            <Button text={'Kaydol'} loading={loading} onPress={handleSubmit} />
          </>
        )}
        </Formik>
      </View>
    </SafeAreaView>
  )
}
export default Register;
import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import styles from './Login.style'

import { Formik } from 'formik'
import * as yup from 'yup'

import Input from "../../components/Input/Input";
import Button from "../../components/Button"
import TouchText from "../../components/TouchText/TouchText";

import auth from '@react-native-firebase/auth'

const initialFormValues = {
  email: '',
  password: '',
}

const Login = () => {
  const [loading, setLoading] = useState(false);

  async function handleLogin(formValues) {
    try {
      setLoading(true);
      await auth()
        .signInWithEmailAndPassword(formValues.email, formValues.password)

      setLoading(false);
    } catch (error) {
      setLoading(false);

    }
  }

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Lütfen geçerli bir e-posta girin.')
      .required('E-posta adresi gerekli.'),
    password: yup
      .string()
      .required('Şifre gerekli.')
  })

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.text_container}>
        <Text style={styles.header}>Tekrar hoş geldin!</Text>
        <Text style={styles.text}>Seni tekrar gördüğümüze çok sevindik!</Text>
      </View>
      <View style={styles.input_container}>
        <Text style={styles.header_input}>HESAP BİLGİLERİ</Text>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={initialFormValues}
          onSubmit={handleLogin}>
          {({ values, handleChange, handleSubmit, errors }) => (
            <>
              <Input
                value={values.email}
                onType={handleChange('email')}
                placeholder={'E-posta'} />
              {errors.email &&
                <Text style={styles.error}>{errors.email}</Text>
              }
              <Input
                value={values.password}
                onType={handleChange('password')}
                placeholder={'Şifre'}
                isSecure={true} />
              {errors.password &&
                <Text style={styles.error}>{errors.password}</Text>
              }
              <TouchText text={'Şifreni mi unuttun?'} />
              <TouchText text={'Bir şifre yöneticisi kullan?'} />
              <Button text={'Giriş Yap'} onPress={handleSubmit} loading={loading} />
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  )
}

export default Login;
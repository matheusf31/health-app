import React, { useCallback, useRef } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Ionicons';

import api from '../../../services/api';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import medicineImg from '../../../assets/medicine.png';

import getValidationErrors from '../../../utils/getValidationErrors';

import {
  Container,
  Title,
  BackToSignInButton,
  BackToSignInText,
} from './styles';

interface ISignUpFormData {
  name: string;
  phone: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(
    async (data: ISignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório.'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um email válido'),
          password: Yup.string().min(6, 'Mínimo de 6 dígitos.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, email, password } = data;

        await api.post('/users', {
          name,
          email,
          password,
          firstLogin: true,
          game: {
            lvl: 1,
            xp: 0,
            insulinDaySequence: 0,
            medicineDaySequence: {
              sequency: 0,
              lastDay: '',
            },
            physicalActivityDaySequence: {
              sequency: 0,
              lastDay: '',
            },
            sequences: {
              'physical-activity': 0,
              'blood-glucose': 0,
              'insulin-therapy': 0,
              medicine: 0,
            },
            medals: {
              'physical-activity': 0,
              'blood-glucose': 0,
              'insulin-therapy': 0,
              medicine: 0,
            },
          },
        });

        Alert.alert('Cadastro realizado com sucesso!', 'Faça seu login.');

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert('Erro na autenticação!', `${err}`);
      }
    },
    [navigation],
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1, paddingBottom: 30 }}
      >
        <Container>
          <Image source={medicineImg} />

          <View>
            <Title>Crie sua conta</Title>
          </View>

          <Form ref={formRef} onSubmit={handleSignUp}>
            <Input
              autoCapitalize="words"
              name="name"
              icon="md-person"
              placeholder="Nome"
              returnKeyType="next"
              onSubmitEditing={() => emailInputRef.current?.focus()}
            />

            <Input
              ref={emailInputRef}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              name="email"
              icon="ios-mail"
              placeholder="E-mail"
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />

            <Input
              ref={passwordInputRef}
              secureTextEntry
              name="password"
              icon="ios-lock"
              placeholder="Senha"
              textContentType="oneTimeCode"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />

            <Button onPress={() => formRef.current?.submitForm()}>
              Cadastrar
            </Button>
          </Form>

          <BackToSignInButton onPress={() => navigation.goBack()}>
            <Icon name="ios-arrow-round-back" size={24} color="#146ba8" />
            <BackToSignInText>Login</BackToSignInText>
          </BackToSignInButton>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

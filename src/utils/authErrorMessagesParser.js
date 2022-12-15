export default function (errorCode) {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'Geçersiz E-posta';

    case 'auth/email-already-in-use':
      return 'Varolan E-posta';

    case 'auth/user-not-found':
      return 'Kullanıcı Bulunamadı';

    case 'auth/weak-password':
      return 'Zayıf Şifre';

    case 'auth/wrong-password':
      return 'Yanlış Şifre';


    default:
      return errorCode;
  }
}
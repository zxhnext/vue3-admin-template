// import i18n from '@/i18n'
export const validatePassword = () => {
  return (_: any, value: string, callback: any) => {
    if (value.length < 6) {
      // callback(new Error(i18n.global.t('msg.login.passwordRule')))
    } else {
      callback()
    }
  }
}

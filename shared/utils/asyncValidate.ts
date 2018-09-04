import * as api from 'utils/api'

export const validateNickName = (values: any, dispatch: any, props: any) => api.vaildateData({ nickname: values.get('nickname') }, 'nickname').then((res) => {
  console.log(dispatch)
  if (res) {
    return { nickname: props.locale === 'zh' ? '昵称已存在' : 'existed nickname' }
  }
})

export const validateEmail = (values: any, dispatch: any, props: any) => api.vaildateData({ email: values.get('email') }, 'email').then((res) => {
  console.log(dispatch)
  if (res) {
    return { email: props.locale === 'zh' ? '邮箱已存在' : 'existed email' }
  }
})

export const validateNickNameAndEmail = (values: any, dispatch: any, props: any, currentFieldName: string) => {
  const previousErrors = props.asyncErrors
  console.log(dispatch)
  if (currentFieldName === 'nickname') {
    return api.vaildateData({ nickname: values.get('nickname') }, 'nickname').then((res) => {
      if (res) {
        throw { ...previousErrors, nickname: props.locale === 'zh' ? '昵称已存在' : 'existed nickname' }
      }
    })
  }
  if (currentFieldName === 'email') {
    return api.vaildateData({ email: values.get('email') }, 'email').then((res) => {
      if (res) {
        throw { ...previousErrors, email: props.locale === 'zh' ? '邮箱已存在' : 'existed email' }
      }
    })
  }
  return new Promise(resolve => setTimeout(resolve, 0))
}

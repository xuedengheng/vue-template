const env = process.env

const LOCAL_URL = {
  api: 'http://local.com'
}

const DEV_URL = {
  api: 'http://dev.com'
}

const TEST_URL = {
  api: 'https://test.net'
}

const PROD_URL = {
  api: 'https://prod.com'
}

export const BASE_URL = env.NODE_ENV === 'production' ? PROD_URL : env.NODE_ENV === 'test' ? TEST_URL : env.NODE_ENV === 'dev' ? DEV_URL : LOCAL_URL

export const ERR_OK = 0

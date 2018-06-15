import * as TYPES from './mutation-types'

export const test = function({commit, state}, argument) {
  commit(TYPES.TYPE, argument)
}

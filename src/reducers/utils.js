import merge from 'lodash.merge';

export function assignToNew(oldObject, ...newValues) {
  return Object.assign({}, oldObject, ...newValues);
}

export function mergeToNew(oldObject, ...newValues) {
  return merge({}, oldObject, ...newValues);
}

const { NotImplementedError } = require('../extensions/index.js')

const { Node } = require('../extensions/list-tree.js')

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this._root = null
  }

  root() {
    return this._root
  }

  add(data) {
    this._root = addData(this._root, data)

    function addData(node, value) {
      if (!node) {
        return new Node(value)
      }

      if (node.data === value) {
        return node
      }

      value < node.data
        ? (node.left = addData(node.left, value))
        : (node.right = addData(node.right, value))

      return node
    }
  }

  has(data) {
    function searchData(node, value) {
      if (!node) {
        return false
      }

      if (node.data === value) {
        return true
      }

      return value < node.data
        ? searchData(node.left, value)
        : searchData(node.right, value)
    }

    return searchData(this._root, data)
  }

  find(data) {
    function findData(node, value) {
      if (!node) {
        return null
      }

      if (node.data === value) {
        return node
      }

      return value < node.data
        ? findData(node.left, value)
        : findData(node.right, value)
    }

    return findData(this._root, data)
  }

  remove(data) {
    this._root = removeData(this._root, data)

    function removeData(node, value) {
      if (!node) {
        return null
      }

      if (value < node.data) {
        node.left = removeData(node.left, value)
        return node

      } else if (value > node.data) {
        node.right = removeData(node.right, value)
        return node

      } else {

        if (!node.left && !node.right) {
          return null
        }

        if (!node.left) {
          node = node.right
          return node
        }

        if (!node.right) {
          node = node.left
          return node
        }

        let min = node.right
        while (min.left) {
          min = min.left
        }
        node.data = min.data
        node.right = removeData(node.right, min.data)
        return node
      }
    }
  }

  min() {
    if (!this._root){
      return
    }
    let node = this._root
    while (node.left){
      node = node.left
    }
    return node.data
  }

  max() {
    if (!this._root){
      return
    }
    let node = this._root
    while (node.right){
      node = node.right
    }
    return node.data
  }
}

module.exports = {
  BinarySearchTree,
}

import { ProductResponse } from '@renderer/apis/products/getSingleProduct'
import { cartItem } from '@renderer/store/cartSlice'

// Get color options
export const getColorsOptions = (productData: ProductResponse) => {
  const colorsData = productData.colors

  return (
    colorsData
      .filter((i) => i.available === true)
      .map((color) => {
        return {
          label: color.name,
          value: color.id
        }
      }) ?? []
  )
}

// Get Design options
export const getDesignOptions = (productData: ProductResponse, selectedColorId: string) => {
  const designData = productData.designs.find((design) => design.colorId === selectedColorId)

  return (
    designData?.designs
      .filter((i) => i.available === true)
      .map((design) => {
        return {
          label: design.name,
          value: design.id
        }
      }) ?? []
  )
}

// Get selected color name
export const getSelectedColorName = (productData: ProductResponse, selectedColorId: string) => {
  const colorsData = productData.colors

  return colorsData.find((color) => color.id === selectedColorId)?.name
}

// Get selected design name
export const getSelectedDesignName = (
  productData: ProductResponse,
  selectedColorId: string,
  selectedDesignId: string
) => {
  const designData = productData.designs.find((design) => design.colorId === selectedColorId)

  return designData?.designs.find((design) => design.id === selectedDesignId)?.name
}

export const getQuantityLeftInModels = (
  productData: ProductResponse,
  cartProducts?: cartItem[]
) => {
  const totalQuantity = productData.totalQuantity

  if (cartProducts) {
    const filteredCartProducts = cartProducts.filter(
      (cartProduct) => cartProduct.productId === productData.productId
    )

    const cartQuantity = filteredCartProducts.reduce((acc: number, cartProduct: cartItem) => {
      return Number(acc) + Number(cartProduct.quantity)
    }, 0)

    return {
      quantityLeft: totalQuantity - cartQuantity,
      msg:
        cartQuantity > 0
          ? `Only ${totalQuantity ? totalQuantity - cartQuantity : 0} left. ${cartQuantity} is in cart`
          : `Only ${totalQuantity ? totalQuantity - cartQuantity : 0} left.`
    }
  }

  return {
    quantityLeft: totalQuantity,
    msg: `Only ${totalQuantity} left in stock`
  }
}

export const getQuantityLeftInColours = (
  productData: ProductResponse,
  selectedColorId: string,
  cartProducts?: cartItem[]
) => {
  const totalQuantity = productData.colors.find(
    (color) => color.id === selectedColorId
  )?.availableQuantity

  if (cartProducts) {
    const filteredCartProducts = cartProducts.filter(
      (cartProduct) =>
        cartProduct.productId === productData.productId && cartProduct.color === selectedColorId
    )

    const cartQuantity = filteredCartProducts.reduce((acc: number, cartProduct: cartItem) => {
      return Number(acc) + Number(cartProduct.quantity)
    }, 0)

    return {
      quantityLeft: totalQuantity ? totalQuantity - cartQuantity : 0,
      msg:
        cartQuantity > 0
          ? `Only ${totalQuantity ? totalQuantity - cartQuantity : 0} left. ${cartQuantity} is in cart`
          : `Only ${totalQuantity ? totalQuantity - cartQuantity : 0} left.`
    }
  }

  return {
    quantityLeft: totalQuantity,
    msg: `Only ${totalQuantity} left in stock`
  }
}

export const getQuantityLeftInDesigns = (
  productData: ProductResponse,
  selectedColorId: string,
  selectedDesignId: string,
  cartProducts?: cartItem[]
) => {
  const totalQuantity = productData.designs
    .find((design) => design.colorId === selectedColorId)
    ?.designs.find((design) => design.id === selectedDesignId)?.availableQuantity

  if (cartProducts) {
    const filteredCartProducts = cartProducts.filter(
      (cartProduct) =>
        cartProduct.productId === productData.productId &&
        cartProduct.color === selectedColorId &&
        cartProduct.design === selectedDesignId
    )

    const cartQuantity = filteredCartProducts.reduce((acc: number, cartProduct: cartItem) => {
      return Number(acc) + Number(cartProduct.quantity)
    }, 0)

    return {
      quantityLeft: totalQuantity ? totalQuantity - cartQuantity : 0,
      msg:
        cartQuantity > 0
          ? `Only ${totalQuantity ? totalQuantity - cartQuantity : 0} left. ${cartQuantity} is in cart`
          : `Only ${totalQuantity ? totalQuantity - cartQuantity : 0} left.`
    }
  }

  return {
    quantityLeft: totalQuantity,
    msg: `Only ${totalQuantity} left in stock`
  }
}

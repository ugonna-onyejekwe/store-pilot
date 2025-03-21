import { ProductResponse } from '@renderer/apis/products/getSingleProduct'

export const getColorsOptions = (productData: ProductResponse) => {
  const colorsData = productData.colors

  return colorsData.map((color) => {
    return {
      label: color.name,
      value: color.name
    }
  })
}

// export const designOptions = (productData: ProductResponse, selectedColor:string) => {
//     const colorsData = productData.colors

//     return colorsData.map((color) => {
//       return {
//         label: color.name,
//         value: color.id
//       }
//     })
//   }

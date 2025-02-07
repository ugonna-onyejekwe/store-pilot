import ProductDetailsModal from '@renderer/components/productdetailsModal'
import SellProductModal from '@renderer/components/sellProductModal.tsx'
import Button from '@renderer/components/ui/Button'
import { Icons } from '@renderer/components/ui/icons'
import { useState } from 'react'
import './styles.scss'

const Products = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [showProductDetails, setShowProductDetails] = useState(false)
  const [isSellingProduct, setIsSellingProduct] = useState(false)

  const productsInfo = [
    {
      modelId: '27',
      subcatId: '822',
      subCategory: 'by 4',
      model: '2444',
      quantity: '300',
      colors: [
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        }
      ],
      designs: [
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'fabric'
        },
        {
          desdingId: '1233',
          name: 'jons'
        }
      ],
      cartoons: 10
    },
    {
      modelId: '27',
      subcatId: '822',
      subCategory: 'by 4',
      model: '2444',
      quantity: '300',
      colors: [
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        }
      ],
      designs: [
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'fabric'
        },
        {
          desdingId: '1233',
          name: 'jons'
        }
      ],
      cartoons: 10
    },
    {
      modelId: '27',
      subcatId: '822',
      subCategory: 'by 4',
      model: '2444',
      quantity: '300',
      colors: [
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        }
      ],
      designs: [
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'fabric'
        },
        {
          desdingId: '1233',
          name: 'jons'
        }
      ],
      cartoons: 10
    },
    {
      modelId: '27',
      subcatId: '822',
      subCategory: 'by 4',
      model: '2444',
      quantity: '300',

      cartoons: 10
    },
    {
      modelId: '27',
      subcatId: '822',
      subCategory: 'by 4',
      model: '2444',
      quantity: '300',
      colors: [
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        }
      ],
      designs: [
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'fabric'
        },
        {
          desdingId: '1233',
          name: 'jons'
        }
      ],
      cartoons: 10
    },
    {
      modelId: '27',
      subcatId: '822',
      subCategory: 'by 4',
      model: '2444',
      quantity: '300',

      designs: [
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'fabric'
        },
        {
          desdingId: '1233',
          name: 'jons'
        }
      ],
      cartoons: 10
    },
    {
      modelId: '27',
      subcatId: '822',
      subCategory: 'by 4',
      model: '2444',
      quantity: '300',
      colors: [
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        }
      ],
      designs: [
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'fabric'
        },
        {
          desdingId: '1233',
          name: 'jons'
        }
      ],
      cartoons: 10
    },
    {
      modelId: '27',
      subcatId: '822',
      subCategory: 'by 4',
      model: '2444',
      quantity: '300',
      colors: [
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        }
      ],

      cartoons: 10
    },
    {
      modelId: '27',
      subcatId: '822',
      subCategory: 'by 4',
      model: '2444',
      quantity: '300',
      colors: [
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        }
      ],
      designs: [
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'fabric'
        },
        {
          desdingId: '1233',
          name: 'jons'
        }
      ],
      cartoons: 10
    },
    {
      modelId: '27',
      subcatId: '822',
      subCategory: 'by 4',
      model: '2444',
      quantity: '300',
      colors: [
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        },
        {
          name: 'red',
          id: '7272',
          quantity: 600
        }
      ],
      designs: [
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'S7'
        },
        {
          desdingId: '1233',
          name: 'fabric'
        },
        {
          desdingId: '1233',
          name: 'jons'
        }
      ],
      cartoons: 10
    }
  ]

  const filters = [
    {
      name: 'chair',
      id: '123'
    },
    {
      name: 'chair',
      id: '123'
    },
    {
      name: 'chair',
      id: '123'
    },
    {
      name: 'chair',
      id: '123'
    },
    {
      name: 'chair',
      id: '123'
    }
  ]

  return (
    <div className="product_details_container container">
      {/* Filter items */}
      <div className="filter_items">
        <span
          className={activeFilter === 'all' ? 'active' : ''}
          onClick={() => setActiveFilter('all')}
        >
          all
        </span>

        {filters.map((i, key) => {
          const isActive = i.id === activeFilter
          return (
            <span
              key={key}
              className={isActive ? 'active' : ''}
              onClick={() => setActiveFilter(i.id)}
            >
              {i.name}
            </span>
          )
        })}
      </div>

      {/* product container */}
      <div className="products_container">
        {productsInfo.map((i, key) => (
          <div key={key} className="detail_box">
            <div className="txt_con">
              <p className="txt">
                <small>
                  <Icons.BulletPoint2 className="bullet_icon" />
                </small>

                <li>
                  Category: <b>{i.subCategory}</b>
                </li>
              </p>

              <p className="txt">
                <small>
                  <Icons.BulletPoint2 className="bullet_icon" />
                </small>

                <li>
                  Model: <b>{i.model}</b>
                </li>
              </p>

              <p className="txt">
                <small>
                  <Icons.BulletPoint2 className="bullet_icon" />
                </small>

                <li>
                  Quantity left: <b>{i.quantity}</b>
                </li>
              </p>

              <p className="txt">
                <small>
                  <Icons.BulletPoint2 className="bullet_icon" />
                </small>

                <li>
                  Cartoons per product: <b>{i.cartoons}</b>
                </li>
              </p>
            </div>

            {/* Available colors */}
            {i.colors?.length > 0 && (
              <div className="available_color_con">
                <h3>Avaliable colors:</h3>

                <div className="con">
                  {i.colors?.map((color, key) => {
                    return <span key={key}>• {color.name}</span>
                  })}
                </div>
              </div>
            )}

            {/* Available designs */}
            {i.designs?.length > 0 && (
              <div className="available_designs_con">
                <h3>Avaliable designs/materials:</h3>

                <div className="con">
                  {i.designs?.map((design, key) => <span key={key}>• {design.name}</span>)}
                </div>
              </div>
            )}

            <div className="btns">
              <button className="view_btn" onClick={() => setShowProductDetails(true)}>
                <Icons.EyeIcon className="eye_icon" />
              </button>

              <Button text="Sell product" onClick={() => setIsSellingProduct(true)} />
            </div>
          </div>
        ))}
      </div>

      {/* product details modal */}
      <ProductDetailsModal open={showProductDetails} onOpenChange={setShowProductDetails} />

      {/* Sellproduct modal */}
      <SellProductModal onOpen={isSellingProduct} onOpenChange={setIsSellingProduct} />
    </div>
  )
}

export default Products

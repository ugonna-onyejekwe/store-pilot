import { useGetCategories } from '@renderer/apis/categories/getCategories'
import { useNavigate } from 'react-router-dom'
import { Icons } from '../ui/icons'
import { ScaleLoaderUI } from '../ui/loader'
import SideSheet from '../ui/sideSheet'
import './styles.scss'

type CategorySideBarProps = {
  open: boolean
  onOpenChange: (value: boolean) => void
  category: string
}

const CategorySideBar = ({ category, open, onOpenChange }: CategorySideBarProps) => {
  const { CategoriesData, isPending } = useGetCategories()
  const navigate = useNavigate()

  const handleSetParameter = (id: string) => {
    const params = new URLSearchParams()
    params.set('category', id)
    navigate(`?${params.toString()}`)
  }

  return (
    <SideSheet className="category_sidebar" onOpen={open} onOpenChange={onOpenChange}>
      {isPending ? (
        <ScaleLoaderUI minHeight={100} />
      ) : (
        <>
          <div className="wrapper">
            <h3>Categories</h3>

            <div className="list_con">
              {CategoriesData?.map((i, key) => (
                <p
                  key={key}
                  onClick={() => {
                    handleSetParameter(i.value)
                    onOpenChange(false)
                  }}
                  className={i.value === category ? 'active' : ''}
                >
                  <span>
                    <Icons.BulletPoint className="bullet" />
                  </span>{' '}
                  {i.label}
                </p>
              ))}
            </div>
          </div>
        </>
      )}
    </SideSheet>
  )
}

export default CategorySideBar

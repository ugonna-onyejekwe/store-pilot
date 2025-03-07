import { useGetCategories } from '@renderer/apis/categories/getCategories'
import { Icons } from '../ui/icons'
import { ScaleLoaderUI } from '../ui/loader'
import SideSheet from '../ui/sideSheet'
import './styles.scss'

type CategorySideBarProps = {
  setCategory: (value: string) => void
  open: boolean
  onOpenChange: (value: boolean) => void
  category: string
}

const CategorySideBar = ({ category, setCategory, open, onOpenChange }: CategorySideBarProps) => {
  const { CategoriesData, isPending } = useGetCategories()
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
                  onClick={() => setCategory(i.value)}
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

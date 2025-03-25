import Button from '@renderer/components/ui/Button'
import { Icons } from '@renderer/components/ui/icons'

type SummaryProps = {
  defaultValues: CreateCategoryFormInitialvalues
  handleChange: () => void
  setFormSteps: (value: number) => void
  isLoading: boolean
  buttonText: string
}

const Summary = ({
  defaultValues,
  handleChange,
  setFormSteps,
  isLoading,
  buttonText
}: SummaryProps) => {
  return (
    <div className="form_summary_con">
      <div className="head">
        <h2>Summary</h2>
        <p> Cross check your entries carefully before proceeding</p>
      </div>

      <div className="general_info_con">
        <p>
          Category name: <span> {defaultValues.name}</span>
        </p>
        <p>
          Has model: <span>{defaultValues.hasModel ? 'True' : 'False'}</span>
        </p>
        <p>
          Has sub-categories: <span>{defaultValues.hasSubcategories ? 'True' : 'False'}</span>
        </p>
        <p>
          Has sub-products: <span>{defaultValues.hasSubProducts ? 'True' : 'False'}</span>
        </p>
        <p>
          Has colours: <span>{defaultValues.hasColor ? 'True' : 'False'}</span>
        </p>
        <p>
          Has designs: <span>{defaultValues.hasDesign ? 'True' : 'False'}</span>
        </p>
      </div>

      {defaultValues.hasSubcategories && (
        <div className="sub_cate_list">
          <h5>List of sub-categories</h5>
          <p>
            {defaultValues.subcategories
              .split(',')
              .filter(Boolean)
              .map((i, key) => (
                <span key={key}>• {i.trim()}</span>
              ))}
          </p>
        </div>
      )}

      {defaultValues.hasSubcategories === false && defaultValues.hasSubProducts && (
        <div className="Single_subproducts">
          <h5>List of sub-products</h5>
          {defaultValues.subProducts.map((i, key) => (
            <p key={key}>
              <span>
                <Icons.CheckIcon className="checkicon" />
              </span>{' '}
              {i.name}
            </p>
          ))}
        </div>
      )}

      {defaultValues.hasSubcategories && defaultValues.hasSubProducts && (
        <div className="multiSuproducts">
          <h4>Lists of subproduct for each sub-category</h4>

          <div className="info_con">
            {defaultValues.subProducts.map((category, key) => (
              <div key={key}>
                <h5>Sub-products for {category.subCategoryName}</h5>

                <div className="subproducts">
                  {category.subProducts?.map((i, key) => (
                    <p key={key}>
                      <span>
                        • Name: <small>{i.name}</small>
                      </span>
                      <span>
                        Default quantity: <small> {i.defaultQuantity}</small>
                      </span>
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {defaultValues.hasColor && (
        <div className="colors_con">
          <h5>List of colors</h5>
          <p>
            {defaultValues.colors
              .split(',')
              .filter(Boolean)
              .map((i, key) => (
                <span key={key}>• {i.trim()}</span>
              ))}
          </p>
        </div>
      )}

      {defaultValues.hasDesign && (
        <div className="design_con">
          <h5>List of designs</h5>
          <p>
            {defaultValues.designs
              .split(',')
              .filter(Boolean)
              .map((i, key) => (
                <span key={key}>• {i.trim()}</span>
              ))}
          </p>
        </div>
      )}

      <div className="btn btn_multi">
        <Button
          text="Edit"
          onClick={() => (defaultValues.hasModel === false ? setFormSteps(1) : setFormSteps(5))}
          varient="outline"
        />

        <Button
          text={buttonText}
          type="submit"
          onClick={() => handleChange()}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

export default Summary

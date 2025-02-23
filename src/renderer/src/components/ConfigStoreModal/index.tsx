import { useAddWarehouse } from '@renderer/apis/warehouses/createWarehouse'
import { useDeleteWarehouse } from '@renderer/apis/warehouses/deleteWarehouse'
import { useReturnAllWarehouses } from '@renderer/apis/warehouses/getAllWarehouses'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import { ConfigStoreSchema } from '../forms/schemas'
import { Input, SelecInput } from '../inputs'
import AlertModal from '../ui/alertModal'
import Button from '../ui/Button'
import { toastUI } from '../ui/toast'
import './styles.scss'

type ConfigStoreProps = {
  open: boolean
  onOpenChange: (value: boolean) => void
}

export const ConfigStoreModal = ({ open, onOpenChange }: ConfigStoreProps) => {
  const { isPending: isDeletingWarehouse, mutateAsync } = useDeleteWarehouse()
  const { isPending: isAdding, mutateAsync: addWarehouse } = useAddWarehouse()
  const {
    mutateAsync: getAllWarehouse,
    isPending: isGettingCategory,
    data: warehouses
  } = useReturnAllWarehouses()

  const onSubmit = async (values) => {
    if ((values.actionType === 'delete' || values.actionType === 'add') && values.warehouse === '')
      return toastUI.error('Warehouse name is required')

    if (values.actionType === 'add') {
      addWarehouse({
        name: values.warehouse
      })
        .then(() => {
          toastUI.success('Warehouse added successfully')
          resetForm()
          onOpenChange(false)
        })
        .catch((error) => console.log(error))
    }

    if (values.actionType === 'delete') {
      mutateAsync({
        id: values.warehouse
      })
        .then(() => {
          toastUI.success('Warehouse deleted successfully')
          resetForm()
          onOpenChange(false)
        })
        .catch((error) => console.log(error))
    }
  }

  const { values, handleChange, handleSubmit, errors, touched, setFieldValue, resetForm } =
    useFormik({
      initialValues: {
        actionType: '',
        warehouse: ''
      },
      validationSchema: ConfigStoreSchema,
      onSubmit
    })

  useEffect(() => {
    getAllWarehouse()
      .then(() => {
        if (warehouses?.length === 0) return toastUI.error('No warehouses yet')
      })
      .catch((error) => console.log(error))
  }, [values.actionType])

  return (
    <AlertModal open={open} onOpenChange={onOpenChange} className="config_wareHouse_form">
      <form onSubmit={handleSubmit}>
        <div className="head">
          <h2>Configure warehouses </h2>
          <p className="subheader">Enter details to proceed</p>
        </div>

        <SelecInput
          label="Do you want to delete or add warehouse name?"
          placeholder="Select"
          onChange={setFieldValue}
          id="actionType"
          name="actionType"
          options={[
            { label: 'Delete', value: 'delete' },
            { label: 'Add', value: 'add' }
          ]}
        />

        {values.actionType === 'delete' && (
          <SelecInput
            label="Select warehouse name you want to delete "
            placeholder="Select"
            onChange={setFieldValue}
            id="warehouse"
            name="warehouse"
            options={warehouses?.map((i) => ({ label: i.name, value: i.id })) ?? []}
          />
        )}

        {values.actionType === 'add' && (
          <Input
            label="Enter warehouse name"
            placeholder="Warehouse name"
            onChange={handleChange('warehouse')}
            value={values.warehouse}
          />
        )}

        <Button
          text={
            values.actionType === 'add'
              ? 'Add warehouse'
              : values.actionType === 'delete'
                ? 'Delete warehouse'
                : 'Select'
          }
          disable={values.actionType === ''}
          type="submit"
          isLoading={isAdding || isDeletingWarehouse}
        />
      </form>
    </AlertModal>
  )
}

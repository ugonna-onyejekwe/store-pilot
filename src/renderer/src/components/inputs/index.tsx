import Select from 'react-select'
import './styles.scss'

export const Input = ({
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  touched,
  errorMsg,
  type = 'text'
}: InputProps) => {
  return (
    <div className="text_input input_con">
      {label && <label>{label}</label>}
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
      />
      {touched && errorMsg && <p className="error_msg">{errorMsg}</p>}
    </div>
  )
}

export const SelecInput = ({
  options,
  isLoading = false,
  label,
  errorMsg,
  touched,
  onChange,
  placeholder,
  name,
  id,
  defaultValue
}: SelecInputProps) => {
  const colourStyles = {
    control: (styles, { isFocused }) => ({
      ...styles,
      backgroundColor: 'white',
      padding: '9px',
      borderRadius: '10px',
      border: '1px',
      outline: isFocused ? '1px solid #0466cf' : '1px solid rgb(191, 191, 191)'
    })
  }

  return (
    <div className="select_input input_con">
      {label && <label>{label}</label>}
      <Select
        id={id}
        options={options}
        isLoading={isLoading}
        onChange={(e) => {
          onChange(name, e?.value)
        }}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="input"
        styles={colourStyles}
      />
      {touched && errorMsg && <p className="error_msg">{errorMsg}</p>}
    </div>
  )
}

export const BooleanInput = ({
  name,
  label,
  onChange,
  value,
  touched,
  err_msg
}: BooleanInputProps) => {
  return (
    <div className="input_con boolean_input_con">
      <label>{label}</label>
      <div className="option_con">
        <div className="option">
          <label htmlFor="yes">
            <input
              type="radio"
              id="yes"
              name={name}
              value="yes"
              checked={value === true}
              onChange={(e) => onChange(name, e.target.value === 'yes')}
            />
            Yes
          </label>

          {touched && err_msg && <p className="error_msg">{err_msg}</p>}
        </div>

        <div className="option">
          <label htmlFor="no">
            <input
              type="radio"
              id="no"
              name={name}
              value={'no'}
              onChange={(e) => onChange(name, e.target.value === 'yes')}
              checked={value === false}
            />{' '}
            No
          </label>
          {touched && err_msg && <p className="error_msg">{err_msg}</p>}
        </div>
      </div>
    </div>
  )
}

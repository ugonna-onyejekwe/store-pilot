import { ScaleLoader } from 'react-spinners'
import './styles.scss'

export const FormLoader = () => {
  return (
    <div className="formLoader">
      <div className="header skeleton" />
      <div className="subheader skeleton" />

      <div className="con">
        {[...new Array(2)].map((_, key) => (
          <div key={key} className="skeleton input" />
        ))}
      </div>

      <div className="btns">
        {[...new Array(2)].map((_, key) => (
          <div key={key} className="skeleton btn" />
        ))}
      </div>
    </div>
  )
}

export const SummaryLoader = () => {
  return (
    <div className="summaryLoader">
      <div className="header skeleton" />
      <div className="subheader skeleton" />

      {[...new Array(2)].map((_, key) => (
        <div className="con" key={key}>
          <h3 className="subheade2 skeleton" />
          {[...new Array(2)].map((_, key) => (
            <div key={key} className="skeleton list" />
          ))}
        </div>
      ))}
    </div>
  )
}

export const ScaleLoaderUI = ({
  height,
  width,
  color,
  minHeight
}: {
  height?: number
  width?: number
  color?: string
  minHeight: number
}) => {
  return (
    <div
      className="scaleLoader"
      style={{
        minHeight: minHeight
      }}
    >
      <ScaleLoader height={height ?? 35} width={width ?? 4} color={color ?? '#a8a8a8'} />
    </div>
  )
}

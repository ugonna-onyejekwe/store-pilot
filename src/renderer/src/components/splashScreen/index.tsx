import { Icons } from '../ui/icons'
import { ScaleLoaderUI } from '../ui/loader'
import './styles.scss'

const SplashScreen = () => {
  return (
    <div className="splashScreenCon">
      <div className="box">
        <div className="bot_con">
          <Icons.Logo className="logo" />
        </div>

        <h1>
          Store<span>pilot</span>
        </h1>
        <p>Your Store, Made Easy.</p>

        <ScaleLoaderUI minHeight={100} color="#0466cf" height={10} />
      </div>
    </div>
  )
}

export default SplashScreen

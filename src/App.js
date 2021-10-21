import React, { useState } from 'react'
import { makeStyles } from '@mui/styles';
import Wrapper from './components/wrapper';
import Navigation from './components/nav/Navigation';

const useStyle = makeStyles((theme) => ({

}))
export default function App() {
  const [backgroundImage, setBackgroundImage] = useState('pink')
  const classes = useStyle()
  return (
    <div className={classes.root}
      style={{
        backgroundColor: backgroundImage,
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>
      <Navigation setBackgroundImage={setBackgroundImage} />
      <Wrapper />
    </div>
  )
}
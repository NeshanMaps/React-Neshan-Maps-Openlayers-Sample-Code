import { useEffect, useRef, useState } from "react"
import "@neshan-maps-platform/react-openlayers/dist/style.css"

import NeshanMap, { NeshanMapRef, OlMap, Ol } from "@neshan-maps-platform/react-openlayers"

function App() {
  const mapRef = useRef<NeshanMapRef | null>(null)

  const [ol, setOl] = useState<Ol>()
  const [olMap, setOlMap] = useState<OlMap>()

  const onInit = (ol: Ol, map: OlMap) => {
    setOl(ol)
    setOlMap(map)

    setTimeout(() => {
      const view = map.getView()
      view.animate({
        center: (ol.proj.fromLonLat)([
          51.36281969540723, 35.69672648316882,
        ]),
        zoom: 12,
        duration: 1000,
      })
    }, 2000)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (mapRef.current?.map) {
        mapRef.current?.map.setMapType("standard-night")
        clearInterval(interval)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <NeshanMap
        mapKey="YOUR_MAP_KEY"
        defaultType="neshan"
        center={{ latitude: 35.7665394, longitude: 51.4749824 }}
        style={{ height: "48vh", width: "100%" }}
        onInit={onInit}
        zoom={13}
      ></NeshanMap>
      <hr />
      <NeshanMap
        ref={mapRef}
        mapKey="YOUR_MAP_KEY"
        traffic={false}
        defaultType="dreamy"
        style={{ height: "48vh", width: "100%" }}
      ></NeshanMap>
    </>
  )
}

export default App
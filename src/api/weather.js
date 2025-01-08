import * as Location from 'expo-location'

const apiKey = process.env.EXPO_PUBLIC_WEATHER_API_KEY

const fetchWeatherData = async () => {
  // 사용자에게 위치 정보 허가받기
  let { status } = await Location.requestForegroundPermissionsAsync()
  if (status !== 'granted') {
    throw new Error('Permission to access location was denied')
  }

  // expo의 location api로 위도와 경도 얻기
  const {
    coords: { latitude, longitude },
  } = await Location.getCurrentPositionAsync({})

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=kr`
  )

  return response.json()
}

export default fetchWeatherData

import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native'

import { Fontisto } from '@expo/vector-icons'

import { useQuery } from '@tanstack/react-query'
import fetchWeatherData from '../api/weather'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

export default function WeatherApp() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['weather'],
    queryFn: fetchWeatherData,
    staleTime: 1000 * 60 * 60, // 1시간
  })

  const dailyForecast = data?.list?.filter((item) => item.dt_txt.includes('12:00:00'))

  if (error) return <Text>Error: {error.message}</Text>

  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <View style={styles.city}>
        <Text style={styles.cityName}>{data?.city?.name}</Text>
      </View>

      <View style={{ flex: 3, backgroundColor: 'gray', paddingTop: 40 }}>
        {isLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator size='large' />
          </View>
        ) : (
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.weather}
          >
            {dailyForecast?.map((item, index) => (
              <View key={item?.dt_txt} style={styles.day}>
                <Text style={styles.date}>{item?.dt_txt.split(' ')[0]}</Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 20,
                  }}
                >
                  <Text style={styles.temp}>{Math.floor(item?.main?.temp)}°C</Text>
                  <Image
                    source={{
                      uri: `https://openweathermap.org/img/wn/${item.weather[0].icon.replace(
                        'n',
                        'd'
                      )}@2x.png`,
                    }}
                    style={{ width: 100, height: 100 }} // 크기는 필요에 따라 조정
                  />
                </View>
                <Text style={styles.description}>{item?.weather[0]?.main}</Text>
                <Text style={styles.tinyText}>{item?.weather[0]?.description}</Text>

                <View style={styles.paginationContainer}>
                  <Text style={styles.pagination}>
                    {index + 1} / {dailyForecast?.length}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F0E8',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
  },
  city: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityName: {
    fontSize: 48,
    fontWeight: '500',
  },

  day: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
  },
  date: {
    fontSize: 30,
  },
  temp: {
    fontSize: 100,
  },
  description: {
    marginTop: -10,
    fontSize: 50,
  },
  tinyText: {
    fontSize: 20,
  },

  paginationContainer: {
    width: '100%', // 전체 너비
    flexDirection: 'row', // 가로 방향
    justifyContent: 'flex-end', // 오른쪽 정렬
    paddingRight: 20, // 우측 여백
  },
  pagination: {
    fontSize: 16,
    marginRight: 30,
  },
})

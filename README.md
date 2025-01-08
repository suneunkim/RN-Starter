# React Native Expo 프로젝트 시작하기

## 프로젝트 초기 설정

### 1. 프로젝트 생성

TypeScript 템플릿을 사용하여 새로운 Expo 프로젝트를 생성합니다.

```bash
npx create-expo-app@latest my-app --template typescript
```

### 2. 개발 서버 실행

터널 모드로 개발 서버를 시작합니다.

```bash
npx expo start --tunnel
```

### 3. 모바일 환경 준비 (안드로이드 기준)

- Expo Go 애플리케이션을 Google Play Store에서 다운로드
- Expo 계정으로 로그인

```bash
npx expo login
```

## React Native UI 컴포넌트

https://reactnative.dev/docs/components-and-apis

### View 컴포넌트

기본적인 UI 컨테이너로, HTML의 <div>와 유사합니다. 레이아웃과 스타일링의 기본 단위입니다. Flexbox 레이아웃을 지원하며, 다른 컴포넌트들을 감싸고 정렬하는 데 사용됩니다.

### Text 컴포넌트

텍스트를 표시하는 유일한 컴포넌트입니다. React Native에서는 일반 텍스트를 렌더링하기 위해 반드시 <Text> 컴포넌트를 사용해야 합니다. 텍스트 스타일링, 중첩, 터치 이벤트 처리 등을 지원합니다.

### Image 컴포넌트

이미지를 표시하는 컴포넌트로, 로컬 이미지와 네트워크 이미지를 모두 지원합니다. 크기 조정, 리사이징, 스타일링 등 다양한 옵션을 제공합니다.

### Button 컴포넌트

모든 플랫폼에서 일관되게 렌더링되는 기본 버튼 컴포넌트입니다. 최소한의 커스터마이징을 지원하며, 필요한 경우 Pressable을 사용해 직접 버튼을 만들 수 있습니다.

### TextInput 컴포넌트

키보드를 통해 앱에 텍스트를 입력하는 기본 컴포넌트입니다. 자동 수정, 자동 대문자, 플레이스홀더 텍스트, 숫자 키보드 등 다양한 기능을 구성할 수 있습니다. 사용자 입력을 감지하고 처리하는 여러 이벤트를 제공합니다.

### TouchableOpacity 컴포넌트

터치 기반 입력에 반응하는 뷰를 만드는 래퍼 컴포넌트입니다. 터치 시 불투명도가 감소하여 시각적 피드백을 제공합니다. 터치 인터랙션에 따라 자식 뷰의 투명도를 조정하여 사용자 상호작용을 표현합니다.

### 스크롤 컴포넌트

React Native에서 스크롤 기능을 구현할 때는 주로 ScrollView와 FlatList 두 가지 컴포넌트를 사용합니다.

#### <ScrollView> 속성

- `contentContainerStyle={styles.weather}`: 전체 스크롤 영역에 적용되는 스타일을 의미합니다.
- `horizontal`: ScrollView를 가로 방향으로 스크롤되게 합니다.
- `pagingEnabled`: 가로 스크롤 시 페이지 단위로 움직이게 합니다.
- `showsHorizontalScrollIndicator`: 가로 스크롤바 표시 여부를 조절합니다.
- `scrollEventThrottle:` 스크롤 이벤트 발생 주기를 제어합니다.
- `decelerationRate`: 스크롤 감속률을 조정합니다.

#### ScrollView

- ScrollView는 모든 자식 컴포넌트를 한 번에 렌더링하는 컴포넌트입니다. 작은 양의 콘텐츠를 스크롤할 때 적합하며, 모든 항목을 메모리에 한 번에 로드합니다.
- 주의할 점은 스크롤 뷰가 제대로 작동하기 위해서는 반드시 높이가 제한되어야 한다는 것입니다. 즉, 부모 컴포넌트에 flex: 1과 같은 높이 제한 스타일을 적용해야 합니다.

#### 주의사항

- ScrollView 컴포넌트 style에 `flex: 1` 을 사용하면 스크롤 이동이 원활하지 않을 수 있습니다.
- 내부 요소가 꽉 채워지게끔 하려면 아래처럼 너비를 지정할 수 있습니다.

```jsx
import { Dimensions } from 'react-native'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const styles = StyleSheet.create({
  item: {
    width: SCREEN_WIDTH, // 화면 전체 너비 지정
  },
})
```

```jsx
<ScrollView>
  {items.map((item) => (
    <View key={item.id}>
      <Text>{item.name}</Text>
    </View>
  ))}
</ScrollView>
```

#### FlatList

- 대량의 데이터를 다룰 때는 FlatList가 훨씬 더 효율적입니다. FlatList는 화면에 보이는 항목만 렌더링하고, 스크롤되어 화면에서 사라지는 항목은 메모리에서 제거합니다.

- 이는 대량의 데이터를 처리할 때 성능과 메모리 측면에서 큰 이점을 제공합니다. 또한 FlatList는 구분선, 다열 레이아웃, 무한 스크롤 등 다양한 추가 기능을 기본적으로 지원합니다.

```jsx
const items = [
  { id: '1', name: '노트북', price: 1000 },
  { id: '2', name: '스마트폰', price: 800 },
]
```

```jsx
<FlatList
  data={items}
  renderItem={({ item }) => (
    <View>
      <Text>{item.name}</Text>
      <Text>{item.price}원</Text>
    </View>
  )}
  keyExtractor={(item) => item.id}
/>
```

#### 선택 기준

- 소량의 항목(20개 이하): ScrollView
- 대량의 항목/긴 목록: FlatList

데이터 렌더링 시 항상 성능과 사용자 경험을 고려하여 적절한 컴포넌트를 선택하는 것이 중요합니다.

---

# API 활용하기

https://docs.expo.dev/versions/latest

## 주요 Expo API

### expo-location

- 사용자의 위치 정보 획득
- 지오펜싱, 위치 추적 등의 기능 지원

#### 일부 메서드

- `requestForegroundPermissionsAsync()`: 앱이 포그라운드일 때만 위치 정보 접근 권한을 요청합니다.
- `getLastKnownPositionAsync()`: 마지막으로 알려진 사용자의 위치 정보를 가져옵니다.
- `watchPositionAsync()`: 사용자의 실시간 위치를 추적합니다.
- `reverseGeocodeAsync()`: 위도와 경도로 해당 위치에 대한 주소 정보(국가, 행정구역, 도시 등)를 반환합니다.

### expo-camera

- 카메라 기능 제공
- 사진/동영상 촬영, 바코드/QR코드 스캔 등 지원

### expo-notifications

- 푸시 알림, 로컬 알림 기능 구현

### expo-media-library

- 사진, 동영상 등 미디어 파일 관리
- 앨범에서 파일 선택, 저장 등 가능

### expo-contacts

- 사용자 연락처 정보에 접근
- 연락처 목록 가져오기, 추가 등의 기능

### expo-secure-store

- 보안이 필요한 데이터 저장 및 관리

### expo-file-system

- 파일 시스템 접근, 파일 읽기/쓰기 기능

### expo-font

- 사용자 정의 폰트 사용 지원

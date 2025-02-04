export const Provider = [
  { key: 'Att', value: 'AT&T' },
  { key: 'Version', value: 'Version' },
  { key: 'TMobile', value: 'T-Mobile' },
]

export const Capacity = [
  {key: 'noLimit', value: '3Days No Limit'},
  {key: 'totalData', value: '3Days 10GB'},
  {key: 'perDay', value: '3Days / 2GB'},
 ]

 export const ValidDate = [
  { key: '1', value: 'One Day' },
  { key: '3', value: 'Three Days' },
  { key: '7', value: 'One Week' },
 ]

 import America from '@/assets/flags/美国.png'
 import Japan from '@/assets/flags/日本.png'
 import Korea from '@/assets/flags/韩国.png'

 export const mockData = [
  {
    country: "美国",
    flag: America,
    price: "10",
    capacity: "3GB",
    apn: "mobile",
    status: '1',
    name: "desim-03680-usa-esim-unlimited-3D"
  },
  {
    country: "日本",
    flag: Japan,
    price: "15",
    capacity: "5GB",
    apn: "Plus",
    status: '1',
    name: "desim-03680-japan-esim-unlimited-3D"
  },
  {
    country: "韩国",
    flag: Korea,
    price: "20",
    capacity: "10GB",
    apn: "mobile",
    status: '1',
    name: "desim-03680-korea-esim-unlimited-3D"
  },
  {
    country: "美国",
    flag: America,
    price: "12",
    capacity: "5GB",
    apn: "Plus",
    status: '2',
    name: "desim-03680-usa-esim-unlimited-5D"
  },
  {
    country: "日本",
    flag: Japan,
    price: "18",
    capacity: "10GB",
    apn: "mobile",
    status: '1',
    name: "desim-03680-japan-esim-unlimited-10D"
  }
];

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const VaccinationCoverage = props => {
  const {data} = props

  const DataFormatter = number => {
    if (number > 1000) {
      return `${number.toString()}k`
    }
    return number.toString()
  }

  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          bottom: 5,
          left: 5,
          right: 5,
        }}
      >
        <XAxis dataKey="vaccine_date" />
        <YAxis tickFormatter={DataFormatter} />
        <Legend />
        <Bar dataKey="dose1" name="Dose1" fill="#408CE5" barSize="8%" />
        <Bar dataKey="dose2" name="Dose2" fill="#FF4792" barSize="8%" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default VaccinationCoverage

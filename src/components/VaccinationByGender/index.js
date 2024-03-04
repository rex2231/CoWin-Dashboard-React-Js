import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

const VaccinationByGender = props => {
  const {data} = props

  return (
    <ResponsiveContainer width="100%" height={500}>
      <PieChart data={data} width={1000} height={300}>
        <Pie
          cx="50%"
          cy="60%"
          data={data}
          startAngle={0}
          endAngle={180}
          innerRadius="30%"
          outerRadius="60%"
          dataKey="count"
        >
          <Cell name="Male" fill="#408CE5" />
          <Cell name="Female" fill="#FF4792" />
          <Cell name="Others" fill="#00C5C3" />
        </Pie>
        <Legend iconType="circle" layout="horizontal" align="center" />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default VaccinationByGender

import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

const VaccinationByAge = props => {
  const {data} = props

  return (
    <ResponsiveContainer width="100%" height={500}>
      <PieChart data={data} width={400} height={400}>
        <Pie
          cx="50%"
          cy="50%"
          data={data}
          startAngle={0}
          endAngle={360}
          innerRadius="0%"
          outerRadius="80%"
          dataKey="count"
        >
          <Cell name="18-44" fill="#408CE5" />
          <Cell name="45-60" fill="#FF4792" />
          <Cell name="Above 60" fill="#00C5C3" />
        </Pie>
        <Legend iconType="circle" layout="horizontal" align="center" />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default VaccinationByAge

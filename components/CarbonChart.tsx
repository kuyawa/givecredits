interface ChartType {
  title?: string
  value: number
}

// https://stackoverflow.com/questions/50960084/how-to-extend-cssproperties-in-react-project
//const style: { [key: string]: React.CSSProperties } = {
const style = {
  label: {
    color: '#fff',
    textAlign: 'center'
  },
  value: {
    fontWeight: '400',
    fontSize: '1'
  },
  chart: {
    display: 'grid',
    gridTemplateColumns: 'repeat(10, 1fr)',
    gridTemplateRows: 'repeat(5, 1fr)',
    gridColumnGap: '0px',
    gridRowGap: '0px',
    width: '500px',
    margin: '0 auto'
  },
  ton: {
    boxSizing: 'border-box',
    display: 'inline-block',
    width: '40px',
    height: '20px',
    margin: '2px',
    border: '1px solid #666',
    borderRadius: '6px',
  },
  off: {
    boxSizing: 'border-box',
    display: 'inline-block',
    width: '40px',
    height: '20px',
    margin: '2px',
    border: '1px solid #666',
    borderRadius: '6px',
    backgroundColor: 'green'
  },
  p10: { background: 'linear-gradient(to right, green 0%, green 10%, transparent 10%, transparent 100%)' },
  p20: { background: 'linear-gradient(to right, green 0%, green 20%, transparent 20%, transparent 100%)' },
  p30: { background: 'linear-gradient(to right, green 0%, green 30%, transparent 30%, transparent 100%)' },
  p40: { background: 'linear-gradient(to right, green 0%, green 40%, transparent 40%, transparent 100%)' },
  p50: { background: 'linear-gradient(to right, green 0%, green 50%, transparent 50%, transparent 100%)' },
  p60: { background: 'linear-gradient(to right, green 0%, green 60%, transparent 60%, transparent 100%)' },
  p70: { background: 'linear-gradient(to right, green 0%, green 70%, transparent 70%, transparent 100%)' },
  p80: { background: 'linear-gradient(to right, green 0%, green 80%, transparent 80%, transparent 100%)' },
  p90: { background: 'linear-gradient(to right, green 0%, green 90%, transparent 90%, transparent 100%)' }
} as const

const CarbonChart = ({
  title,
  value
}: ChartType) => {
  const pct = {
    10: { ...style.ton, ...style.p10 },
    20: { ...style.ton, ...style.p20 },
    30: { ...style.ton, ...style.p30 },
    40: { ...style.ton, ...style.p40 },
    50: { ...style.ton, ...style.p50 },
    60: { ...style.ton, ...style.p60 },
    70: { ...style.ton, ...style.p70 },
    80: { ...style.ton, ...style.p80 },
    90: { ...style.ton, ...style.p90 }
  }
  const num = value
  const int = Math.trunc(num)
  const mod = num % 1
  const fix = mod.toFixed(1)
  const dec = Number(fix) * 100
  const prt = pct[dec]
  const rst = 99 - int
  const offs = Array(int).fill(0)
  const tons = Array(rst).fill(0)
  //console.log('Tons', num, mod, dec, rst)
  //console.log('Arrs', offs.length, tons.length)
  return (
    <>
      <div style={style.label}>{title} <span>{value}</span> tons</div>
      <div style={style.chart}>
        {offs.map(() => { return (<div style={style.off} key={Math.random()}></div>) } )}
        {dec>0 ? (<div style={prt}></div>) : <></> }
        {tons.map(() => { return (<div style={style.ton} key={Math.random()}></div>) } )}
      </div>
    </>
  );
};

export default CarbonChart

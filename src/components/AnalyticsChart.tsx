import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { useMediaQuery } from 'react-responsive';

interface ChartData {
    name: string;
    value: number;
    color: string;
}

interface Props {
    value: number;
}

const AnalyticsChart: React.FC<Props> = (props) => {

    const { value } = props;

    const isXl = useMediaQuery({ query: '(min-width: 1920px)' });
    const isLg = useMediaQuery({ query: '(min-width: 1280px) and (max-width: 1919px)' });
    const isMd = useMediaQuery({ query: '(min-width: 960px) and (max-width: 1279px)' });
    const isSm = useMediaQuery({ query: '(min-width: 600px) and (max-width: 959px)' });
    const isXs = useMediaQuery({ query: '(min-width: 320px) and (max-width: 599px)' });

    const cx = isXl ? 175 : isLg ? 107 : isMd ? 88 : isSm ? 107 : isXs ? 110 : 115;
    const cy = isXl ? 110 : isLg ? 105 : isMd ? 95 : isSm ? 105 : isXs ? 105 : 120;

    const chartHeight = isXl ? 130 : isLg ? 120 : isMd ? 110 : isSm ? 120 : isXs ? 120 : 150;
    const chartWidth = isXl ? 357 : isLg ? 226 : isMd ? 186 : isSm ? 225 : isXs ? 232 : 150;

    const innerRadius = (isXl || isLg || isSm || isXs) ? 50 : (isMd) ? 45 : 50;
    const outerRadius = (isXl || isLg || isSm || isXs) ? 100 : (isMd) ? 90 : 100;

    const data: ChartData[] = [
        { name: 'A', value: 45, color: '#00FFFF' },
        { name: 'B', value: 45, color: '#FF0000' },
        { name: 'C', value: 10, color: '#FFD700' },
    ];

    const RADIAN = Math.PI / 180;

    const renderNeedle = (value: number, data: ChartData[], cx: number, cy: number, iR: number, oR: number, color: string | undefined) => {
        let total = 0;
        data.forEach((v: { value: number; }) => {
            total += v.value;
        });
        const ang = 180.0 * (1 - value / total);
        const length = (iR + 2 * oR) / 3;
        const sin = Math.sin(-RADIAN * ang);
        const cos = Math.cos(-RADIAN * ang);
        const r = 5;
        const x0 = cx + 5;
        const y0 = cy + 5;
        const xba = x0 + r * sin;
        const yba = y0 - r * cos;
        const xbb = x0 - r * sin;
        const ybb = y0 + r * cos;
        const xp = x0 + length * cos;
        const yp = y0 + length * sin;

        return [
            <circle key="circle" cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
            <path key="path" d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} />,
        ];
    };

    return (
        <PieChart height={chartHeight} width={chartWidth} >
            <Pie
                dataKey="value"
                startAngle={180}
                endAngle={0}
                data={data}
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                fill="#8884d8"
                stroke="none"
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
            </Pie>
            {renderNeedle(value, data, cx, cy, innerRadius, outerRadius, '#d0d000')}
        </PieChart>
    );
};

export default AnalyticsChart;
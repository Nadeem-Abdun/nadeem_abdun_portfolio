import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { useBreakpoints } from "../../utils/Breakpoints";
import randomColorGenerator from "../../utils/RandomColorGenerator";

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

    const { isXl, isLg, isMd, isSm, isXs } = useBreakpoints();

    const cx = isXl ? 175 : isLg ? 107 : isMd ? 88 : isSm ? 107 : isXs ? 110 : 115;
    const cy = isXl ? 110 : isLg ? 105 : isMd ? 95 : isSm ? 105 : isXs ? 105 : 120;

    const chartHeight = isXl ? 130 : isLg ? 120 : isMd ? 110 : isSm ? 120 : isXs ? 120 : 150;
    const chartWidth = isXl ? 357 : isLg ? 226 : isMd ? 186 : isSm ? 225 : isXs ? 232 : 150;

    const innerRadius = (isXl || isLg || isSm || isXs) ? 50 : (isMd) ? 45 : 50;
    const outerRadius = (isXl || isLg || isSm || isXs) ? 100 : (isMd) ? 90 : 100;

    const data: ChartData[] = [
        { name: 'A', value: 34, color: randomColorGenerator() },
        { name: 'B', value: 33, color: randomColorGenerator() },
        { name: 'C', value: 33, color: randomColorGenerator() },
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
            {renderNeedle(value, data, cx, cy, innerRadius, outerRadius, randomColorGenerator())}
        </PieChart>
    );
};

export default AnalyticsChart;

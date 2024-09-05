/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect, useRef, useState} from 'react';
import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Legend,
	Line,
	LineChart,
	Pie,
	PieChart,
	PolarAngleAxis,
	PolarGrid,
	PolarRadiusAxis,
	Radar,
	RadarChart,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

export enum ChartsEnum {
	None,
	AreaChart,
	BarChart,
	LineChart,
	PieChart,
	RadarChart,
}

export type ChartOptions = {
	dataKey?: string;
	fillColor?: string;
	innerRadius?: number;
	outerRadius?: number;
	label?: string;
};

export type ChartProps = {
	type?: ChartsEnum;
	axisLabel?: string;
	height?: number;
	data?: any;
	dataOptions?: ChartOptions[];
	singleOption?: ChartOptions;
	dataRef?: any;
	propRef?: any;
	useOriginData?: boolean;
	datasetProp?: string;
	valueProp?: string;
};

const Charts = ({
	type,
	data,
	dataOptions,
	axisLabel = '',
	height = 250,
	useOriginData = true,
	datasetProp,
	valueProp,
	singleOption,
}: ChartProps) => {
	const [parentWidth, setParentWidth] = useState(0);
	const [chartData, setChartData] = useState<any[]>([]);
	const ref = useRef<any>(null);

	useEffect(() => {
		if (useOriginData) setChartData(data ?? []);
		else {
			let dataset: any[] = [];

			if (type === ChartsEnum.PieChart) {
				dataOptions?.forEach(item => {
					dataset.push({
						name: item.dataKey,
						value: data[item.dataKey ?? ''],
						color: item.fillColor,
						label: item.label,
					});
				});
			} else {
				data?.forEach((item: any) => {
					if (dataset.find(x => x[axisLabel] == item[axisLabel])) {
						dataset = [...dataset].map(x => {
							if (
								x[axisLabel] == item[axisLabel] &&
								!Object.keys(x).includes(item[datasetProp ?? ''])
							) {
								x[item[datasetProp ?? '']] = item[valueProp ?? ''];
							}
							return x;
						});
					} else {
						dataset.push({
							[axisLabel]: item[axisLabel],
							[item[datasetProp ?? '']]: item[valueProp ?? ''],
						});
					}
				});
			}

			setChartData(dataset);
		}
	}, [data]);

	const observer = new ResizeObserver(() => {
		if (ref && ref.current) {
			setParentWidth(ref.current.parentElement.parentElement.offsetWidth);
		}
	});
	observer.observe(document.documentElement);

	const transform = () => {
		if (type === ChartsEnum.AreaChart) {
			return (
				<AreaChart
					width={parentWidth}
					height={height}
					data={chartData}
					margin={{top: 10, right: 30, left: 0, bottom: 0}}>
					<defs>
						{dataOptions?.map((item, index) => (
							<linearGradient
								id={`color${index}`}
								x1="0"
								y1="0"
								x2="0"
								y2="1"
								key={index}>
								<stop offset="5%" stopColor={item.fillColor} stopOpacity={0.8} />
								<stop offset="95%" stopColor={item.fillColor} stopOpacity={0} />
							</linearGradient>
						))}
					</defs>
					<XAxis dataKey={axisLabel} />
					<YAxis />
					<CartesianGrid strokeDasharray="3 3" />
					<Tooltip />
					{dataOptions?.map((item, index) => (
						<Area
							key={index}
							type="monotone"
							dataKey={item?.dataKey ?? ''}
							stroke={item.fillColor}
							fillOpacity={1}
							fill={`url(#color${index})`}
						/>
					))}
				</AreaChart>
			);
		}

		if (type === ChartsEnum.BarChart) {
			return (
				<BarChart width={parentWidth} height={height} data={chartData}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey={axisLabel} />
					<YAxis />
					<Tooltip />
					<Legend />
					{dataOptions?.map((item, index) => (
						<Bar dataKey={item?.dataKey ?? ''} fill={item.fillColor} key={index} />
					))}
				</BarChart>
			);
		}

		if (type === ChartsEnum.LineChart) {
			return (
				<LineChart
					width={parentWidth}
					height={height}
					data={chartData}
					margin={{top: 5, right: 30, left: 20, bottom: 5}}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey={axisLabel} />
					<YAxis />
					<Tooltip />
					<Legend />
					{dataOptions?.map((item, index) => (
						<Line
							type="monotone"
							dataKey={item.dataKey}
							stroke={item.fillColor}
							key={index}
						/>
					))}
				</LineChart>
			);
		}

		if (type === ChartsEnum.PieChart) {
			return (
				<PieChart width={parentWidth} height={height}>
					<Legend
						verticalAlign="top"
						align="right"
						wrapperStyle={{fontSize: '11px'}}
						payload={chartData?.map(x => {
							return {
								id: x.name,
								type: 'square',
								value: x.label,
								color: x.color,
							};
						})}
						layout="vertical"
					/>
					<Pie
						data={chartData}
						dataKey="value"
						nameKey="name"
						cx="50%"
						cy="50%"
						innerRadius={singleOption?.innerRadius ?? 0}
						outerRadius={singleOption?.outerRadius ?? 50}
						fill={singleOption?.fillColor}
						label>
						{chartData.map((item: any, index: number) => (
							<Cell fill={item.color ?? '#000'} key={index} />
						))}
					</Pie>
				</PieChart>
			);
		}

		if (type === ChartsEnum.RadarChart) {
			return (
				<RadarChart outerRadius={90} width={parentWidth} height={height} data={chartData}>
					<PolarGrid />
					<PolarAngleAxis dataKey={axisLabel} />
					<PolarRadiusAxis angle={30} domain={[0, 150]} />
					{dataOptions?.map((item, index) => (
						<Radar
							key={index}
							dataKey={item?.dataKey ?? ''}
							stroke={item.fillColor}
							fill={item.fillColor}
							fillOpacity={0.6}
						/>
					))}
					<Legend />
				</RadarChart>
			);
		}
	};

	return <div ref={ref}>{transform()}</div>;
};

export default Charts;

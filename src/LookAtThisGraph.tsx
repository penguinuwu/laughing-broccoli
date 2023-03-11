import { useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Scores } from "types";

function LookAtThisGraph(props: { scores: Scores; videoLength: number }) {
	const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

	return (
		<HighchartsReact
			highcharts={Highcharts}
			options={{
				title: { text: "clicks" },
				subtitle: { text: "gaming" },
				xAxis: {
					type: "datetime",
					max: Math.ceil(props.videoLength),
					min: 0,
					labels: {
						format: "{value:%M:%S.%L}"
					}
				},
				yAxis: {
					type: "number"
				},
				plotOptions: {
					series: {
						cumulative: true,
						pointStart: 0
					}
				},
				series: [
					{
						type: "line",
						data: Object.entries(props.scores).map(([seconds, clicks]) => [
							parseFloat(seconds),
							clicks
						])
					}
				]
			}}
			ref={chartComponentRef}
		/>
	);
}

export default LookAtThisGraph;

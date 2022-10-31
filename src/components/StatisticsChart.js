import {
    Chart,
    Series,
    ArgumentAxis,
    CommonSeriesSettings,
    Export,
    Legend,
    Margin,
    Title,
    Subtitle,
    Tooltip,
    Grid,
    Point
} from 'devextreme-react/chart';

function StatisticsChart(props) {

    return (
        <Chart
            palette="Violet"
            dataSource={props.data}
        >
            <Series
                key={"ParkedAverage"}
                valueField={"parkedAverage"}
                name={"ParkedAverage"}
                color={"red"} />
            <Series
                key={"BookedAverage"}
                valueField={"bookedAverage"}
                name={"BookedAverage"}
                color={"blue"} />

            <Series
                key={"BookedMedian"}
                valueField={"bookedMedian"}
                name={"BookedMedian"}
                color={"black"} />
            <Series
                key={"ParkedMedian"}
                valueField={"parkedMedian"}
                name={"ParkedMedian"}
                color={"yellow"} />

            <Series
                key={"BookedStdDev"}
                valueField={"bookedStdDev"}
                name={"BookedStdDev"}
                color={"green"} />

            <Series
                key={"ParkedStdDev"}
                valueField={"parkedStdDev"}
                name={"ParkedStdDev"}
                color={"pink"} />

            <Series
                key={"ParkedPercentile"}
                valueField={"parkedPercentile"}
                name={"ParkedPercentile"}
                color={"brown"} />

            <Series
                key={"BookedPercentile"}
                valueField={"bookedPercentile"}
                name={"BookedPercentile"}
                color={"orange"} />


            <CommonSeriesSettings
                argumentField={props.argName}

                type={"line"}
            >
                                <Point visible={false} />

</CommonSeriesSettings>
            <Margin bottom={20} />
            <ArgumentAxis

                valueMarginsEnabled={false}
                discreteAxisDivisionMode="crossLabels"
            >
                <Grid visible={true} />
            </ArgumentAxis>
            <Legend
                verticalAlignment="bottom"
                horizontalAlignment="center"
                itemTextPosition="bottom"
            />
            <Export enabled={true} />
            <Title text={props.title}>
                <Subtitle text={props.subtitle} />
            </Title>
            <Tooltip enabled={true} />
        </Chart>
    )
}

export default StatisticsChart;

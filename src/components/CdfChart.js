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
    ValueAxis
} from 'devextreme-react/chart';

function CdfChart(props) {

    return (
        <Chart
            palette="Violet"
            dataSource={props.data}
        >


 <Series
                key={"cdf"}
                valueField={"cdf"}
                name={"cdf"}
                color={"red"} />




            <CommonSeriesSettings
                argumentField={"duration"}
                type={"spline"}
            />

            <ValueAxis
                name="frequency"
                position="left"
            />

            <Margin bottom={20} />
            <ArgumentAxis
                type={"logarithmic"}
                valueMarginsEnabled={true}
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

export default CdfChart;

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
    Point,
    Tooltip,
    Grid,
} from 'devextreme-react/chart';

function DataChart(props) {

    return (
        <Chart
            palette="Violet"
            dataSource={props.data}
        >
            <Series
                key={"ParkedCount"}
                valueField={"parkedCount"}
                name={"Parked Count"}
                color={"red"} />
            <Series
                key={"BookingCount"}
                valueField={"bookingCount"}
                name={"Booking Count"}
                color={"blue"} />


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

export default DataChart;

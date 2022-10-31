import React, { useEffect, useRef, useState, useCallback } from "react";
import 'devextreme/dist/css/dx.light.css';
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
} from 'devextreme-react/chart';
import { LoadPanel } from 'devextreme-react/load-panel';

import notify from 'devextreme/ui/notify';
import axios from 'axios';
import DataChart from "../components/DataChart";
import DashboardHeatMap from "../components/DashboardHeatMap";
import StatisticsChart from "../components/StatisticsChart";
import CdfChart from "../components/CdfChart";

const getURL = "http://gearsamrtmobility.saawrah.com/api/Dashboard"
//const getURL = "https://localhost:7291/api/Dashboard"

const Dashboard = () => {
    const [initData, setInitData] = useState();
    const [loadPanelVisible, setLoadPanelVisible] = useState(false);



    useEffect(() => {
        async function fetchMyAPI() {
            try {
                setLoadPanelVisible(true)
                await getInitData()
                setLoadPanelVisible(false)

            } catch {
                setLoadPanelVisible(false)
            }

        }
        fetchMyAPI();
    }, []);


    async function getInitData() {
        try {
            let hed = {
                "Content-Type": "application/json"
            }

            const response = await axios.get(getURL, {
                headers: hed
            });
            const res = await response;
            if (res.status === 200) {
                setInitData(res.data)
            }
        }
        catch (ex) {
            notify(getURL + " : " + ex, "error", 2500);
            throw ex;
        }
    }


    return (
        <div >
            <div>
                <LoadPanel
                    shadingColor="rgba(0,0,0,0.4)"
                    //position={position}
                    //  onHiding={this.hideLoadPanel}
                    visible={loadPanelVisible}
                    showIndicator={true}
                    shading={true}
                    showPane={true}
                />

                <div>
                    {(initData && initData.carsChartDataPerDateAllCity) &&
                        <DataChart
                            data={initData.carsChartDataPerDateAllCity}
                            argName="dateTime"
                            title="All Cities"
                            subtitle="Number of Booked/Parked Cars per Date"
                        />
                    }

                    {(initData && initData.carsChartDataPerDateAllCityFiltered) &&

                        <DataChart
                            data={initData.carsChartDataPerDateAllCityFiltered}
                            argName="dateTime"
                            title="All Cities"
                            subtitle="Number of Filtered Booked/Parked Cars per Date"
                        />
                    }
              

                    {(initData && initData.carsChartDataPerDateFirenze) &&
                        <DataChart
                            data={initData.carsChartDataPerDateFirenze}
                            argName="dateTime"
                            title="Firenze"
                            subtitle="Number of Booked/Parked Cars per Date"
                        />
                    }

                    {(initData && initData.carsChartDataPerDateFirenzeFiltered) &&

                        <DataChart
                            data={initData.carsChartDataPerDateFirenzeFiltered}
                            argName="dateTime"
                            title="Firenze"
                            subtitle="Number of Filtered Booked/Parked Cars per Date"
                        />
                    }
                    {(initData && initData.statisticChartDataPerDateFirenzeFiltered) &&

                        <StatisticsChart
                            data={initData.statisticChartDataPerDateFirenzeFiltered}
                            argName="dateTime"
                            title="Firenze Statistics"
                            subtitle="Number of Filtered Booked/Parked Cars per Date"
                        />
                    }

                    {(initData && initData.carsChartDataPerDateToronto) &&
                        <DataChart
                            data={initData.carsChartDataPerDateToronto}
                            argName="dateTime"
                            title="Toronto"
                            subtitle="Number of Booked/Parked Cars per Date"
                        />
                    }

                    {(initData && initData.carsChartDataPerDateTorontoFiltered) &&
                        <DataChart
                            data={initData.carsChartDataPerDateTorontoFiltered}
                            argName="dateTime"
                            title="Toronto"
                            subtitle="Number of Filtered Booked/Parked Cars per Date"
                        />
                    }

                    {(initData && initData.statisticChartDataPerDateTorontoFiltered) &&

                        <StatisticsChart
                            data={initData.statisticChartDataPerDateTorontoFiltered}
                            argName="dateTime"
                            title="Toronto Statistics"
                            subtitle="Number of Filtered Booked/Parked Cars per Date"
                        />
                    }

                    {(initData && initData.carsChartDataPerDateBerlin) &&
                        <DataChart
                            data={initData.carsChartDataPerDateBerlin}
                            argName="dateTime"
                            title="Berlin"
                            subtitle="Number of Booked/Parked Cars per Date"
                        />
                    }

                    {(initData && initData.carsChartDataPerDateBerlinFiltered) &&
                        <DataChart
                            data={initData.carsChartDataPerDateBerlinFiltered}
                            argName="dateTime"
                            title="Berlin"
                            subtitle="Number of Filtered Booked/Parked Cars per Date"
                        />
                    }

                
                    {(initData && initData.carsChartDataPerHourAllCity) &&
                        <DataChart
                            data={initData.carsChartDataPerHourAllCity}
                            argName="hour"
                            title="All Cities"
                            subtitle="Number of Booked/Parked Cars per Hour"
                        />
                    }

                    {(initData && initData.carsChartDataPerHourAllCityFiltered) &&
                        <DataChart
                            data={initData.carsChartDataPerHourAllCityFiltered}
                            argName="hour"
                            title="All Cities"
                            subtitle="Number of Filtered Booked/Parked Cars per Hour"
                        />
                    }


                    {(initData && initData.carsChartDataPerHourFirenze) &&
                        <DataChart
                            data={initData.carsChartDataPerHourFirenze}
                            argName="hour"
                            title="Firenze"
                            subtitle="Number of Booked/Parked Cars per Hour"
                        />
                    }

                    {(initData && initData.carsChartDataPerHourFirenzeFiltered) &&
                        <DataChart
                            data={initData.carsChartDataPerHourFirenzeFiltered}
                            argName="hour"
                            title="Firenze"
                            subtitle="Number of Filtered Booked/Parked Cars per Hour"
                        />
                    }

                    {(initData && initData.carsChartDataPerHourToronto) &&
                        <DataChart
                            data={initData.carsChartDataPerHourToronto}
                            argName="hour"
                            title="Toronto"
                            subtitle="Number of Booked/Parked Cars per Hour"
                        />
                    }
                    {(initData && initData.carsChartDataPerHourTorontoFiltered) &&
                        <DataChart
                            data={initData.carsChartDataPerHourTorontoFiltered}
                            argName="hour"
                            title="Toronto"
                            subtitle="Number of Filtered Booked/Parked Cars per Hour"
                        />
                    }
                    {(initData && initData.carsChartDataPerHourBerlin) &&
                        <DataChart
                            data={initData.carsChartDataPerHourBerlin}
                            argName="hour"
                            title="Berlin"
                            subtitle="Number of Booked/Parked Cars per Hour"
                        />
                    }
                    {(initData && initData.carsChartDataPerHourBerlinFiltered) &&
                        <DataChart
                            data={initData.carsChartDataPerHourBerlinFiltered}
                            argName="hour"
                            title="Berlin"
                            subtitle="Number of Filtered Booked/Parked Cars per Hour"
                        />
                    }
                </div>

            </div>
        </div>
    );

}

export default Dashboard;

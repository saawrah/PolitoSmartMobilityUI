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

import notify from 'devextreme/ui/notify';
import axios from 'axios';
import DataChart from "../components/DataChart";
import DashboardHeatMap from "../components/DashboardHeatMap";
import StatisticsChart from "../components/StatisticsChart";
import CdfChart from "../components/CdfChart";
import { LoadPanel } from 'devextreme-react/load-panel';

const getURL = "http://gearsamrtmobility.saawrah.com/api/Dashboard"

const Statistics = () => {
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


                    {(initData && initData.statisticChartDataPerDateAllCityFiltered) &&

                        <StatisticsChart
                            data={initData.statisticChartDataPerDateAllCityFiltered}
                            argName="dateTime"
                            title="All Cities Statistics"
                            subtitle="Filtered"
                        />
                    }

                    {(initData && initData.statisticChartDataPerDateFirenzeFiltered) &&

                        <StatisticsChart
                            data={initData.statisticChartDataPerDateFirenzeFiltered}
                            argName="dateTime"
                            title="Firenze Statistics"
                            subtitle="Filtered"
                        />
                    }


                    {(initData && initData.statisticChartDataPerDateTorontoFiltered) &&

                        <StatisticsChart
                            data={initData.statisticChartDataPerDateTorontoFiltered}
                            argName="dateTime"
                            title="Toronto Statistics"
                            subtitle="Filtered"
                        />
                    }



                    {(initData && initData.statisticChartDataPerDateBerlinFiltered) &&

                        <StatisticsChart
                            data={initData.statisticChartDataPerDateBerlinFiltered}
                            argName="dateTime"
                            title="Berlin Statistics"
                            subtitle="Filtered"
                        />
                    }

                </div>

            </div>
        </div>
    );

}

export default Statistics;

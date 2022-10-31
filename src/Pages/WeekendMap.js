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

const WeekendMap = () => {
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

                {(initData && initData.weekendHeatMapDatas) &&
                    <DashboardHeatMap
                        initData={initData.weekendHeatMapDatas}
                        //    loadHeatMap={true}
                        loadPoint={true}
                    />
                }




            </div>

        </div>
    );

}

export default WeekendMap;

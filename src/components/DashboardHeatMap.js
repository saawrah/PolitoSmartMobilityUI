import React, { useRef, useEffect, useState } from "react";
import { loadModules } from "esri-loader";

// hooks allow us to create a map component as a function
export default function DashboardHeatMap({ initData, loadPoint, loadHeatMap }) {
    // create a ref to element to be used as the map's container
    const mapEl = useRef(null);
    const [lang, setLang] = useState("english");
    const [dataIsSelected, setDataIsSelected] = useState(false);
    const [selectedCollisions, setSelectedCollisions] = useState([]);

    //  console.log(ae)
    // use a side effect to create the map after react has rendered the DOM
    useEffect(
        () => {
            // define the view here so it can be referenced in the clean up function
            let map,
                view,
                layerList,
                intersectionsLayer,
                midBlocksLayer,
                heatmaplayer,
                heatmaplayerView,
                csvLayerView,
                csvLayerViewMidBlock,
                polygonGraphicsLayer,
                sketchViewModel,
                grid;
            //const infoDiv = document.getElementById("info");
            // the following code is based on this sample:
            // https://developers.arcgis.com/javascript/latest/sample-code/webmap-basic/index.html
            // first lazy-load the esri classes
            loadModules([
                "esri/views/MapView",
                "esri/Graphic",
                "esri/widgets/Legend",
                "esri/widgets/Expand",
                // "esri/widgets/Legend",
                "esri/Map",
                "esri/layers/FeatureLayer",
                "esri/widgets/LayerList",
                "esri/widgets/Print",
            ], {
                css: true
            }).then(([
                MapView,
                Graphic,
                Legend,
                Expand,
                Map,
                FeatureLayer,
                Print,
                LayerList,
            ]) => {

                setupTheView();


                function fadeVisibilityOn(layer) {
                    let animating = true;
                    let opacity = 0;
                    // fade layer's opacity from 0 to
                    // whichever value the user has configured
                    const finalOpacity = layer.opacity;
                    layer.opacity = opacity;

                    view.whenLayerView(layer).then((layerView) => {
                        function incrementOpacityByFrame() {
                            if (opacity >= finalOpacity && animating) {
                                animating = false;
                                return;
                            }

                            layer.opacity = opacity;
                            opacity += 0.05;

                            requestAnimationFrame(incrementOpacityByFrame);
                        }

                        // // Wait for tiles to finish loading before beginning the fade
                        // watchUtils.whenFalseOnce(
                        //     layerView,
                        //     "updating",
                        //     function (updating) {
                        //         requestAnimationFrame(incrementOpacityByFrame);
                        //     }
                        // );
                    });
                }


                /******************************************************
                 * Sets up the view. WebMap with winkel III projection
                 * basemap and hurricanes CsvLayer is added to the view.
                 ******************************************************/
                function setupTheView() {



                    var graphics = initData.map(function (place) {
                        return new Graphic({
                            attributes: {
                                //ObjectId: place.properties.accNo,
                            },
                            geometry: {
                                longitude: place.longitude,
                                latitude: place.latitude,
                                type: "point"
                            }
                        });
                    });


                    var heatMapLayer = new FeatureLayer({
                        source: graphics,
                        title: "Heat Map",

                        renderer: {
                            type: "heatmap",
                            colorStops: [
                                { color: "rgba(63, 40, 102, 0)", ratio: 0 },
                                { color: "#472b77", ratio: 0.083 },
                                { color: "#4e2d87", ratio: 0.166 },
                                { color: "#563098", ratio: 0.249 },
                                { color: "#5d32a8", ratio: 0.332 },
                                { color: "#6735be", ratio: 0.415 },
                                { color: "#7139d4", ratio: 0.498 },
                                { color: "#7b3ce9", ratio: 0.581 },
                                { color: "#853fff", ratio: 0.664 },
                                { color: "#a46fbf", ratio: 0.747 },
                                { color: "#c29f80", ratio: 0.83 },
                                { color: "#e0cf40", ratio: 0.913 },
                                { color: "#ffff00", ratio: 1 }
                            ],
                            maxPixelIntensity: 200,
                            minPixelIntensity: 0
                        },

                        objectIdField: "ObjectID",           // This must be defined when creating a layer from `Graphic` objects
                        fields: [
                            {
                                name: "ObjectID",
                                alias: "ObjectID",
                                type: "oid"
                            },
                            {
                                name: "address",
                                alias: "address",
                                type: "string"
                            }
                        ]
                    });
                    var map = new Map();
                    if (loadHeatMap) {
                        map = new Map({
                            basemap: "gray-vector",
                            layers: [
                                heatMapLayer
                            ]
                        });
                    } else {
                        map = new Map({
                            basemap: "gray-vector",
                            layers: [
                                //loadHeatMap ? heatMapLayer : []
                            ]
                        });
                    }




                    view = new MapView({
                        container: "viewDiv",
                        map: map,
                        zoom: 11,
                        center: [11.2558, 43.7696],
                        // padding: {
                        //     bottom: infoDiv.clientHeight // Same value as the #infoDiv height in CSS
                        // }
                    });
                    view.popup.dockEnabled = true;

                    const legendExpand = new Expand({
                        view: view,
                        content: new Legend({
                            view: view
                            // style: "card"
                        })
                    });
                    view.ui.add(legendExpand, "top-left");

                    if (loadPoint) {
                        initData.forEach(loc => {
                            if (loc.latitude != 0.0 && loc.longitude != 0.0) {
                                createGraphic(loc.latitude, loc.longitude, loc.collisionId);
                            }
                        });
                    }
                }

                function createGraphic(lat, long, id) {
                    // First create a point geometry 
                    var point = {
                        type: "point", // autocasts as new Point()
                        longitude: long,
                        latitude: lat
                    };

                    // Create a symbol for drawing the point
                    var markerSymbol = {
                        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
                        color: '#12492f',
                        size: 8
                    };

                    var att = {
                        collisionId: id,
                    };

                    // Create a graphic and add the geometry and symbol to it
                    var pointGraphic = new Graphic({
                        geometry: point,
                        symbol: markerSymbol,
                        attributes: att,
                    });

                    // Add the graphics to the view's graphics layer
                    view.graphics.add(pointGraphic);
                }
            });
            return () => {
                // // clean up the map view
                // if (!!view) {
                //     view.destroy();
                //     view = null;
                // }
            };




        },
        // only re-load the map if the id has changed
        [lang, initData]
    );



    return (
        <div>

            <div id="viewDiv" style={{
                padding: 0,
                margin: 0,
                height: '600px',
                width: '100%',
                overflow: 'hidden'
            }}>


            </div>
        </div>
    );
}
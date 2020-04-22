import React, { useState, useEffect, useRef } from "react";
import mnPrecincts from "./data/mn-precincts";
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';

function Precincts(props) {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;
    const mapContainer = useRef(null);
    const [long, setLong] = useState(-94.503809);
    const [lat, setLat] = useState(46.443226);
    const [zoom, setZoom] = useState(5.5);
    const [hoveredPrecinct, _setHoveredPrecinct] = useState(null);
    const hoveredPrecinctRef = useRef(hoveredPrecinct);
    
    
    const setHoveredPrecinct = data =>{
        hoveredPrecinctRef.current = data;
        _setHoveredPrecinct(data);
    };

    useEffect(() => {

        let map = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/light-v10",
            center: [long, lat],
            zoom: zoom
        });

        map.once("load", function() {
            
            map.addSource('precinct-source', {
                'type': 'geojson',
                'data': mnPrecincts,
                'generateId': true
            });

            map.addLayer({
                'id': 'precinct-layer',
                'type': 'fill',
                'source': 'precinct-source',
                'layout': {},
                'paint': {
                    'fill-color': '#627BC1',
                    'fill-opacity': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                        .8,
                        0.5
                    ]
                }
            });

            map.on('mousemove', 'precinct-layer', function (e) {

                if (e.features.length > 0) {
                    if (hoveredPrecinctRef.current) {
                        map.setFeatureState(
                            { source: 'precinct-source', id: hoveredPrecinctRef.current },
                            { hover: false }
                        );
                    }

                    let _hoveredPrecinct = e.features[0].id;
                   
                    map.setFeatureState(
                        { source: 'precinct-source', id: _hoveredPrecinct },
                        { hover: true }
                    );

                    setHoveredPrecinct(_hoveredPrecinct);
                }
                
            });

            // When the mouse leaves the state-fill layer, update the feature state of the
            // previously hovered feature.
            map.on('mouseleave', 'precinct-layer', function () {
                if (hoveredPrecinctRef.current) {
                    map.setFeatureState(
                        { source: 'precinct-source', id: hoveredPrecinctRef.current },
                        { hover: false }
                    );
                }
                setHoveredPrecinct(null);
            });
        });

    }, []);

    return (
        <div className="precinct-map-wrapper">
            <div id="precinctDetailMap" className="precinct-map">
                <div style={{ height: "100%" }} ref={mapContainer}>

                </div>
            </div>
        </div>
    );
}

export default Precincts;
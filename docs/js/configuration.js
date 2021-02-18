// mapbox access token configuration
mapboxgl.accessToken = 'pk.eyJ1IjoiYmJsLW1hcmNvbSIsImEiOiJjazk0NmNwMDgwMjB2M2ZvYnF0NHprNTR2In0.JXW9ymtw_RtHULCODPb7rQ';
var map = new mapboxgl.Map({
	container: 'map', // container id
	style: 'mapbox://styles/bbl-marcom/ck946gnid0ove1ip2iu54j1kj', // stylesheet location
	center: [2.3513582028069493, 48.85853712681944], // paris starting position [lng, lat]
	zoom: 4.8, // starting zoom
	attributionControl: true
});

// code à intégrer ci-dessous pour la création des clusters
map.on('load', function () {
	map.addSource('localisations', {
		'type': 'geojson',
		'data': 'https://visualizemap.github.io/bbl/bbl.geojson', //lien à changer quand fichier geojson sera hébergé dans votre serveur 
		'cluster': true,
		'clusterMaxZoom': 16, // Max zoom to cluster points on
		'clusterRadius': 50 // Radius of each cluster when clustering points (defaults to 50)
	});

	map.addLayer({
		'id': 'clusters',
		'type': 'circle',
		'source': 'localisations',
		'filter': ['has', 'point_count'],
		'paint': {
			'circle-color': '#00ff66',
			'circle-blur': 0.1,
			'circle-stroke-width': 0,
			'circle-opacity': ["interpolate", ["linear"], ["zoom"], 11.0, 0.7, 11.2, 0.0],
			'circle-stroke-opacity': ["interpolate", ["linear"], ["zoom"], 11.0, 0.7, 11.2, 0.0],
			'circle-stroke-color': '#000000',
			'circle-radius': 28
		}
	}, 'Groupe BBL Own footprint');

	map.addLayer({
		'id': 'cluster-count',
		'type': 'symbol',
		'source': 'localisations',
		'filter': ['has', 'point_count'],
		'paint': {
			'text-halo-width': 0.8,
			'text-halo-color': '#fff'
		},
		'layout': {
			'text-field': '{point_count_abbreviated}',
			'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
			'text-size': 14,
		}
	}, 'Groupe BBL Own footprint');

	map.addLayer({
		'id': 'unclustered-point',
		'type': 'circle',
		'source': 'localisations',
		'filter': ['!', ['has', 'point_count']],
		'paint': {
			'circle-color': '#00ff66',
			'circle-blur': 0.3,
			'circle-radius': 28,
			'circle-opacity': ["interpolate", ["linear"], ["zoom"], 11.0, 0.7, 11.2, 0.0],
			'circle-stroke-width': 0,
			'circle-stroke-opacity': ["interpolate", ["linear"], ["zoom"], 11.0, 0.7, 11.2, 0.0],
			'circle-stroke-color': '#000000'
		},
	}, 'Groupe BBL Own footprint');

	map.addLayer({
		'id': 'cluster-count-unclustered-point',
		'type': 'symbol',
		'source': 'localisations',
		'filter': ['!', ['has', 'point_count']],
		'paint': {
			'text-halo-width': 0.8,
			'text-halo-color': '#fff',
			'text-opacity': ["interpolate", ["linear"], ["zoom"], 11.0, 0.7, 11.2, 0.0],
		},
		'layout': {
			'text-field': '1',
			'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
			'text-size': 14,
		}
	}, 'Groupe BBL Own footprint');
});
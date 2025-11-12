import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { MarkerRenderer } from './MarkerRenderer';
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const locations = [
    { id: 'one', location: { lat: 28.3493, lng: -81.4792 } },
    { id: 'two', location: { lat: 28.6493, lng: -81.1792 }, disabled: true },
];

function MapContent() {
    return (
        <Map
            style={{
                width: '100%',
                height: '100%',
                borderRadius: '16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
            clickableIcons={false}
            disableDoubleClickZoom={true}
            defaultCenter={{ lat: 28.5383, lng: -81.3792 }}
            defaultZoom={10}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
            mapId="DEMO_MAP_ID"
        >
            {locations.map((item) => {
                return <MarkerRenderer key={item.id} data={item} />;
            })}
        </Map>
    );
}

function GoogleMaps() {
    return (
        <div className="flex h-full w-full flex-col justify-center bg-blue-400">
            <div className="flex h-full w-full items-center justify-center p-2">
                <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
                    <MapContent />
                </APIProvider>
            </div>
        </div>
    );
}

export { GoogleMaps };
